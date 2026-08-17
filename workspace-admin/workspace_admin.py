"""Provision Collective Vet org units, users, and groups in Google Workspace.

Idempotent: existing OUs/users/groups are reported, not duplicated.
Requires the service account JSON from setup_service_account.md with
domain-wide delegation for the scopes below.
"""

from __future__ import annotations

import argparse
import secrets
import string
import sys

import yaml
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = [
    "https://www.googleapis.com/auth/admin.directory.orgunit",
    "https://www.googleapis.com/auth/admin.directory.user",
    "https://www.googleapis.com/auth/admin.directory.group",
]


def load(config_path: str):
    cfg = yaml.safe_load(open(config_path, encoding="utf-8"))
    creds = service_account.Credentials.from_service_account_file(
        cfg["service_account_key"], scopes=SCOPES
    ).with_subject(cfg["org"]["admin_email"])
    directory = build("admin", "directory_v1", credentials=creds)
    return cfg, directory


def temp_password(length: int = 16) -> str:
    alphabet = string.ascii_letters + string.digits + "!@#%"
    return "".join(secrets.choice(alphabet) for _ in range(length))


def ensure_org_units(directory, customer: str, units: list[str]):
    for path in units:
        name = path.strip("/").split("/")[-1]
        try:
            directory.orgunits().insert(
                customerId=customer,
                body={"name": name, "parentOrgUnitPath": "/", "orgUnitPath": path},
            ).execute()
            print(f"[OU] created {path}")
        except HttpError as e:
            if e.resp.status == 409 or "duplicate" in str(e).lower():
                print(f"[OU] exists  {path}")
            else:
                raise


def ensure_groups(directory, groups: list[dict]):
    for g in groups:
        try:
            directory.groups().insert(
                body={
                    "email": g["email"],
                    "name": g["name"],
                    "description": g.get("description", ""),
                }
            ).execute()
            print(f"[GROUP] created {g['email']}")
        except HttpError as e:
            if e.resp.status == 409 or "duplicate" in str(e).lower():
                print(f"[GROUP] exists  {g['email']}")
            else:
                raise


def ensure_users(directory, customer: str, users: list[dict]):
    for u in users:
        pwd = temp_password()
        body = {
            "primaryEmail": u["primary_email"],
            "name": {"givenName": u["given_name"], "familyName": u["family_name"]},
            "orgUnitPath": u["org_unit"],
            "password": pwd,
            "changePasswordAtNextLogin": True,
        }
        try:
            directory.users().insert(body=body).execute()
            print(f"[USER] created {u['primary_email']}  (temp password set; forced reset at first login)")
        except HttpError as e:
            if e.resp.status == 409 or "duplicate" in str(e).lower():
                print(f"[USER] exists  {u['primary_email']}")
            else:
                raise
        for group in u.get("groups", []):
            try:
                directory.members().insert(
                    groupKey=group,
                    body={"email": u["primary_email"], "role": "MEMBER"},
                ).execute()
                print(f"  [MEMBER] {u['primary_email']} -> {group}")
            except HttpError as e:
                if e.resp.status in (409, 412) or "duplicate" in str(e).lower():
                    print(f"  [MEMBER] already in {group}")
                else:
                    raise


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default="config.yaml")
    args = ap.parse_args()
    cfg, directory = load(args.config)
    customer = cfg["org"]["customer_id"]

    ensure_org_units(directory, customer, cfg["org_units"])
    ensure_groups(directory, cfg["groups"])
    ensure_users(directory, customer, cfg["users"])
    print("Done. Re-run any time; existing objects are skipped.")


if __name__ == "__main__":
    sys.exit(main())

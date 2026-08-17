"""Create Collective Vet shared drives and their standard folder trees.

Idempotent. Sets group ACLs from config.yaml. Org-owned structure only.
"""

from __future__ import annotations

import argparse
import sys

import yaml
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/drive"]


def load(config_path: str):
    cfg = yaml.safe_load(open(config_path, encoding="utf-8"))
    creds = service_account.Credentials.from_service_account_file(
        cfg["service_account_key"], scopes=SCOPES
    ).with_subject(cfg["org"]["admin_email"])
    return cfg, build("drive", "v3", credentials=creds)


def find_drive(drive, name: str):
    res = drive.drives().list(
        q=f"name = '{name}'", pageSize=1, fields="drives(id,name)"
    ).execute()
    items = res.get("drives", [])
    return items[0]["id"] if items else None


def ensure_shared_drive(drive, name: str) -> str:
    drive_id = find_drive(drive, name)
    if drive_id:
        print(f"[DRIVE] exists  {name}")
        return drive_id
    import uuid

    created = drive.drives().create(
        requestId=str(uuid.uuid4()), body={"name": name}, fields="id"
    ).execute()
    print(f"[DRIVE] created {name}")
    return created["id"]


def set_group_acl(drive, drive_id: str, group_email: str, role: str):
    body = {"type": "group", "role": role, "emailAddress": group_email}
    try:
        drive.permissions().create(
            fileId=drive_id,
            body=body,
            supportsAllDrives=True,
            sendNotificationEmail=False,
            fields="id",
        ).execute()
        print(f"  [ACL] {group_email} = {role}")
    except HttpError as e:
        if e.resp.status in (400, 409):
            print(f"  [ACL] already set for {group_email}")
        else:
            raise


def find_folder(drive, drive_id: str, name: str, parent_id: str):
    q = (
        f"name = '{name}' and '{parent_id}' in parents and "
        "mimeType = 'application/vnd.google-apps.folder' and trashed = false"
    )
    res = drive.files().list(
        q=q,
        corpora="drive",
        driveId=drive_id,
        includeItemsFromAllDrives=True,
        supportsAllDrives=True,
        fields="files(id)",
        pageSize=1,
    ).execute()
    items = res.get("files", [])
    return items[0]["id"] if items else None


def ensure_folder(drive, drive_id: str, path: str) -> str:
    parent = drive_id
    for part in path.split("/"):
        folder_id = find_folder(drive, drive_id, part, parent)
        if not folder_id:
            created = drive.files().create(
                body={
                    "name": part,
                    "mimeType": "application/vnd.google-apps.folder",
                    "parents": [parent],
                },
                supportsAllDrives=True,
                fields="id",
            ).execute()
            folder_id = created["id"]
            print(f"  [FOLDER] created {path}")
        parent = folder_id
    return parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default="config.yaml")
    args = ap.parse_args()
    cfg, drive = load(args.config)

    for sd in cfg["shared_drives"]:
        drive_id = ensure_shared_drive(drive, sd["name"])
        for g in sd.get("managers", []):
            set_group_acl(drive, drive_id, g, "organizer")
        for g in sd.get("content_managers", []):
            set_group_acl(drive, drive_id, g, "fileOrganizer")
        for folder in sd.get("folders", []):
            ensure_folder(drive, drive_id, folder)
    print("Done. Re-run any time; existing drives/folders are skipped.")


if __name__ == "__main__":
    sys.exit(main())

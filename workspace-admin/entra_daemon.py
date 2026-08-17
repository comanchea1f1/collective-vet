"""Entra daemon identity for the Collective Vet workspace-admin toolkit.

This module gives the toolkit a Microsoft Entra (Azure AD) client-credentials
identity. It is used for two things:

1. Azure-side housekeeping (resource tags, budgets, Graph user roster sync
   between Entra and the org's directory).
2. Optional: Entra as the source of truth for the org's user roster, exported
   to config.yaml for the Google Workspace provisioning scripts.

It does NOT read mail, does NOT touch personal drives, and does NOT scan
devices. Scope is limited to the application permissions granted in the Entra
app registration.

Env vars (set before running):
  ENTRA_TENANT_ID     - Directory (tenant) ID
  ENTRA_CLIENT_ID     - Application (client) ID of 'collective-vet-admin'
  ENTRA_CLIENT_SECRET - Client secret, OR use ENTRA_CERT_PATH for cert auth

One-time setup (after `az login`):
  az ad app create --display-name "collective-vet-admin" \
    --sign-in-audience AzureADMyOrg
  az ad app permission add --id <appId> \
    --api 00000003-0000-0000-c000-000000000000 \
    --api-permissions \
      df021288-bdef-4463-88db-98f22de89214=Role  # User.Read.All
  az ad app permission admin-consent --id <appId>
  az ad app credential reset --id <appId> --append
"""

from __future__ import annotations

import os

import msal

GRAPH_SCOPE = ["https://graph.microsoft.com/.default"]


def get_token() -> str:
    tenant = os.environ["ENTRA_TENANT_ID"]
    client_id = os.environ["ENTRA_CLIENT_ID"]
    secret = os.environ["ENTRA_CLIENT_SECRET"]

    app = msal.ConfidentialClientApplication(
        client_id,
        authority=f"https://login.microsoftonline.com/{tenant}",
        client_credential=secret,
    )
    result = app.acquire_token_for_client(scopes=GRAPH_SCOPE)
    if "access_token" not in result:
        raise RuntimeError(f"Token acquisition failed: {result.get('error_description')}")
    return result["access_token"]


def list_org_users() -> list[dict]:
    """Roster sync: pull Entra users for export to workspace-admin config."""
    import requests

    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}
    users: list[dict] = []
    url = "https://graph.microsoft.com/v1.0/users?$select=mail,displayName,givenName,surname,userPrincipalName"
    while url:
        resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        users.extend(data.get("value", []))
        url = data.get("@odata.nextLink")
    return users


if __name__ == "__main__":
    for u in list_org_users():
        print(u.get("userPrincipalName"), "-", u.get("displayName"))

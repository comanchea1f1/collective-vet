# Collective Vet — Google Workspace & Drive automation

Toolkit to stand up and automate Collective Vet's Google Workspace: org units, users, groups, shared drives, folder structure, and intake Apps Script.

**Hard rules baked in:** no reading of user Gmail, no scanning of personal drives for financial data, no device access. This toolkit only provisions org-owned structure and permissions.

## What is here

| File | Purpose |
|------|---------|
| `config.yaml` | Org domain, org units, groups, shared drives, role roster. Edit this first. |
| `workspace_admin.py` | Provisions OUs, users, groups, and group members (Admin SDK). |
| `drive_setup.py` | Creates shared drives + standard folder tree, sets manager/content-manager ACLs (Drive API). |
| `intake_apps_script/Code.gs` | Apps Script: intake form response → create veteran case folder, set ACLs, email coordinator. |
| `setup_service_account.md` | Step-by-step: service account, APIs, domain-wide delegation, scopes. |
| `requirements.txt` | Python deps. |

## Prereqs (one-time, in order)

1. **Register `collectivevet.org`** (e.g. Squarespace Domains, Cloudflare Registrar, Porkbun — Google Domains was sold to Squarespace).
2. **Start Google Workspace for Nonprofits**: apply at google.com/nonprofits, verify the domain with a TXT record, create the first admin user.
3. **Follow `setup_service_account.md`** to create the service account + domain-wide delegation, and put the key JSON in `workspace-admin/credentials/service-account.json`.

## Run

```powershell
pip install -r requirements.txt
python workspace_admin.py --config config.yaml
python drive_setup.py --config config.yaml
```

Both scripts are idempotent: re-running skips anything that already exists and only reports drift.

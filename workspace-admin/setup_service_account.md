# Service account + domain-wide delegation (one-time)

The Python scripts act **as** the Workspace super-admin through a service
account. Google requires these steps in order.

## 1. Google Cloud project

```powershell
python "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\lib\gcloud.py" projects create collective-vet-admin --name="Collective Vet Admin"
python "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\lib\gcloud.py" config set project collective-vet-admin
```

## 2. Enable APIs

Admin SDK, Drive API, Apps Script API:

```powershell
python "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\lib\gcloud.py" services enable admin.googleapis.com drive.googleapis.com script.googleapis.com
```

## 3. Create the service account and key

```powershell
python "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\lib\gcloud.py" iam service-accounts create workspace-admin --display-name="Workspace Admin"
python "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\lib\gcloud.py" iam service-accounts keys create credentials\service-account.json --iam-account=workspace-admin@collective-vet-admin.iam.gserviceaccount.com
```

Note the service account's **client ID** (21-digit number) from the next command — you need it in step 4:

```powershell
python "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\lib\gcloud.py" iam service-accounts describe workspace-admin@collective-vet-admin.iam.gserviceaccount.com --format="value(uniqueId)"
```

## 4. Domain-wide delegation (Admin console)

In admin.google.com → Security → Access and data control → API controls →
**Domain-wide delegation** → Add new:

- Client ID: the 21-digit number from step 3
- OAuth scopes (one line, comma-separated):

```
https://www.googleapis.com/auth/admin.directory.orgunit,https://www.googleapis.com/auth/admin.directory.user,https://www.googleapis.com/auth/admin.directory.group,https://www.googleapis.com/auth/drive
```

## 5. Run the toolkit

```powershell
cd C:\Users\Administrator\collective-vet\workspace-admin
pip install -r requirements.txt
python workspace_admin.py --config config.yaml
python drive_setup.py --config config.yaml
```

## Security notes

- `credentials/service-account.json` is a **secret**. It is gitignored; never commit it.
- Grant only the four scopes above. Do not add Gmail or full Drive read scopes.
- Rotate the key yearly (step 3 can be re-run; delete old keys in the console).

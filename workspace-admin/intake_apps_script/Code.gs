/**
 * Collective Vet — intake Apps Script.
 *
 * Bound to a Google Form. On submit:
 *   1. Creates a veteran case folder in the shared drive (from the response).
 *   2. Copies the correct packet template into the folder.
 *   3. Sets ACLs so only coordinators + the relevant team see it.
 *   4. Emails the intake desk with a link.
 *
 * SETUP:
 *   - Set SCRIPT PROPERTIES (Project Settings → Script Properties):
 *       CASES_DRIVE_ID      - ID of "Collective Vet — Veteran Cases" shared drive
 *       INTAKE_GROUP        - e.g. intake@collectivevet.org
 *       COORDINATORS_GROUP  - e.g. coordinators@collectivevet.org
 *       TEMPLATE_CLAIMS     - file ID of Claims Packet template
 *       TEMPLATE_CREDIT     - file ID of Credit Education Packet template
 *       TEMPLATE_LEGAL      - file ID of Legal Aid Referral template
 *
 * Privacy: the form must NOT ask for SSNs, bank logins, DD-214 uploads, or
 * passwords. Name, contact, service era, and a short need description only.
 */

function onFormSubmit(e) {
  const props = PropertiesService.getScriptProperties();
  const r = e.namedValues;

  const veteranName = (r["Veteran name"] || ["Unnamed"])[0].trim();
  const contact = (r["Email or phone"] || [""])[0].trim();
  const need = (r["Primary need"] || ["General"])[0];

  const driveId = props.getProperty("CASES_DRIVE_ID");
  const stamp = Utilities.formatDate(new Date(), "America/New_York", "yyyyMMdd-HHmm");
  const folderName = `${stamp} — ${veteranName}`;

  const folder = Drive.Files.create(
    { name: folderName, mimeType: "application/vnd.google-apps.folder", parents: [driveId] },
    null,
    { supportsAllDrives: true }
  );

  const templateKey = { Claims: "TEMPLATE_CLAIMS", Credit: "TEMPLATE_CREDIT", "Legal aid": "TEMPLATE_LEGAL" }[need];
  if (templateKey && props.getProperty(templateKey)) {
    Drive.Files.copy(
      { name: `${need} packet — ${veteranName}`, parents: [folder.id] },
      props.getProperty(templateKey),
      { supportsAllDrives: true }
    );
  }

  const notes = Drive.Files.create(
    { name: "Intake summary", mimeType: "application/vnd.google-apps.document", parents: [folder.id] },
    null,
    { supportsAllDrives: true }
  );
  DocumentApp.openById(notes.id).getBody()
    .appendParagraph(`Veteran: ${veteranName}`)
    .appendParagraph(`Contact: ${contact}`)
    .appendParagraph(`Need: ${need}`)
    .appendParagraph("Reminder: never paste SSNs, bank logins, or full IDs in case notes.");

  Drive.Permissions.create(
    { type: "group", role: "writer", emailAddress: props.getProperty("COORDINATORS_GROUP") },
    folder.id,
    { supportsAllDrives: true, sendNotificationEmail: false }
  );

  GmailApp.sendEmail(
    props.getProperty("INTAKE_GROUP"),
    `New intake: ${veteranName} (${need})`,
    `Case folder: https://drive.google.com/drive/folders/${folder.id}`
  );
}

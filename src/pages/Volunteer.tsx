const roles = [
  { id: "coordinator", label: "Coordinator" },
  { id: "claims", label: "Claims help (navigation only)" },
  { id: "legal", label: "Legal referral" },
  { id: "peer", label: "Peer support" },
  { id: "general", label: "General / wherever needed" },
];

export default function Volunteer() {
  return (
    <section className="volunteer page-lead" aria-labelledby="volunteer-heading">
      <header className="section-head">
        <p className="eyebrow">Volunteer</p>
        <h2 id="volunteer-heading">Pull up a chair at the table.</h2>
        <p className="lede">
          Most of what we do is presence: sitting with someone while they
          open the right official page, make the call, or fill the form. If
          that sounds like your kind of shift, tell us below.
        </p>
        <p className="contact-note">
          We never ask for account numbers, passwords, or documents. This
          form collects only your name, a way to reach you, and what you
          want to help with. It opens your own email app — nothing is stored
          on this site.
        </p>
      </header>

      <form
        className="contact-form"
        action="mailto:hello@collectivevet.org"
        method="post"
        encType="text/plain"
      >
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Email or phone
          <input name="reach" type="text" autoComplete="email" required />
        </label>
        <label>
          Role interest
          <select name="role" required defaultValue="">
            <option value="" disabled>
              Choose a desk
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.label}>
                {role.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Anything we should know? (optional)
          <textarea name="note" rows={4} />
        </label>
        <button type="submit" className="btn-signal">
          Send volunteer note
        </button>
      </form>
    </section>
  );
}

const hours = [
  ["Monday–Thursday", "0900–1700"],
  ["Friday", "0900–1300"],
  ["After hours", "Peer line on request"],
];

export default function Contact() {
  return (
    <div className="page-lead">
      <section className="rally" aria-labelledby="rally-heading">
        <div>
          <p className="eyebrow">Rally point</p>
          <h2 id="rally-heading">Show up in person or send a note.</h2>
          <p>
            Walk-ins during posted hours. If the door is locked, use the
            contact block — a coordinator answers in one business day.
          </p>
          <address>
            Collective Vet
            <br />
            Community room · by appointment
            <br />
            United States
          </address>
        </div>
        <table className="hours">
          <caption className="sr-only">Posted hours</caption>
          <tbody>
            {hours.map(([day, time]) => (
              <tr key={day}>
                <th scope="row">{day}</th>
                <td>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="contact" aria-labelledby="contact-heading">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading">Tell us who to expect.</h2>
        <p className="contact-note">
          Name, a way to reach you, and what you need. Do not send account
          passwords, bank statements, or copies of every ID.
        </p>
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
            What do you need?
            <textarea name="need" rows={4} required />
          </label>
          <button type="submit" className="btn-signal">
            Send to Collective Vet
          </button>
        </form>
      </section>
    </div>
  );
}

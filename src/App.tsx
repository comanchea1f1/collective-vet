const programs = [
  {
    code: "PEER",
    name: "Peer check-in",
    detail:
      "Talk with another veteran who has already walked the first week home. No intake maze. A human on the other end.",
  },
  {
    code: "NAVI",
    name: "Benefits navigation",
    detail:
      "We sit with you and point to official public channels — VA.gov, accredited VSOs, state veteran offices — so you are not guessing alone.",
  },
  {
    code: "WORK",
    name: "Civilian workbench",
    detail:
      "Translate a service record into a resume that hiring managers can read. Practice interviews. Warm introductions.",
  },
  {
    code: "HOME",
    name: "Stable ground",
    detail:
      "Short-term housing leads, landlord letters, and a checklist for the first thirty days after a move.",
  },
  {
    code: "KIN",
    name: "Family line",
    detail:
      "Support for the people who waited. Caregiver hours, school forms, and a quieter room to ask hard questions.",
  },
];

const hours = [
  ["Monday–Thursday", "0900–1700"],
  ["Friday", "0900–1300"],
  ["After hours", "Peer line on request"],
];

export default function App() {
  return (
    <div className="site">
      <a className="skip" href="#mission">
        Skip to mission
      </a>

      <header className="plate" aria-label="Collective Vet identification plate">
        <span className="plate-holes" aria-hidden="true" />
        <div className="plate-body">
          <p className="plate-meta">
            <span>SVC / CV-001</span>
            <span>US · VETERANS</span>
          </p>
          <div className="plate-title-row">
            <h1 className="plate-title">COLLECTIVE VET</h1>
            <p className="plate-sub">Nonprofit · by veterans, for the ones still coming home</p>
          </div>
        </div>
        <nav className="plate-nav" aria-label="Primary">
          <a href="#mission">Mission</a>
          <a href="#programs">Programs</a>
          <a href="#rally">Rally point</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="deck">
        <aside className="rail" aria-hidden="true">
          <span>FOR THOSE WHO SERVED</span>
        </aside>

        <main>
          <section className="hero" aria-labelledby="hero-heading">
            <p className="eyebrow">Formation, not a waiting room</p>
            <h2 id="hero-heading">
              You already have a unit.
              <br />
              This is the one that meets you after the gate.
            </h2>
            <p className="lede">
              Collective Vet is a veterans nonprofit. We keep the circle intact:
              peer support, official benefits navigation, work, housing, and
              family — without selling you a product and without asking for
              account numbers.
            </p>
            <div className="hero-actions">
              <a className="btn-signal" href="#contact">
                Request a check-in
              </a>
              <a className="btn-ghost" href="#programs">
                See the lineup
              </a>
            </div>
          </section>

          <section id="mission" className="mission">
            <div className="mission-copy">
              <p className="eyebrow">Mission</p>
              <h2>Stand next to the person who just took the uniform off.</h2>
              <p>
                Discharge papers do not come with a translator. We do the
                unglamorous work: sit at a table, open the right public page,
                walk into a county office together, and stay on the line until
                the next step is written down.
              </p>
            </div>
            <ul className="creed">
              <li>
                <strong>No hunt for accounts.</strong> We never ask for bank
                logins, full Social Security numbers, or device access.
              </li>
              <li>
                <strong>Official doors only.</strong> Benefits help means
                VA.gov, accredited representatives, and state veteran agencies.
              </li>
              <li>
                <strong>Peer first.</strong> If you want another veteran on the
                call, you get one.
              </li>
            </ul>
          </section>

          <section id="programs" className="programs">
            <header className="section-head">
              <p className="eyebrow">Lineup</p>
              <h2>Five desks. Same table.</h2>
            </header>
            <ul className="program-grid">
              {programs.map((program) => (
                <li key={program.code} className="program">
                  <span className="program-code">{program.code}</span>
                  <h3>{program.name}</h3>
                  <p>{program.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="rally" className="rally">
            <div>
              <p className="eyebrow">Rally point</p>
              <h2>Show up in person or send a note.</h2>
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

          <section id="contact" className="contact">
            <p className="eyebrow">Contact</p>
            <h2>Tell us who to expect.</h2>
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
        </main>
      </div>

      <footer className="site-foot">
        <p>Collective Vet · 501(c)(3) pending · veterans nonprofit</p>
        <p>If you are in crisis, call or text 988, then press 1.</p>
      </footer>
    </div>
  );
}

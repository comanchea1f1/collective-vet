const programs = [
  {
    code: "PEER",
    name: "Peer check-in",
    detail:
      "Talk with another veteran who has already walked the first week home. No intake maze. A human on the other end.",
    more: "First calls are unscripted. We listen, note what you want next, and schedule a follow-up only if you ask for one.",
  },
  {
    code: "NAVI",
    name: "Benefits navigation",
    detail:
      "We sit with you and point to official public channels — VA.gov, accredited VSOs, state veteran offices — so you are not guessing alone.",
    more: "We do not file claims or rate disabilities. We help you find the official door and prepare what to bring through it.",
  },
  {
    code: "WORK",
    name: "Civilian workbench",
    detail:
      "Translate a service record into a resume that hiring managers can read. Practice interviews. Warm introductions.",
    more: "Bring a DD-214 summary or an evaluation. We leave with a one-page civilian resume draft and a short list of employers who answer our calls.",
  },
  {
    code: "HOME",
    name: "Stable ground",
    detail:
      "Short-term housing leads, landlord letters, and a checklist for the first thirty days after a move.",
    more: "We do not hold deposits or sign leases. We help you compare options and ask the right questions before you sign anything.",
  },
  {
    code: "KIN",
    name: "Family line",
    detail:
      "Support for the people who waited. Caregiver hours, school forms, and a quieter room to ask hard questions.",
    more: "Spouses, partners, kids, and parents can come with the veteran or on their own. Same rules: no account numbers, no forms we cannot explain.",
  },
];

export default function Programs() {
  return (
    <section className="programs page-lead" aria-labelledby="programs-heading">
      <header className="section-head">
        <p className="eyebrow">Lineup</p>
        <h2 id="programs-heading">Five desks. Same table.</h2>
        <p className="lede">
          Every desk follows the creed: official doors only, peer first, and
          no one will ever ask you for a password, a bank login, or a full
          Social Security number.
        </p>
      </header>
      <ul className="program-grid">
        {programs.map((program) => (
          <li key={program.code} className="program">
            <span className="program-code">{program.code}</span>
            <h3>{program.name}</h3>
            <p>{program.detail}</p>
            <p className="program-more">{program.more}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

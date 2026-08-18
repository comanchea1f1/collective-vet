type Resource = {
  name: string;
  href: string;
  detail: string;
};

type ResourceSection = {
  id: string;
  code: string;
  title: string;
  intro: string;
  resources: Resource[];
};

const sections: ResourceSection[] = [
  {
    id: "claims",
    code: "CLAM",
    title: "Claims & benefits",
    intro:
      "Start and check everything benefits-related on VA.gov itself. Never hand your VA login to a third party — including us.",
    resources: [
      {
        name: "File a disability claim (VA Form 21-526EZ)",
        href: "https://www.va.gov/disability/file-disability-claim-form-21-526ez/",
        detail: "The official starting point for a new disability claim.",
      },
      {
        name: "Apply for VA health care",
        href: "https://www.va.gov/health-care/how-to-apply/",
        detail: "Enrollment for VA health care, straight from VA.",
      },
      {
        name: "GI Bill and education benefits",
        href: "https://www.va.gov/education/about-gi-bill-benefits/",
        detail: "Post-9/11 and Montgomery GI Bill overviews and applications.",
      },
      {
        name: "Decision reviews and appeals",
        href: "https://www.va.gov/decision-reviews/",
        detail:
          "Compare supplemental claims, higher-level review, and Board appeals. Deadlines are short.",
      },
      {
        name: "Manage VA debt",
        href: "https://www.va.gov/manage-va-debt/",
        detail:
          "Official options for overpayments and copay debt — review, dispute, or set up repayment with VA directly.",
      },
    ],
  },
  {
    id: "money",
    code: "CRED",
    title: "Money & credit",
    intro:
      "Read your own reports and talk to nonprofit counselors. None of these sites will ask this site for your data.",
    resources: [
      {
        name: "AnnualCreditReport.com",
        href: "https://www.annualcreditreport.com/",
        detail:
          "The only federally authorized source for free credit reports from all three bureaus.",
      },
      {
        name: "National Foundation for Credit Counseling",
        href: "https://www.nfcc.org/",
        detail:
          "Find a nonprofit, accredited credit counselor for budgets and written debt plans.",
      },
      {
        name: "CFPB military financial lifecycle",
        href: "https://www.consumerfinance.gov/consumer-tools/military-financial-lifecycle/",
        detail:
          "Consumer Financial Protection Bureau guidance for each stage of service, including SCRA and MLA protections.",
      },
    ],
  },
  {
    id: "legal",
    code: "LEGL",
    title: "Legal aid",
    intro:
      "Civil legal help exists in every state. Bring a timeline and your letters — not your passwords.",
    resources: [
      {
        name: "Stateside Legal",
        href: "https://www.statesidelegal.org/",
        detail:
          "Free self-help guides and referrals built for service members, veterans, and their families.",
      },
      {
        name: "LSC legal aid locator",
        href: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help",
        detail:
          "The Legal Services Corporation map of civil legal aid offices by county.",
      },
    ],
  },
  {
    id: "work",
    code: "XFER",
    title: "Work & transition",
    intro:
      "Federal employment help for veterans, without a paywall or a recruiter's quota.",
    resources: [
      {
        name: "DOL Veterans' Employment and Training Service",
        href: "https://www.dol.gov/agencies/vets",
        detail:
          "Department of Labor programs for veteran employment, transition assistance, and employer connections.",
      },
    ],
  },
  {
    id: "crisis",
    code: "988",
    title: "Crisis",
    intro:
      "If things are close to the edge, skip everything else on this page.",
    resources: [
      {
        name: "Veterans Crisis Line — call or text 988, then press 1",
        href: "https://www.veteranscrisisline.net/",
        detail:
          "Free, confidential, 24/7. You do not need to be enrolled in VA benefits to call. Chat and TTY options are on the site.",
      },
    ],
  },
];

export default function Resources() {
  return (
    <section className="resources page-lead" aria-labelledby="resources-heading">
      <header className="section-head">
        <p className="eyebrow">Resource library</p>
        <h2 id="resources-heading">Official doors. Nothing behind a login we want.</h2>
        <p className="lede">
          Every link below is a public, official resource. None of them ask
          Collective Vet for anything, and none of them should ask you for
          account logins, bank data, or a Social Security number just to
          read. If a site or a caller does, stop and talk to us first.
        </p>
      </header>

      {sections.map((section) => (
        <section
          key={section.id}
          className="resource-section"
          aria-labelledby={`resources-${section.id}`}
        >
          <header className="resource-head">
            <span className="program-code">{section.code}</span>
            <h3 id={`resources-${section.id}`}>{section.title}</h3>
            <p>{section.intro}</p>
          </header>
          <ul className="resource-list">
            {section.resources.map((resource) => (
              <li key={resource.href} className="resource">
                <a href={resource.href} target="_blank" rel="noreferrer">
                  {resource.name}
                </a>
                <p>{resource.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}

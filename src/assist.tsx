import { useMemo, useState } from "react";

type NeedId = "claim" | "credit" | "legal" | "transition";

const needs: { id: NeedId; code: string; label: string; hint: string }[] = [
  {
    id: "claim",
    code: "CLAM",
    label: "VA claim paperwork",
    hint: "Build a document kit. We do not file the claim or rate a disability.",
  },
  {
    id: "credit",
    code: "CRED",
    label: "Credit education",
    hint: "Learn next steps. We do not pull reports or restructure debt.",
  },
  {
    id: "legal",
    code: "LEGL",
    label: "Legal aid path",
    hint: "Find accredited help. This is not legal advice.",
  },
  {
    id: "transition",
    code: "XFER",
    label: "Active to civilian",
    hint: "A first-90-days briefing after the gate.",
  },
];

const claimKinds = [
  { id: "first", label: "First disability claim" },
  { id: "increase", label: "Increase on an existing rating" },
  { id: "supplemental", label: "Supplemental / new evidence" },
  { id: "appeal", label: "Board or higher-level review" },
];

type BriefLine = { title: string; detail: string; href?: string };

function buildBrief(selected: NeedId[], claimKind: string): BriefLine[] {
  const lines: BriefLine[] = [];

  if (selected.includes("claim")) {
    lines.push({
      title: "Create or sign in at VA.gov",
      detail:
        "Start or check a claim only on the official site. Do not give your login to this site or to anyone who cold-calls you.",
      href: "https://www.va.gov/disability/file-disability-claim-form-21-526ez/",
    });
    lines.push({
      title: "Core packet",
      detail:
        "DD-214 or equivalent, a list of conditions in your own words, and treatment locations. Do not upload bank statements or full Social Security numbers here.",
    });
    if (claimKind === "first" || claimKind === "increase") {
      lines.push({
        title: "Medical evidence",
        detail:
          "Request your VA health records in My HealtheVet or through VA.gov. Private records need a signed release to your clinician — we cannot pull them.",
        href: "https://www.va.gov/health-care/get-medical-records/",
      });
    }
    if (claimKind === "supplemental") {
      lines.push({
        title: "New and relevant evidence",
        detail:
          "A supplemental claim needs evidence VA did not have before. Use VA Form 20-0995 on VA.gov.",
        href: "https://www.va.gov/decision-reviews/supplemental-claim/",
      });
    }
    if (claimKind === "appeal") {
      lines.push({
        title: "Decision review",
        detail:
          "Compare higher-level review vs. Board appeal on VA.gov. Deadlines are short. An accredited VSO or attorney should review the decision letter with you.",
        href: "https://www.va.gov/decision-reviews/",
      });
    }
    lines.push({
      title: "Accredited representative",
      detail:
        "Search VA’s official list. Unaccredited “claim sharks” cannot charge for this work.",
      href: "https://www.va.gov/ogc/apps/accreditation/index.asp",
    });
  }

  if (selected.includes("credit")) {
    lines.push({
      title: "Read your own report",
      detail:
        "You can pull your credit reports for free at AnnualCreditReport.com. Collective Vet never asks for those files.",
      href: "https://www.annualcreditreport.com/",
    });
    lines.push({
      title: "Nonprofit counseling",
      detail:
        "For a budget or a written debt plan, use a HUD- or NFCC-approved counselor. They — not this site — can talk through restructuring options.",
      href: "https://www.nfcc.org/",
    });
    lines.push({
      title: "VA and DoD debt",
      detail:
        "VA overpayments and military debts have official dispute paths. Start at VA debt management or your finance office, not a random app.",
      href: "https://www.va.gov/manage-va-debt/",
    });
    lines.push({
      title: "Still serving or recently out",
      detail:
        "Ask a legal assistance office about SCRA / MLA protections before you refinance anything.",
      href: "https://www.consumerfinance.gov/consumer-tools/military-financial-lifecycle/",
    });
  }

  if (selected.includes("legal")) {
    lines.push({
      title: "Legal aid locator",
      detail:
        "Use LSC’s map for civil legal aid in your county. Bring the issue list from this briefing, not a stack of passwords.",
      href: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help",
    });
    lines.push({
      title: "Stateside Legal",
      detail:
        "Self-help guides and referral lists built for service members, veterans, and families.",
      href: "https://www.statesidelegal.org/",
    });
    lines.push({
      title: "What to bring",
      detail:
        "A one-page timeline, court or VA letters, and questions. Leave account numbers at home unless the attorney asks in a secure channel.",
    });
  }

  if (selected.includes("transition")) {
    lines.push({
      title: "TAP and benefits briefing",
      detail:
        "Finish TAP modules if you have not. Then open VA.gov for health enrollment, GI Bill, and disability in that order if time is short.",
      href: "https://www.va.gov/education/about-gi-bill-benefits/",
    });
    lines.push({
      title: "Work",
      detail:
        "Translate MOS/AFSC/Rate into civilian language. Use DOL VETS and a one-page resume before you apply widely.",
      href: "https://www.dol.gov/agencies/vets",
    });
    lines.push({
      title: "Home and health",
      detail:
        "Apply for VA health care, update your address, and ask a coordinator about the first housing month. Crisis line is 988, then 1.",
      href: "https://www.va.gov/health-care/apply/",
    });
  }

  return lines;
}

export function AssistDesk() {
  const [selected, setSelected] = useState<NeedId[]>(["claim"]);
  const [claimKind, setClaimKind] = useState("first");
  const brief = useMemo(
    () => buildBrief(selected, claimKind),
    [selected, claimKind],
  );

  function toggle(id: NeedId) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <section id="assist" className="assist">
      <header className="section-head">
        <p className="eyebrow">Briefing desk</p>
        <h2>Build a packet. Do not hand us your life.</h2>
        <p className="lede">
          Check what you need. The desk writes a local briefing with official
          links. Nothing is stored, filed, or sent to a lender. This is not
          legal, financial, medical, or claims representation.
        </p>
      </header>

      <div className="assist-grid">
        <fieldset className="need-set">
          <legend>What should the briefing cover?</legend>
          {needs.map((need) => (
            <label key={need.id} className="need">
              <input
                type="checkbox"
                checked={selected.includes(need.id)}
                onChange={() => toggle(need.id)}
              />
              <span>
                <strong>
                  {need.code} · {need.label}
                </strong>
                <em>{need.hint}</em>
              </span>
            </label>
          ))}
          {selected.includes("claim") ? (
            <label className="claim-kind">
              Claim type
              <select
                value={claimKind}
                onChange={(event) => setClaimKind(event.target.value)}
              >
                {claimKinds.map((kind) => (
                  <option key={kind.id} value={kind.id}>
                    {kind.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </fieldset>

        <article className="brief" aria-live="polite">
          <p className="eyebrow">Your briefing</p>
          {brief.length === 0 ? (
            <p>Select at least one desk.</p>
          ) : (
            <ol>
              {brief.map((line) => (
                <li key={line.title}>
                  <h3>{line.title}</h3>
                  <p>{line.detail}</p>
                  {line.href ? (
                    <a href={line.href} target="_blank" rel="noreferrer">
                      Open official resource
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          )}
          <button type="button" className="btn-ghost" onClick={() => window.print()}>
            Print briefing
          </button>
        </article>
      </div>
    </section>
  );
}

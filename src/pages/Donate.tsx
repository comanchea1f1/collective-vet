import { Link } from "react-router-dom";

export default function Donate() {
  return (
    <section className="donate page-lead" aria-labelledby="donate-heading">
      <header className="section-head">
        <p className="eyebrow">Donate</p>
        <h2 id="donate-heading">Fuel for the table, not a toll booth.</h2>
        <p className="lede">
          Collective Vet runs on donated time and small gifts: coffee for
          check-ins, printing for benefit packets, and bus fare to county
          offices. Our 501(c)(3) determination is pending, so we are keeping
          this page honest and simple.
        </p>
      </header>

      <div className="donate-grid">
        <section className="donate-card" aria-labelledby="donate-mail">
          <h3 id="donate-mail">Donations by mail</h3>
          <p>
            Until our payment processor is approved, checks or money orders
            payable to <strong>Collective Vet</strong> can be sent to our
            mailing address. Write <em>“donation”</em> in the memo line.
          </p>
          <address>
            Collective Vet
            <br />
            Attn: Donations
            <br />
            Mailing address shared on request via the contact page
          </address>
        </section>

        <section className="donate-card" aria-labelledby="donate-online">
          <h3 id="donate-online">Online giving — coming soon</h3>
          <p>
            A secure donation link will appear here once our payment
            processor is approved. We will never ask for card numbers,
            bank details, or crypto wallet keys by email, phone, or text —
            if someone does, it is not us.
          </p>
          <p>
            Want a heads-up when online giving opens? Leave a note on the{" "}
            <Link to="/contact">contact page</Link>.
          </p>
        </section>

        <section className="donate-card" aria-labelledby="donate-kind">
          <h3 id="donate-kind">In-kind help</h3>
          <p>
            Meeting space, printing, and rides to appointments are worth as
            much as cash around here. If you can offer any of those, the{" "}
            <Link to="/volunteer">volunteer page</Link> is the fastest route.
          </p>
        </section>
      </div>
    </section>
  );
}

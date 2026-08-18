import { Link } from "react-router-dom";

export default function Home() {
  return (
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
        <Link className="btn-signal" to="/contact">
          Request a check-in
        </Link>
        <Link className="btn-ghost" to="/programs">
          See the lineup
        </Link>
      </div>
    </section>
  );
}

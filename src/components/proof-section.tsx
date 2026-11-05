import { ArrowUpRight, Star } from "lucide-react";
import { etsyShopUrl, etsyStats, reviews } from "@/lib/proof";

function Stars() {
  return (
    <span className="stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" />
      ))}
    </span>
  );
}

export function ProofSection() {
  return (
    <section
      id="reviews"
      className="section site-width proof-section"
      aria-labelledby="proof-heading"
    >
      <div className="section-heading">
        <div>
          <div className="eyebrow">PROOF, NOT PROMISES</div>
          <h2 id="proof-heading">
            Real customers.
            <br />
            Real reviews.
          </h2>
        </div>
        <p>
          Every review below is from a verified purchase in our Etsy shop, quoted word for word.
        </p>
      </div>
      <dl className="proof-stats">
        <div>
          <dt>Etsy sales</dt>
          <dd>{etsyStats.sales}</dd>
        </div>
        <div>
          <dt>Average rating</dt>
          <dd>
            {etsyStats.rating}
            <Stars />
          </dd>
        </div>
        <div>
          <dt>Reviews</dt>
          <dd>{etsyStats.reviews}</dd>
        </div>
        <div>
          <dt>Selling since</dt>
          <dd>{etsyStats.since}</dd>
        </div>
      </dl>
      <div className="review-grid">
        {reviews.map((review) => (
          <figure key={review.name + review.date} className="review-card">
            <Stars />
            <blockquote>“{review.quote}”</blockquote>
            <figcaption>
              {review.name} <span>· Etsy customer · {review.date}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <a className="proof-link" href={etsyShopUrl} target="_blank" rel="noreferrer">
        Read all reviews on Etsy <ArrowUpRight size={16} />
      </a>
    </section>
  );
}

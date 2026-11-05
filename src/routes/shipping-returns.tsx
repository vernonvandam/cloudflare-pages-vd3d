import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { contactEmail } from "@/lib/services";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & returns | VD3D" },
      {
        name: "description",
        content:
          "VD3D ships Australia-wide and internationally with Australia Post, offers local pickup in Bullsbrook, and explains what to do if something's wrong.",
      },
    ],
  }),
  component: ShippingReturnsPage,
});

const mail = <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

const sections: LegalSection[] = [
  {
    heading: "Shipping",
    body: (
      <ul>
        <li>We ship Australia-wide and internationally with Australia Post.</li>
        <li>
          Postage depends on the size, weight and destination of your order. We’ll confirm the cost
          before you pay.
        </li>
        <li>You’ll receive tracking details by email once your order is on its way.</li>
        <li>
          Delivery times after dispatch are set by Australia Post and can vary, especially for
          remote and international addresses.
        </li>
      </ul>
    ),
  },
  {
    heading: "Local pickup",
    body: (
      <p>
        If you’re near Perth, you’re welcome to collect your order from our workshop in Bullsbrook,
        free of charge. We’ll arrange a pickup time with you when your order is ready.
      </p>
    ),
  },
  {
    heading: "International orders",
    body: (
      <p>
        Your country may charge import duties, taxes or customs fees. These are paid by the
        recipient and aren’t included in our prices or postage.
      </p>
    ),
  },
  {
    heading: "If something’s wrong",
    body: (
      <>
        <p>
          If your order arrives damaged, faulty, or not what we agreed, email {mail} with your name,
          what you ordered and clear photos of the problem. Please get in touch as soon as you can,
          ideally within 48 hours of it arriving, so we can sort it out quickly.
        </p>
        <p>
          We’ll repair, replace or refund it in line with your rights under the Australian Consumer
          Law, and cover the cost of returning it to us where that’s needed.
        </p>
      </>
    ),
  },
  {
    heading: "Change of mind",
    body: (
      <p>
        Custom and personalised items are made to your specifications, so we can’t accept returns or
        give refunds just because you’ve changed your mind. This doesn’t affect your rights if
        something is faulty or not as described.
      </p>
    ),
  },
  {
    heading: "Cancelling an order",
    body: (
      <p>
        If you need to cancel, email us as soon as possible. If we haven’t started work, we’ll
        refund your payment in full. If we have, we’ll explain what work has been done and refund
        the rest.
      </p>
    ),
  },
  {
    heading: "Refunds",
    body: (
      <p>
        Approved refunds go back to your original payment method. Your bank may take a few days to
        show it. For more, see our <Link to="/terms">terms</Link>.
      </p>
    ),
  },
];

function ShippingReturnsPage() {
  return (
    <LegalPage
      eyebrow="SHIPPING & RETURNS"
      title="Getting your order to you."
      intro={
        <p>
          The short version: we ship with Australia Post, Australia-wide and overseas, or you can
          pick up from Bullsbrook. If something’s wrong with your order, tell us and we’ll fix it.
        </p>
      }
      sections={sections}
    />
  );
}

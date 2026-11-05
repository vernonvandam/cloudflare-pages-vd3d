import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { contactEmail } from "@/lib/services";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy | VD3D" },
      {
        name: "description",
        content:
          "How VD3D collects, uses, stores and protects your personal information and design files.",
      },
    ],
  }),
  component: PrivacyPage,
});

const mail = <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        VD3D is a design, 3D printing and laser engraving business run by Vernon van Dam, a sole
        trader based in Bullsbrook, Western Australia. In this policy, “we”, “us” and “our” mean
        VD3D. You can contact us about privacy at any time at {mail}.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>We only collect what we need to quote, make and deliver your job:</p>
        <ul>
          <li>
            <strong>Quote requests:</strong> your name, email address, and optionally your phone
            number and business name, plus the job details, deadline and any files, photos or
            sketches you upload.
          </li>
          <li>
            <strong>Shop signups:</strong> your email address.
          </li>
          <li>
            <strong>Orders:</strong> your delivery address and the details of what you ordered.
            Payments are handled by the payment provider; we never see or store your full card
            details.
          </li>
          <li>
            <strong>Emails you send us:</strong> whatever you choose to include.
          </li>
          <li>
            <strong>Technical information:</strong> your IP address and basic browser details,
            processed by our hosting and spam-protection provider (Cloudflare) to keep the site
            secure. We don’t use analytics or advertising trackers.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <ul>
        <li>To reply to your enquiry, prepare a quote and ask any questions about your job.</li>
        <li>To design, make, deliver or arrange collection of your order.</li>
        <li>To send you a confirmation when you request a quote.</li>
        <li>
          To email you about the shop opening and new products, but only if you signed up for that.
          Every email has an unsubscribe link.
        </li>
        <li>To keep business and tax records, as Australian law requires.</li>
        <li>To protect the website and our forms from spam and abuse.</li>
      </ul>
    ),
  },
  {
    heading: "Your design files",
    body: (
      <>
        <p>
          Files, drawings and ideas you send us are used only to quote and make your job. We don’t
          share them, sell them, or use them for anyone else’s work.
        </p>
        <p>
          We won’t post photos of your parts or mention your project publicly without your
          permission.
        </p>
      </>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        <p>
          We never sell your personal information. We share it only with services we use to run the
          business, and only what each one needs:
        </p>
        <ul>
          <li>
            <strong>Cloudflare</strong> hosts this website and provides spam protection (Turnstile).
          </li>
          <li>
            <strong>Brevo</strong> delivers our emails, including quote confirmations, and keeps the
            shop signup list.
          </li>
          <li>
            <strong>Google</strong> hosts our email inbox (Gmail), where quote requests and your
            emails arrive.
          </li>
          <li>
            <strong>Australia Post</strong> receives your name and address when we ship an order.
          </li>
          <li>
            <strong>Our accountant or tax agent</strong> may see order and payment records.
          </li>
        </ul>
        <p>
          Some of these providers store data outside Australia, including in the United States and
          the European Union. We choose established providers with strong security and privacy
          commitments.
        </p>
        <p>
          We may also disclose information if the law requires it. Orders placed on Etsy are handled
          under Etsy’s own privacy policy.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        This website doesn’t use advertising or analytics cookies. Our spam protection (Cloudflare
        Turnstile) may use strictly necessary cookies or browser checks to tell people from bots,
        and your browser may remember small preferences. You can block cookies in your browser
        settings, but the quote form may then ask you to complete a check.
      </p>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <ul>
        <li>
          Quote requests and files are kept while we’re working with you, and for as long as needed
          for your order, any warranty questions and our records.
        </li>
        <li>
          Business and tax records are kept for at least five years, as the Australian Taxation
          Office requires.
        </li>
        <li>Shop signups are kept until you unsubscribe.</li>
      </ul>
    ),
  },
  {
    heading: "Keeping it secure",
    body: (
      <p>
        We use reputable providers with encryption in transit, keep access to your information
        limited to the people running VD3D, and protect our accounts with strong, unique passwords.
        No system is perfectly secure, but if a breach ever affected your information, we’d tell
        you.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        <p>
          You can ask to see the personal information we hold about you, correct it, or have us
          delete it (unless the law requires us to keep it). Email {mail} and we’ll respond within
          30 days.
        </p>
        <p>
          You can unsubscribe from shop emails at any time using the link in any email, or by
          emailing us.
        </p>
      </>
    ),
  },
  {
    heading: "Complaints",
    body: (
      <p>
        If you’re unhappy with how we’ve handled your information, please email {mail} first so we
        can put it right. If you’re still not satisfied, you can contact the Office of the
        Australian Information Commissioner at{" "}
        <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">
          oaic.gov.au
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We’ll update this page if the way we handle information changes, and change the date at the
        top. For how we handle orders, see our <Link to="/terms">terms</Link> and{" "}
        <Link to="/shipping-returns">shipping & returns</Link>.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACY POLICY"
      title="Your privacy and your data."
      intro={
        <p>
          The short version: we only collect what we need to quote and make your job, we never sell
          it, your design files stay private, and we only email you about the shop if you asked us
          to. The detail is below. We follow the Australian Privacy Principles.
        </p>
      }
      sections={sections}
    />
  );
}

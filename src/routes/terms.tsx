import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { contactEmail } from "@/lib/services";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service | VD3D" },
      {
        name: "description",
        content:
          "VD3D's terms for quotes, payment, design ownership, production, and your rights under Australian Consumer Law.",
      },
    ],
  }),
  component: TermsPage,
});

const mail = <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: (
      <p>
        These terms apply to quotes, custom work and products from VD3D, a business run by Vernon
        van Dam as a sole trader in Bullsbrook, Western Australia. By accepting a quote or placing
        an order, you agree to them. Nothing in these terms limits your rights under the Australian
        Consumer Law (see section 9).
      </p>
    ),
  },
  {
    heading: "Quotes",
    body: (
      <ul>
        <li>Every job is quoted before any work starts.</li>
        <li>
          Quotes are valid for <strong>14 days</strong>. After that, we may need to re-quote, for
          example if material costs have changed.
        </li>
        <li>
          A quote is based on the information and files you’ve given us. If the job changes, such as
          a new design, quantity, material or deadline, we’ll re-quote before going ahead.
        </li>
      </ul>
    ),
  },
  {
    heading: "Payment",
    body: (
      <ul>
        <li>
          <strong>Online orders</strong> are paid in full when you order.
        </li>
        <li>
          <strong>Custom and one-off jobs</strong> need a <strong>50% deposit</strong> before we
          start. The remaining 50% is due before we dispatch your order, or when you collect it.
        </li>
        <li>Prices are in Australian dollars.</li>
      </ul>
    ),
  },
  {
    heading: "Design files and ownership",
    body: (
      <>
        <p>
          <strong>Designs we create for you</strong> belong to you once your job is paid in full. On
          request, we’ll send you the files.
        </p>
        <p>
          <strong>Files you send us</strong> remain yours. By sending them, you confirm you have the
          right to have them made, and that they don’t infringe anyone else’s copyright, trade marks
          or designs. We may decline jobs we believe infringe someone’s rights.
        </p>
        <p>
          We keep your files and ideas confidential, as explained in our{" "}
          <Link to="/privacy">privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    heading: "What we won’t make",
    body: (
      <p>
        We don’t make weapons, gun parts or firearm accessories, or anything illegal to make or own
        in Australia. We may decline any job at our discretion and will refund any payment for work
        we haven’t done.
      </p>
    ),
  },
  {
    heading: "Production, tolerances and approval",
    body: (
      <>
        <p>
          3D printed and engraved parts are made by machine, layer by layer, so small variations in
          size, surface finish and colour between parts are normal and are not defects. If your part
          needs tight tolerances, tell us when you ask for a quote.
        </p>
        <p>
          For design and prototype work, we’ll ask you to check the design or a prototype before we
          produce a run. Please check it carefully: we make the run to the version you approve.
        </p>
        <p>
          If you supply a print-ready file, we print it as supplied. We’ll flag obvious problems we
          spot, but we’re not responsible for design faults in files we didn’t create.
        </p>
      </>
    ),
  },
  {
    heading: "Timing",
    body: (
      <p>
        Turnaround times on our website and in quotes are typical estimates. We’ll confirm a
        realistic date with your quote and tell you as early as possible if anything could delay
        your job.
      </p>
    ),
  },
  {
    heading: "Use of parts",
    body: (
      <p>
        3D printed parts aren’t suitable for every use. Unless we’ve specifically agreed otherwise
        in writing, our parts aren’t designed for safety-critical uses where a failure could cause
        injury, or for repeated contact with food or drink. Please follow any use or care advice we
        give you.
      </p>
    ),
  },
  {
    heading: "Your consumer rights",
    body: (
      <>
        <p>
          Our goods and services come with guarantees that cannot be excluded under the Australian
          Consumer Law. For major failures with a service, you’re entitled to cancel your service
          contract with us and to a refund for the unused portion, or to compensation for its
          reduced value. You’re also entitled to choose a refund or replacement for major failures
          with goods. If a failure with the goods or a service doesn’t amount to a major failure,
          you’re entitled to have the failure rectified in a reasonable time. If this is not done,
          you’re entitled to a refund for the goods and to cancel the contract for the service and
          obtain a refund of any unused portion. You’re also entitled to be compensated for any
          other reasonably foreseeable loss or damage from a failure in the goods or service.
        </p>
        <p>
          Because custom items are made to your specifications, we don’t offer refunds for a change
          of mind. See <Link to="/shipping-returns">shipping & returns</Link> for how to report a
          problem.
        </p>
      </>
    ),
  },
  {
    heading: "Liability",
    body: (
      <p>
        To the extent the law allows, and apart from your rights under the Australian Consumer Law,
        we aren’t liable for indirect or consequential loss, or for loss caused by parts being
        misused, modified, or used in a way we advised against. Where the law allows us to limit our
        liability, it is limited to repairing or replacing the goods, resupplying the service, or
        refunding what you paid.
      </p>
    ),
  },
  {
    heading: "Governing law and contact",
    body: (
      <p>
        These terms are governed by the laws of Western Australia. If something goes wrong, please
        email {mail} first. We’ll always try to sort it out directly and fairly.
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <LegalPage
      eyebrow="TERMS OF SERVICE"
      title="How we work together."
      intro={
        <p>
          The short version: you get a fixed quote, valid for 14 days, before any work starts.
          Custom jobs need a 50% deposit. Designs we make for you are yours once paid. We don’t make
          weapons. Your rights under Australian Consumer Law always apply.
        </p>
      }
      sections={sections}
    />
  );
}

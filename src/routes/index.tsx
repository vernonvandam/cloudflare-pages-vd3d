import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowDown, ArrowRight, ArrowUpRight, Layers3, Palette, PenTool, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConsultationBand, SiteFooter, SiteHeader } from '@/components/site-shell'
import { consultationUrl, contactEmail, services } from '@/lib/services'
import hero from '@/assets/precision-hero.jpg'
import { ProofSection } from '@/components/proof-section'
import { ShopTeaser } from '@/components/shop-teaser'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'VD3D | Design, Prototyping & 3D Printing in Perth' },
    { name: 'description', content: 'Design help, prototypes and short production runs for Perth startups, small businesses, makers and trades. Multi-colour 3D printing and laser engraving from one workshop.' },
    { property: 'og:title', content: 'VD3D | A problem solved, not just a print' },
    { property: 'og:description', content: 'Design help, prototypes and short production runs for Perth startups, small businesses, makers and trades.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
})

function Index() {
  return <><SiteHeader/><main id="main">
    <section className="hero" aria-label="VD3D design and manufacturing">
      <img className="hero-photo" src={hero} alt="Illustrative 3D printed lattice structures and precision mechanical parts" width={1920} height={1024} fetchPriority="high"/>
      <div className="hero-content"><div className="eyebrow"><span className="status-dot"/> VD3D · PERTH DESIGN &amp; PRINT WORKSHOP</div><h1>A PROBLEM SOLVED.<br/>NOT JUST <span>A PRINT.</span></h1><p className="hero-copy">Design help, prototypes and short production runs for Perth startups, small businesses, makers and trades, all from one workshop.</p><div className="hero-ctas"><Button asChild variant="industrial" size="feature"><a href={consultationUrl}>Get a quote <ArrowUpRight/></a></Button><Button asChild variant="industrialOutline" size="feature"><a href="#services">See what we do <ArrowRight/></a></Button></div></div>
      <div className="hero-foot"><span>DESIGN · PROTOTYPE · PRODUCE</span><a href="#services">HOW WE HELP <ArrowDown size={14}/></a></div>
    </section>
    <section className="benefits" aria-label="What we work with"><div className="site-width benefit-grid"><div className="benefit"><Layers3/><div><h3>Seven-printer farm.</h3><p>Prototypes and short runs, printed in parallel.</p></div></div><div className="benefit"><Palette/><div><h3>Multi-colour printing.</h3><p>Colour and branding printed in, not painted on.</p></div></div><div className="benefit"><Zap/><div><h3>Laser engraving.</h3><p>Logos, labels and serial numbers on your parts.</p></div></div><div className="benefit"><PenTool/><div><h3>Design support.</h3><p>No file? We’ll design it with you.</p></div></div></div></section>
    <section id="services" className="section site-width"><div className="section-heading"><div><div className="eyebrow">HOW WE HELP</div><h2>One workshop.<br/>Idea to finished part.</h2></div><p>Design, printing and engraving under one roof, so nothing gets lost between suppliers and you deal with one person from start to finish.</p></div><div className="service-grid">{services.map((service,index) => <Link key={service.slug} className="service-card" to="/services/$service" params={{ service: service.slug }}><div className="service-image"><img src={service.image} alt={service.alt} width={1024} height={768} loading="lazy"/></div><span className="service-number">0{index+1} / {service.eyebrow.toUpperCase()}</span><div className="service-title"><h3>{service.title}</h3><ArrowUpRight/></div><p>{service.description}</p></Link>)}</div></section>
    <ProofSection/>
    <section id="process" className="section process-section"><div className="site-width"><div className="section-heading"><div><div className="eyebrow">HOW IT WORKS</div><h2>Three steps. One point of contact.</h2></div><Button asChild variant="link"><a href={consultationUrl}>Get a quote <ArrowUpRight/></a></Button></div><div className="process-grid"><div><span className="process-number">01 / TELL US THE PROBLEM</span><h3>Send what you’ve got.</h3><p>A sketch, photos, measurements, a broken part or a finished file. Tell us what it needs to do, how many you need and when.</p></div><div><span className="process-number">02 / DESIGN &amp; PROTOTYPE</span><h3>Test it before you commit.</h3><p>We design or refine the part and print a prototype. You test it, we adjust, so mistakes are caught on one part, not three hundred.</p></div><div><span className="process-number">03 / PRODUCE</span><h3>Print, engrave, deliver.</h3><p>Once it’s right, we print your run, add any engraving and finish it. Print-ready files typically take 1–2 days; design to first print, 3–5 days.</p></div></div></div></section>
    <section id="about" className="section site-width about-band"><div><div className="eyebrow">WHO WE WORK WITH</div><h2>Startups, small businesses,<br/>makers and trades.</h2></div><div className="about-copy"><p>You need a part that works, not just print time. Maybe it’s a prototype for a product you’re launching, a custom bracket for a job, or a few hundred branded holders for your business.</p><p>Cheaper print services will run whatever file you send. We help you get the design right first, so you avoid costly reprints and delays, then produce it in multi-colour with laser engraving if you need it.</p><Button asChild variant="link" className="px-0"><a href={`mailto:${contactEmail}`}>Email {contactEmail} <ArrowUpRight/></a></Button></div></section>
    <ShopTeaser/>
    <ConsultationBand/>
  </main><SiteFooter/></>
}

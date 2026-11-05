import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Box, ChevronDown, Crosshair, Layers3, MapPin, Menu, Route as RouteIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { consultationUrl, services } from '@/lib/services'
import logoMark from '@/assets/vd3d-mark-green.svg'
import logoFull from '@/assets/vd3d-horizontal-green.svg'

export function Brand() {
  return <Link to="/" aria-label="VD3D home" className="brand"><img src={logoMark} alt="VD3D" className="brand-logo" width={136} height={100} /></Link>
}
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  return <header className="site-header">
    <div className="site-width header-top"><Brand /><div className="header-actions"><span className="header-location"><MapPin size={13}/> Perth, Western Australia</span><Button asChild variant="industrial" size="default"><a href={consultationUrl}>Let’s talk <ArrowUpRight /></a></Button><Button className="mobile-toggle" variant="navigation" size="icon" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</Button></div></div>
    <nav className={`header-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation"><div className="site-width nav-inner">
      <div className="service-menu"><Button variant="navigation" className="nav-link" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}><Layers3/> Our services <ChevronDown size={12}/></Button>{servicesOpen && <div className="service-dropdown">{services.map(service => <Link key={service.slug} to="/services/$service" params={{ service: service.slug }} onClick={() => { setServicesOpen(false); setMobileOpen(false) }}><ArrowUpRight size={16}/>{service.title}</Link>)}</div>}</div>
      <a className="nav-link" href="/#process" onClick={() => setMobileOpen(false)}><RouteIcon/> Our process</a><a className="nav-link" href="/#services" onClick={() => setMobileOpen(false)}><Box/> What we create</a><a className="nav-link" href="/#about" onClick={() => setMobileOpen(false)}><Crosshair/> About VD3D</a>
    </div></nav>
  </header>
}
export function ConsultationBand() {
  return <section className="cta-band"><div className="site-width cta-inner"><div><h2>Your next idea.<br/><span>Let’s make it real.</span></h2><p>Start with a conversation. No obligations, just possibilities.</p></div><Button asChild variant="industrial" size="feature"><a href={consultationUrl}>Book a consultation <ArrowUpRight/></a></Button></div></section>
}
export function SiteFooter() {
  return <footer className="footer"><div className="site-width"><div className="footer-main"><Link to="/" aria-label="VD3D home" className="brand"><img src={logoFull} alt="VD3D: 3D printing, prototyping and laser engraving" className="footer-logo" width={300} height={70} /></Link><div className="footer-links"><a href="/#services">Our services</a><a href="/#about">About us</a><a href={consultationUrl}>Contact</a><a href="https://www.instagram.com/vandam3d/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a></div></div><div className="footer-bottom"><span>© 2026 VD3D. All rights reserved.</span><span>Designed, printed and created in Perth, Western Australia.</span></div></div></footer>
}
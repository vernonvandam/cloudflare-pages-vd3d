import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronDown,
  Crosshair,
  HelpCircle,
  Layers3,
  MapPin,
  Menu,
  Route as RouteIcon,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { consultationUrl, contactEmail, services } from "@/lib/services";
import logoMark from "@/assets/vd3d-mark-green.svg";
import logoFull from "@/assets/vd3d-horizontal-green.svg";

export function Brand() {
  return (
    <Link to="/" aria-label="VD3D home" className="brand">
      <img src={logoMark} alt="VD3D" className="brand-logo" width={136} height={100} />
    </Link>
  );
}
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-width header-top">
        <Brand />
        <div className="header-actions">
          <span className="header-location">
            <MapPin size={13} /> Perth, Western Australia
          </span>
          <Button asChild variant="industrial" size="default">
            <a href={consultationUrl}>
              Get a quote <ArrowUpRight />
            </a>
          </Button>
          <Button
            className="mobile-toggle"
            variant="navigation"
            size="icon"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <nav className={`header-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Main navigation">
        <div className="site-width nav-inner">
          <div className="service-menu">
            <Button
              variant="navigation"
              className="nav-link"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <Layers3 /> Our services <ChevronDown size={12} />
            </Button>
            {servicesOpen && (
              <div className="service-dropdown">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to="/services/$service"
                    params={{ service: service.slug }}
                    onClick={() => {
                      setServicesOpen(false);
                      setMobileOpen(false);
                    }}
                  >
                    <ArrowUpRight size={16} />
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <a className="nav-link" href="/#process" onClick={() => setMobileOpen(false)}>
            <RouteIcon /> Our process
          </a>
          <a className="nav-link" href="/#about" onClick={() => setMobileOpen(false)}>
            <Crosshair /> About VD3D
          </a>
          <a className="nav-link" href="/#reviews" onClick={() => setMobileOpen(false)}>
            <Star /> Reviews
          </a>
          <Link className="nav-link" to="/faq" onClick={() => setMobileOpen(false)}>
            <HelpCircle /> FAQ
          </Link>
          <Link className="nav-link" to="/shop" onClick={() => setMobileOpen(false)}>
            <ShoppingBag /> Shop
          </Link>
        </div>
      </nav>
    </header>
  );
}
export function ConsultationBand() {
  return (
    <section className="cta-band">
      <div className="site-width cta-inner">
        <div>
          <h2>
            Got a problem to solve?
            <br />
            <span>Let’s make the part.</span>
          </h2>
          <p>
            Tell us what you need, how many and by when. You’ll get a straight answer and a quote,
            no obligation. Or email us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
        <Button asChild variant="industrial" size="feature">
          <a href={consultationUrl}>
            Get a quote <ArrowUpRight />
          </a>
        </Button>
      </div>
    </section>
  );
}
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="site-width">
        <div className="footer-main">
          <Link to="/" aria-label="VD3D home" className="brand">
            <img
              src={logoFull}
              alt="VD3D: 3D printing, prototyping and laser engraving"
              className="footer-logo"
              width={300}
              height={70}
            />
          </Link>
          <div className="footer-links">
            <a href="/#services">Our services</a>
            <a href="/#about">About us</a>
            <Link to="/shop">Shop</Link>
            <Link to="/faq">FAQ</Link>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a href="https://www.instagram.com/vandam3d/" target="_blank" rel="noreferrer">
              Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 VD3D. All rights reserved.</span>
          <nav className="legal-links" aria-label="Legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/shipping-returns">Shipping &amp; returns</Link>
          </nav>
          <span>Designed, printed and created in Perth, Western Australia.</span>
        </div>
      </div>
    </footer>
  );
}

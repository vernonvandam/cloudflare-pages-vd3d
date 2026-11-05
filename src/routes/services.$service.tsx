import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader, SiteFooter, ConsultationBand } from '@/components/site-shell'
import { consultationUrl, services } from '@/lib/services'

export const Route = createFileRoute('/services/$service')({
  loader: ({ params }) => {
    const service = services.find(item => item.slug === params.service)
    if (!service) throw notFound()
    return service
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? 'Services'} | VD3D Perth` },
    { name: 'description', content: loaderData?.description ?? 'Explore VD3D services in Perth.' },
    { property: 'og:title', content: `${loaderData?.title ?? 'Services'} | VD3D Perth` },
    { property: 'og:description', content: loaderData?.description ?? 'Explore VD3D services in Perth.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ServicePage,
})
function ServicePage() {
  const service = Route.useLoaderData()
  return <><SiteHeader/><main><section className="section site-width service-detail"><Button asChild variant="link" className="px-0"><Link to="/"><ArrowLeft/> Back to VD3D</Link></Button><div className="service-detail-grid"><div><div className="eyebrow">{service.eyebrow}</div><h1>{service.title}</h1><p>{service.detail}</p><ul>{service.features.map(feature => <li key={feature}><Check/>{feature}</li>)}</ul><Button asChild variant="industrial" size="feature"><Link to="/quote" search={{ service: service.slug }}>Get a quote <ArrowUpRight/></Link></Button></div><img src={service.image} alt={service.alt} width={1024} height={768}/></div></section><ConsultationBand/></main><SiteFooter/></>
}
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Building2, CalendarCheck, Check,
  ChevronDown, ClipboardCheck, Image as ImageIcon, Mail, MapPin, Menu,
  MessageCircle, Phone, Play, Sparkles, Star, X
} from 'lucide-react'

const brand = 'JO Painting & Pressure Washing'
const phone = '(401) 662-5830'

const results = [
  ['01', '/img/grid/driveway transpormation.webp', 'Driveway transformation', 'Driveway transformation', 'wide'],
  ['02', '/img/grid/Ultra-realistic_authentic_UGC_documentary_extreme_-1790266321585.webp', 'Before cleaning', 'Heavy buildup, before', 'tall'],
  ['03', '/img/grid/Ultra-realistic_authentic_UGC_documentary_photogra-1790266387409.webp', 'Pressure washing in action', 'Pressure washing in action', 'action'],
  ['04', '/img/grid/house wash.webp', 'House wash', 'House wash', 'portrait'],
  ['05', '/img/grid/patio restoration.webp', 'Patio restoration', 'Patio restoration', 'wide'],
  ['06', '/img/grid/Ultra-realistic_authentic_UGC_after-result_documen-1790266438572.webp', 'Fresh finish', 'Fresh, clean finish', 'square'],
  ['07', '/img/grid/Ultra-realistic_authentic_UGC_documentary_photogra-1790266387409.webp', 'On the job', 'On the job', 'landscape'],
  ['08', '/img/grid/Ultra-realistic_authentic_UGC_after-result_documen-1790266438572.webp', 'Final result', 'The final result', 'landscape'],
] as const

const services = [
  { icon: Sparkles, title: 'Driveways & Walkways', text: 'Lift embedded dirt, tire marks, algae, and surface buildup to make concrete look fresh again.', tags: ['Concrete', 'Walkways', 'Driveways', 'Curb Appeal'], image: '/img/serv/Ultra-realistic_authentic_UGC_documentary_photogra-1790266769740.webp', label: 'Driveway and walkway cleaning' },
  { icon: Building2, title: 'House Washing & Siding', text: 'A detail-focused exterior clean that helps restore the appearance of siding, brick, and exterior surfaces.', tags: ['Siding', 'Brick', 'Exterior', 'Soft Wash'], image: '/img/serv/Ultra-realistic_authentic_UGC_documentary_photogra-1790266772166.webp', label: 'House washing and siding cleaning' },
  { icon: MapPin, title: 'Patios, Decks & Fences', text: 'Bring outdoor spaces back to life by removing seasonal buildup, grime, and discoloration.', tags: ['Patios', 'Decks', 'Fences', 'Outdoor Living'], image: '/img/serv/Ultra-realistic_authentic_UGC_documentary_photogra-1790266786834.webp', label: 'Patio, deck and fence cleaning' },
]

const reviews = [
  { quote: 'We sent a few photos and got a quick, clear quote. The driveway looked completely different when they finished — clean, bright, and cared for. Great communication from start to finish.', name: 'Verified Customer', location: 'Newport, RI' },
  { quote: 'They showed up on time, protected the surrounding areas, and did an amazing job cleaning our patio and walkways. Everything looked fresh again without any hassle.', name: 'Verified Customer', location: 'Middletown, RI' },
  { quote: 'Our siding and front entrance had years of buildup. The difference was immediate. Professional crew, clean work, and results you can actually see.', name: 'Verified Customer', location: 'Portsmouth, RI' },
]

function Button({ children, secondary = false, href = '#contact' }: { children: React.ReactNode; secondary?: boolean; href?: string }) {
  return <a href={href} className={`button ${secondary ? 'button-secondary' : 'button-primary'}`}>{children}</a>
}

function Placeholder({ label, path, ratio = 'wide', className = '' }: { label: string; path: string; ratio?: string; className?: string }) {
  if (path.startsWith('/img/')) {
    return <img src={encodeURI(path)} alt={label} className={`real-image real-image-${ratio} ${className}`} loading="lazy" decoding="async" draggable={false} onLoad={e => e.currentTarget.classList.add('is-loaded')} ref={el => { if (el && el.complete) el.classList.add('is-loaded') }} />
  }
  return <div className={`placeholder placeholder-${ratio} ${className}`} data-path={path}>
    <div className="placeholder-content"><ImageIcon size={18} strokeWidth={1.5} /><span>Real project photo coming soon</span></div>
  </div>
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: React.ReactNode; text: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>
}

function BlurText({ children }: { children: string }) {
  return <>{children.split('\n').map((line, i) => <span key={line} className="line">{line.split(' ').map((word, j) => <motion.span key={`${word}-${j}`} initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65, delay: (i * 3 + j) * .07, ease: [.22, 1, .36, 1] }}>{word}&nbsp;</motion.span>)}</span>)}</>
}

function BeforeAfter() {
  const [value, setValue] = useState(52)
  return <div className="before-after" style={{ '--split': `${value}%` } as React.CSSProperties}>
    <img src="/img/before.webp" alt="Surface before pressure washing" className="before-image ba-img" decoding="async" onLoad={e => e.currentTarget.classList.add('is-loaded')} ref={el => { if (el && el.complete) el.classList.add('is-loaded') }} />
    <div className="after-image"><img src="/img/after.webp" alt="Surface after pressure washing" className="ba-img" decoding="async" onLoad={e => e.currentTarget.classList.add('is-loaded')} ref={el => { if (el && el.complete) el.classList.add('is-loaded') }} /></div>
    <span className="ba-label ba-before">Before</span><span className="ba-label ba-after">After</span>
    <input aria-label="Reveal before and after result" type="range" min="0" max="100" value={value} onChange={e => setValue(Number(e.target.value))} />
    <div className="ba-handle" aria-hidden="true"><ArrowLeft size={13} /><ArrowRight size={13} /></div>
  </div>
}

function Lightbox({ active, onClose, onMove }: { active: number | null; onClose: () => void; onMove: (delta: number) => void }) {
  useEffect(() => { if (active === null) return; const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onMove(1); if (e.key === 'ArrowLeft') onMove(-1) }; document.addEventListener('keydown', key); return () => document.removeEventListener('keydown', key) }, [active, onClose, onMove])
  if (active === null) return null
  const item = results[active]
  return <AnimatePresence><motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Project result preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <button className="icon-button close" aria-label="Close preview" onClick={onClose}><X /></button><button className="icon-button prev" aria-label="Previous image" onClick={e => { e.stopPropagation(); onMove(-1) }}><ArrowLeft /></button>
    <motion.div className="lightbox-frame" onClick={e => e.stopPropagation()} initial={{ scale: .96 }} animate={{ scale: 1 }}><Placeholder label={item[2]} path={item[1]} ratio="lightbox" /><p>{item[3]}</p></motion.div>
    <button className="icon-button next" aria-label="Next image" onClick={e => { e.stopPropagation(); onMove(1) }}><ArrowRight /></button>
  </motion.div></AnimatePresence>
}

export default function Page() {
  const [menu, setMenu] = useState(false); const [lightbox, setLightbox] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  const moveLightbox = (delta: number) => setLightbox(i => i === null ? null : (i + delta + results.length) % results.length)
  return <main className={menu ? 'menu-open' : ''}>
    <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}><a href="#top" className="logo" aria-label="Home"><span>JO</span><b>PAINTING</b><span>& WASHING</span></a><nav className={`nav-links ${menu ? 'open' : ''}`}>{['Home', 'Services', 'Results', 'Reviews', 'Contact'].map(link => <a key={link} href={`#${link === 'Home' ? 'top' : link.toLowerCase()}`} onClick={() => setMenu(false)}>{link}</a>)}<a className="nav-cta" href={`tel:${phone}`} onClick={() => setMenu(false)}><Phone size={16} /> Call Now</a></nav><Button>Get Free Quote <ArrowUpRight size={16} /></Button><button className="menu-button" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></header>

    <section id="top" className="hero section-dark"><div className="hero-placeholder" aria-hidden="true" /><video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/Pressure_washing_house_siding_video_20260924115827.mp4" type="video/mp4" /></video><div className="hero-shade" /><div className="hero-content"><motion.span className="eyebrow glass" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>LOCAL PRESSURE WASHING • FREE ESTIMATES</motion.span><h1><BlurText>{"Years of grime.\nGone."}</BlurText></h1><motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>Professional pressure washing for driveways, siding, patios, decks, fences, and commercial properties.</motion.p><div className="hero-actions"><Button>Get a Free Quote <ArrowUpRight size={17} /></Button><Button secondary href={`tel:${phone}`}><MessageCircle size={17} /> Text Us Photos</Button></div><div className="trust-chips"><span>Free Estimates</span><span>Fast Response</span><span>Residential & Commercial</span></div></div><a href="#results" className="scroll-cue" aria-label="Scroll to results"><ChevronDown size={20} /></a></section>

    <section id="results" className="section results-section"><SectionHeading eyebrow="REAL RESULTS" title={<>The difference<br />is obvious.</>} text="Drag to reveal real transformations from actual pressure washing projects." /><BeforeAfter /></section>

    <section className="section gallery-section"><SectionHeading eyebrow="MORE REAL WORK" title={<>Proof in every<br />surface.</>} text="Real projects. Real process. Real results." /><div className="gallery-grid">{results.map((item, i) => <motion.button key={item[0]} className={`gallery-item gallery-${item[4]}`} onClick={() => setLightbox(i)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * .04 }} aria-label={`Open ${item[3]}`}><Placeholder label={item[2]} path={item[1]} ratio={item[4]} /><span className="gallery-label"><b>{item[0]}</b>{item[3]}</span></motion.button>)}</div><Lightbox active={lightbox} onClose={() => setLightbox(null)} onMove={moveLightbox} /></section>

    <section id="services" className="section services-section section-dark"><div className="section-bg-placeholder" aria-hidden="true" /><SectionHeading eyebrow="WHAT WE CLEAN" title={<>Built to restore<br />your curb appeal.</>} text="Professional exterior cleaning for the surfaces that shape your first impression." /><div className="services-grid">{services.map(({ icon: Icon, ...service }) => <article className="service-card glass" key={service.title}><div className="service-top"><Icon size={24} /><span>0{services.indexOf({ ...service } as never) + 1}</span></div><Placeholder label={service.label} path={service.image} ratio="service" /><div className="service-copy"><h3>{service.title}</h3><p>{service.text}</p><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Button>Get a Quote <ArrowUpRight size={16} /></Button></div></article>)}</div></section>

    <section className="section process-section"><SectionHeading eyebrow="SIMPLE PROCESS" title={<>Send photos.<br />Get a clear quote.</>} text="A straightforward experience from first message to finished surface." /><div className="steps">{[['01', 'Text or call us.', MessageCircle], ['02', 'Get your free estimate.', ClipboardCheck], ['03', 'Enjoy a cleaner property.', Sparkles]].map(([num, text, Icon]) => <div className="step" key={num as string}><span>{num as string}</span><Icon /><h3>{text as string}</h3></div>)}</div><div className="center-actions"><Button href={`tel:${phone}`}><Phone size={17} /> Call Now</Button><Button secondary><MessageCircle size={17} /> Text Us Photos</Button></div></section>

    <section id="reviews" className="section why-section"><SectionHeading eyebrow="WHY HOMEOWNERS CHOOSE US" title={<>Clean work.<br />Clear communication.</>} text="The details that make a pressure washing project feel simple." /><div className="benefit-grid">{[[ClipboardCheck, 'Free Estimates'], [CalendarCheck, 'Fast Scheduling'], [Sparkles, 'Detail-Focused Results'], [Building2, 'Residential & Commercial']].map(([Icon, title]) => <div className="benefit" key={title as string}><Icon /><span>{title as string}</span></div>)}</div><div className="review-wrap"><SectionHeading eyebrow="CLIENT FEEDBACK" title={<>Results people notice.</>} text="Authentic feedback from the people we serve." /><div className="reviews">{reviews.map((review, n) => <article className="review" key={n}><div className="review-stars" aria-label="Five star review">★★★★★</div><p>{review.quote}</p></article>)}</div><a className="text-link" href="#">Read More Reviews <ArrowUpRight size={15} /></a></div></section>

    <section className="section area-section"><div><span className="eyebrow">SERVICE AREA</span><h2>Proudly serving<br /><em>Newport County & nearby Rhode Island communities.</em></h2><p>Not sure whether you are in our service area? Send us your address or photos and we will let you know.</p><div className="area-chips">{['Newport', 'Middletown', 'Portsmouth', 'Jamestown', 'Narragansett', 'North Kingstown', 'Tiverton', 'Bristol'].map(city => <span key={city}>{city}</span>)}</div><Button>Check Availability <ArrowUpRight size={16} /></Button></div><div className="area-map"><iframe src="https://www.google.com/maps?q=451+Broadway,+Newport,+RI+02840&output=embed" width="100%" height="420" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Jo Painting LLC location — 451 Broadway, Newport, Rhode Island" allowFullScreen /></div></section>

    <section id="contact" className="quote-section section-dark"><div className="final-placeholder" aria-hidden="true" /><div className="final-copy"><span className="eyebrow">READY WHEN YOU ARE</span><h2>Ready to make your<br /><em>property look new again?</em></h2><p>Request a free estimate today. Send photos by text for a faster response.</p><div className="hero-actions"><Button href={`tel:${phone}`}><Phone size={17} /> Call Now</Button><Button secondary href="sms:+14016625830"><MessageCircle size={17} /> Text Us Photos</Button></div></div></section>

    <footer><div className="footer-brand"><a href="#top" className="logo"><span>JO</span><b>PAINTING</b><span>& WASHING</span></a><p>Premium exterior cleaning for properties that deserve a fresh start.</p></div><div className="footer-contact"><a href={`tel:${phone}`}><Phone size={15} /> {phone}</a><a href="mailto:info@jopainting.com"><Mail size={15} /> info@jopainting.com</a><span><MapPin size={15} /> Newport County, Rhode Island</span></div><div className="footer-links">{['Home', 'Services', 'Results', 'Reviews', 'Contact'].map(x => <a key={x} href={`#${x === 'Home' ? 'top' : x.toLowerCase()}`}>{x}</a>)}</div><small>© 2026 {brand}. All rights reserved.</small></footer>
    <div className="mobile-bar"><a href={`tel:${phone}`}><Phone size={18} /> Call Now</a><a href="#contact"><ArrowUpRight size={18} /> Get Quote</a></div>
  </main>
}

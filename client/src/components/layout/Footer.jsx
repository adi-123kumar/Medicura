import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { site } from '../../config/site';

const col = 'text-[15px] text-navy-200 transition hover:text-white';

/** Green call-to-action band + footer. Shared by every public page through MainLayout. */
export default function Footer() {
  return (
    <>
      <section className="bg-leaf-600 text-white">
        <div className="container-page flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.17em] text-white/80">Your next step starts here</p>
            <h2 className="mt-3 max-w-[640px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.1] text-white">Make your medical career plan with clarity.</h2>
          </div>
          <Link to="/contact#inquiry" className="btn-white shrink-0 !h-[60px] px-9 text-base">Get free counselling <ArrowUpRight size={17} /></Link>
        </div>
      </section>

      <footer className="bg-navy-800 text-navy-200">
        <div className="container-page grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-[320px] text-[15px] leading-relaxed">Supportive guidance for students exploring medical education in India and abroad.</p>
            <span className="mt-6 inline-block rounded-full border border-leaf-400/50 px-4 py-2 text-[13px] font-medium text-leaf-300">A clearer path to medicine</span>
          </div>
          <div>
            <h3 className="mb-5 text-base font-bold text-white">Explore</h3>
            <ul className="space-y-3.5">
              <li><Link className={col} to="/about">About us</Link></li>
              <li><Link className={col} to="/colleges/mbbs-india">MBBS colleges</Link></li>
              <li><Link className={col} to="/neet-predictor">NEET predictor</Link></li>
              <li><Link className={col} to="/insights">Insights &amp; articles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-base font-bold text-white">Study pathways</h3>
            <ul className="space-y-3.5">
              <li><Link className={col} to="/colleges/mbbs-india">MBBS in India</Link></li>
              <li><Link className={col} to="/colleges/mbbs-abroad">MBBS abroad</Link></li>
              <li><Link className={col} to="/colleges/md-ms">MD / MS guidance</Link></li>
              <li><Link className={col} to="/contact#inquiry">Talk to a counselor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-base font-bold text-white">Get in touch</h3>
            <ul className="space-y-3.5">
              <li><a className={col} href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
              <li><Link className={col} to="/contact">Contact page</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page space-y-3 py-6">
            <p className="text-[11px] text-sky-300">{site.disclaimer}</p>
            <p className="text-[13px] text-navy-300">{site.sampleNote}</p>
          </div>
        </div>
        <div className="bg-navy-900">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-[11px] text-navy-300 sm:flex-row">
            <p>© {new Date().getFullYear()} {site.name}</p>
            <nav className="flex gap-6" aria-label="Legal">
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/sitemap" className="hover:text-white">Site map</Link>
            </nav>
            <p className="text-sky-300">Designed for future doctors</p>
          </div>
        </div>
      </footer>
    </>
  );
}

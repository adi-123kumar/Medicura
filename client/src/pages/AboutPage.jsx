import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import InfoPage from '../components/common/InfoPage';
import { AboutCard } from '../components/home/AboutSplit';
import { site } from '../config/site';

const POINTS = ['University and course exploration', 'Admission process guidance', 'Application and document planning', 'Support for your next steps'];

export default function AboutPage() {
  return (
    <InfoPage title="About us" eyebrow={`About ${site.name}`} heading="Guidance that keeps your goals in focus." intro="Choosing where and how to study medicine involves many decisions. We help you explore your options and organize your questions.">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <AboutCard />
        <div>
          {/* TODO: replace with your real story, team and credentials */}
          <p className="max-w-[580px] text-[17px] leading-[1.8] text-slate-500">
            {site.name} helps students and parents make confident decisions about medical education. We explain the admission process in plain language,
            shortlist colleges that fit your score and budget, and support you through counselling, documentation and, for overseas study, visas and travel.
          </p>
          <p className="mt-4 max-w-[580px] text-[17px] leading-[1.8] text-slate-500">
            Every college page lists fees, seats, recognition and admission steps in one place. Please verify time-sensitive details with the college and official authorities before making a decision.
          </p>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3.5 text-[16px] font-bold text-navy-700">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf-50 text-leaf-600"><Check size={15} strokeWidth={3} /></span>{p}
              </li>
            ))}
          </ul>
          <Link to="/contact#inquiry" className="btn-primary mt-9">Speak with a counselor <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </InfoPage>
  );
}

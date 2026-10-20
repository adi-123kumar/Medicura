import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { AlertTriangle, BadgeIndianRupee, FileText, GraduationCap, Info, TrendingUp } from 'lucide-react';
import DetailHero from '../components/detail/DetailHero';
import QuickFacts from '../components/detail/QuickFacts';
import DetailTabs from '../components/detail/DetailTabs';
import GuidanceSidebar from '../components/detail/GuidanceSidebar';
import { Card, Overview, Fees, Admission, Placements, Documents } from '../components/detail/DetailSections';
import NotFoundPage from './NotFoundPage';
import { findCollege } from '../utils/colleges';
import { site } from '../config/site';

export default function CollegeDetailPage() {
  const { category, slug } = useParams();
  const college = findCollege(category, slug);

  useEffect(() => {
    if (college) document.title = `${college.name} | ${site.name}`;
  }, [college]);

  if (!college) return <NotFoundPage message="We could not find that college." />;

  return (
    <>
      <DetailHero college={college} />
      <QuickFacts college={college} />
      <div className="mt-6"><DetailTabs /></div>
      <div className="container-page mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-8">
          <Card id="overview" icon={Info} title={`About ${college.shortName}`}><Overview college={college} /></Card>
          <Card id="fees" icon={BadgeIndianRupee} title="Fee structure"><Fees college={college} /></Card>
          <Card id="admission" icon={GraduationCap} title="Admission process"><Admission college={college} /></Card>
          <Card id="placements" icon={TrendingUp} title="Placement & career highlights"><Placements college={college} /></Card>
          <Card id="documents" icon={FileText} title="Documents required"><Documents college={college} /></Card>
          <div className="flex gap-3 rounded-2xl border border-coral-400 bg-coral-50 p-5 text-sm text-slate-700">
            <AlertTriangle className="mt-0.5 shrink-0 text-coral-600" size={18} />
            <p><b>Please verify before you decide.</b> {college.notice || site.disclaimer} Confirm current fees, seats and recognition with the college and official authorities.</p>
          </div>
        </div>
        <GuidanceSidebar college={college} />
      </div>
    </>
  );
}

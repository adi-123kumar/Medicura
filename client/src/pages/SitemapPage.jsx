import { Link } from 'react-router-dom';
import InfoPage from '../components/common/InfoPage';

const GROUPS = [
  ['Main', [['/', 'Home'], ['/about', 'About us'], ['/contact', 'Contact'], ['/neet-predictor', 'NEET Predictor']]],
  ['Study pathways', [['/colleges/mbbs-india', 'MBBS India'], ['/colleges/mbbs-abroad', 'MBBS Abroad'], ['/colleges/md-ms', 'MD / MS']]],
  ['Updates', [['/updates', 'Admission updates'], ['/insights', 'Insights & articles']]],
  ['Legal', [['/privacy', 'Privacy'], ['/terms', 'Terms']]],
];

export default function SitemapPage() {
  return (
    <InfoPage title="Site map" heading="Everything on the site.">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map(([title, links]) => (
          <div key={title}>
            <h2 className="eyebrow-plain mb-4">{title}</h2>
            <ul className="space-y-3">{links.map(([to, label]) => <li key={to}><Link to={to} className="font-semibold text-navy-700 hover:underline">{label}</Link></li>)}</ul>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}

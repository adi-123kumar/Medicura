import { useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Pagination from '../components/common/Pagination';
import EmptyState from '../components/common/EmptyState';
import Eyebrow from '../components/common/Eyebrow';
import CollegeCard from '../components/college/CollegeCard';
import CollegeToolbar from '../components/college/CollegeToolbar';
import NotFoundPage from './NotFoundPage';
import { getCategory } from '../config/categories';
import { useCollegeFilters } from '../hooks/useCollegeFilters';
import { contactUrl, groupCounts } from '../utils/colleges';

/** One page for every listing type. The `categoryKey` prop (or route param) picks the dataset. */
export default function CollegeListPage({ categoryKey }) {
  const params = useParams();
  const category = getCategory(categoryKey || params.category);
  if (!category) return <NotFoundPage />;
  return <ListInner category={category} />;
}

function ListInner({ category }) {
  const filters = useCollegeFilters(category.colleges);
  const groups = useMemo(() => groupCounts(category.colleges), [category]);
  const topRef = useRef(null);

  const goToPage = (n) => {
    filters.setPage(n);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: category.crumb }]}
        eyebrow={category.heroEyebrow}
        title={category.heroTitle}
        text={category.heroText}
        action={<Link to={contactUrl({ interest: category.course })} className="btn-outline">Ask a counselor <ArrowUpRight size={15} /></Link>}
      />

      <section ref={topRef} className="scroll-mt-24 bg-white py-16 md:py-20">
        <div className="container-page">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Eyebrow>{category.dirEyebrow}</Eyebrow>
              <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.05em]">
                {category.dirTitle[0]}<br /><span className="text-leaf-600">{category.dirTitle[1]}</span>
              </h2>
            </div>
            <div>
              <p className="max-w-[500px] text-[17px] leading-[1.7] text-slate-500">{category.dirText(category.colleges.length)}</p>
              <Link to={contactUrl({ interest: category.course })} className="btn-outline mt-6">Talk to a counselor <ArrowUpRight size={15} /></Link>
            </div>
          </div>

          <div className="mt-10"><CollegeToolbar category={category} filters={filters} groups={groups} /></div>

          {filters.filtered.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                title={category.colleges.length ? 'No matches found' : 'Listings are coming soon'}
                text={category.colleges.length ? 'Try a different search or choose another option in the filter.' : 'We are adding profiles to this section. Talk to a counselor for the latest options.'}
                action={<Link to={contactUrl({ interest: category.course })} className="btn-primary">Talk to a counselor <ArrowUpRight size={15} /></Link>}
              />
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filters.shown.map((c, i) => <CollegeCard key={c.id} college={c} number={filters.offset + i + 1} />)}
              </div>
              <div className="mt-10 border-t border-navy-100 pt-8">
                <Pagination page={filters.page} pages={filters.pages} onChange={goToPage} />
              </div>
            </>
          )}

          <p className="mt-8 text-sm text-slate-500">The supplied reference-page extracts are clearly marked as unverified. Confirm current NMC, MCC, seat, fee, ranking and admission information with official sources before relying on it.</p>
        </div>
      </section>
    </>
  );
}

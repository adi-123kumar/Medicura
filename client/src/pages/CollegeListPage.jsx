import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CategoryHero from '../components/college/CategoryHero';
import CollegeFilters from '../components/college/CollegeFilters';
import CollegeCard from '../components/college/CollegeCard';
import EmptyState from '../components/common/EmptyState';
import NotFoundPage from './NotFoundPage';
import { getCategory } from '../config/categories';
import { useCollegeFilters } from '../hooks/useCollegeFilters';
import { groupCounts } from '../utils/colleges';
import { useGuidance } from '../features/guidance/GuidanceContext';

/** One page for every listing type. The `category` prop (or route param) picks the dataset. */
export default function CollegeListPage({ categoryKey }) {
  const params = useParams();
  const category = getCategory(categoryKey || params.category);
  if (!category) return <NotFoundPage />;
  return <ListInner category={category} />;
}

function ListInner({ category }) {
  const { openGuidance } = useGuidance();
  const filters = useCollegeFilters(category.colleges);
  const groups = useMemo(() => groupCounts(category.colleges), [category]);
  const types = useMemo(() => [...new Set(category.colleges.map((c) => c.type))].sort(), [category]);

  return (
    <>
      <CategoryHero category={category} />
      <section className="container-page mt-10">
        <CollegeFilters category={category} filters={filters} groups={groups} types={types} />
        <p className="mt-8 text-center text-xs font-bold uppercase tracking-widest text-coral-600" aria-live="polite">{filters.filtered.length} results</p>
        <h2 className="mt-1 text-center text-3xl font-extrabold sm:text-4xl">Top medical colleges {category.key === 'mbbs-abroad' ? 'abroad' : 'in India'}</h2>

        {category.colleges.length === 0 ? (
          <div className="mt-8"><EmptyState title="Listings are coming soon" text="We are adding colleges to this section. Talk to a counsellor to get the latest options." action={<button className="btn-ink" onClick={() => openGuidance()}>Talk to a counsellor</button>} /></div>
        ) : filters.filtered.length === 0 ? (
          <div className="mt-8"><EmptyState title="No colleges match these filters" text="Try a different search or clear a filter." action={<button className="btn-outline" onClick={filters.clear}>Clear filters</button>} /></div>
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filters.shown.map((c) => <CollegeCard key={c.id} college={c} />)}
            </div>
            {filters.hasMore && (
              <div className="mt-10 text-center">
                <button onClick={filters.showMore} className="btn-ink px-8">Show more colleges</button>
                <p className="mt-2 text-xs text-slate-500">Showing {filters.shown.length} of {filters.filtered.length}</p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

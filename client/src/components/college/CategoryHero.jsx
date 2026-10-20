import Breadcrumb from '../common/Breadcrumb';
import { categoryStats, formatNumber } from '../../utils/colleges';

export default function CategoryHero({ category }) {
  const stats = categoryStats(category);
  return (
    <>
      <section className="bg-gradient-to-b from-coral-50 to-cream py-14 text-center">
        <div className="container-page">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Colleges' }, { label: category.navLabel }]} />
          <p className="mt-6 text-sm font-bold text-coral-600">{category.eyebrow}</p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
            {category.title} <span className="text-coral-600">{category.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{category.description}</p>
        </div>
      </section>
      <div className="container-page -mt-8">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {category.stats.map((key) => (
            <div key={key} className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
              <dt className="order-2 mt-1 text-xs font-semibold text-slate-500">{stats[key].label}</dt>
              <dd className="font-display text-3xl font-extrabold text-coral-600">{formatNumber(stats[key].value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

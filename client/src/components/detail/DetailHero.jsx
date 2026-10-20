import Breadcrumb from '../common/Breadcrumb';
import { CATEGORIES } from '../../config/categories';

export default function DetailHero({ college }) {
  const category = CATEGORIES[college.category];
  const meta = [college.city, college.country, college.seats && `${college.seats} seats`, college.recognition, college.ranking].filter(Boolean).join(' • ');
  return (
    <section className="bg-pine-900 py-14 text-center text-white">
      <div className="container-page">
        <Breadcrumb dark items={[{ label: 'Home', to: '/' }, { label: category.navLabel, to: category.path }, { label: college.shortName }]} />
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-coral-400">{college.type}</p>
        <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-extrabold text-white sm:text-5xl">{college.name}</h1>
        <p className="mt-4 text-lg text-pine-100">{meta}</p>
      </div>
    </section>
  );
}

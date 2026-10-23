import PageHero from '../common/PageHero';
import { CATEGORIES } from '../../config/categories';

export default function DetailHero({ college }) {
  const category = CATEGORIES[college.category];
  const meta = [college.city, college.country, college.seats && `${college.seats} seats`, college.recognition, college.ranking].filter(Boolean).join(' · ');
  return (
    <PageHero
      crumbs={[{ label: 'Home', to: '/' }, { label: category.crumb, to: category.path }, { label: college.shortName }]}
      eyebrow={`${college.type} · ${college.group}`}
      title={college.name}
      text={meta}
    />
  );
}

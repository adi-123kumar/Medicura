import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import CollegeCard from '../college/CollegeCard';
import { CATEGORIES } from '../../config/categories';

export default function FeaturedColleges({ categoryKey, title, text, count = 3 }) {
  const category = CATEGORIES[categoryKey];
  const list = category.colleges.slice(0, count);
  if (!list.length) return null;
  return (
    <section className="container-page py-14">
      <SectionHeading title={title} text={text} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => <CollegeCard key={c.id} college={c} />)}
      </div>
      <div className="mt-8 text-center"><Link to={category.path} className="btn-outline">View all {category.navLabel} colleges</Link></div>
    </section>
  );
}

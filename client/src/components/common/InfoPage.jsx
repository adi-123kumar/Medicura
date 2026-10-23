import { useEffect } from 'react';
import PageHero from './PageHero';
import { site } from '../../config/site';

/** Hero + readable column. Used by About, Privacy, Terms, Site map. */
export default function InfoPage({ title, crumb, eyebrow, heading, intro, children }) {
  useEffect(() => { document.title = `${title} | ${site.name}`; }, [title]);
  return (
    <>
      <PageHero crumbs={[{ label: 'Home', to: '/' }, { label: crumb || title }]} eyebrow={eyebrow || title} title={heading || title} text={intro} />
      <section className="bg-white py-14 md:py-20"><div className="container-page">{children}</div></section>
    </>
  );
}

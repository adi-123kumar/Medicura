import Breadcrumb from './Breadcrumb';
import McRings from './McRings';

/** Pale hero band with breadcrumb, eyebrow, big title and optional action. Used by list, detail and info pages. */
export default function PageHero({ crumbs, eyebrow, title, text, action, art = true }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mist via-mist to-leaf-50/60">
      {art && <McRings className="pointer-events-none absolute -right-24 top-0 hidden h-full w-auto min-w-[560px] lg:block" />}
      <div className="container-page relative pb-16 pt-9 md:pb-20">
        <Breadcrumb items={crumbs} />
        <p className="eyebrow mt-14 !text-slate-500">{eyebrow}</p>
        <h1 className="h-display mt-5 max-w-[820px]">{title}</h1>
        {text && <p className="mt-6 max-w-[680px] text-lg leading-relaxed text-slate-500">{text}</p>}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </section>
  );
}

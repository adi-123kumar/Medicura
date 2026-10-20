import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '../config/site';
import { useGuidance } from '../features/guidance/GuidanceContext';

export default function ContactPage() {
  const { openGuidance } = useGuidance();
  const items = [
    [Phone, 'Call us', site.phone, `tel:${site.phone.replace(/\s/g, '')}`],
    [Mail, 'Email', site.email, `mailto:${site.email}`],
    [MapPin, 'Visit', site.address, null],
  ];
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="text-4xl font-extrabold">Contact us</h1>
      <p className="mt-3 text-slate-600">Reach out directly or request a call back and we will get in touch.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {items.map(([Icon, label, value, href]) => (
          <div key={label} className="rounded-3xl border border-slate-200 p-5">
            <Icon className="text-lake-700" />
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
            {href ? <a href={href} className="mt-1 block break-words font-semibold text-pine-900 hover:underline">{value}</a> : <p className="mt-1 font-semibold text-pine-900">{value}</p>}
          </div>
        ))}
      </div>
      <button onClick={() => openGuidance()} className="btn-accent mt-8">Request a call back</button>
    </section>
  );
}

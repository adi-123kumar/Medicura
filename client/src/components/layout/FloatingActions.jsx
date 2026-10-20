import { MessageCircle, Phone } from 'lucide-react';
import { site } from '../../config/site';
import { waLink } from '../../utils/colleges';
import { useGuidance } from '../../features/guidance/GuidanceContext';

export default function FloatingActions() {
  const { openGuidance } = useGuidance();
  return (
    <div className="fixed bottom-16 right-4 z-40 flex flex-col gap-3">
      <a
        href={waLink(site.whatsapp, `Hi ${site.name}, I need MBBS admission guidance.`)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
      >
        <Phone size={22} />
      </a>
      <button onClick={() => openGuidance()} aria-label="Request a call back" className="grid h-12 w-12 place-items-center rounded-full bg-lake-600 text-white shadow-lg hover:bg-lake-700">
        <MessageCircle size={22} />
      </button>
    </div>
  );
}

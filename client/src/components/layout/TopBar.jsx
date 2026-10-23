import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { site } from '../../config/site';

export default function TopBar() {
  return (
    <div className="bg-navy-900 text-[13px] text-white">
      <div className="container-page flex h-[35px] items-center justify-between gap-4">
        <p className="truncate text-white/90">{site.announcement}</p>
        <Link to="/contact#inquiry" className="flex shrink-0 items-center gap-1.5 font-semibold text-leaf-300 hover:text-white">
          Talk with a counselor <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

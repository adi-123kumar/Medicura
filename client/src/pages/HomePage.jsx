import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import FeaturedColleges from '../components/home/FeaturedColleges';
import Faq from '../components/home/Faq';
import CtaBand from '../components/home/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedColleges categoryKey="mbbs-india" title="Top MBBS colleges in India" text="A few of the colleges students ask about most." />
      <Services />
      <FeaturedColleges categoryKey="mbbs-abroad" title="Popular MBBS universities abroad" text="English-medium programmes with listed fees and duration." />
      <Faq />
      <CtaBand />
    </>
  );
}

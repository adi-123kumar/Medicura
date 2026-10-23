import Hero from '../components/home/Hero';
import { IndiaOverview, ImpactStats } from '../components/home/StatsBands';
import ExploreOptions from '../components/home/ExploreOptions';
import Pathways from '../components/home/Pathways';
import AboutSplit from '../components/home/AboutSplit';
import Destinations from '../components/home/Destinations';
import SupportGrid from '../components/home/SupportGrid';

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndiaOverview />
      <ImpactStats />
      <ExploreOptions />
      <Pathways />
      <AboutSplit />
      <Destinations />
      <SupportGrid />
    </>
  );
}

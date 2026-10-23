import InfoPage from '../components/common/InfoPage';
import InquiryForm from '../features/inquiry/InquiryForm';

const STEPS = [
  ['Share your score', 'Tell us your NEET score, preferred course and where you would like to study.'],
  ['We shortlist', 'A counselor matches your score and budget to colleges and the right counselling route.'],
  ['You decide', 'Review the shortlist, then verify fees, seats and recognition with official sources.'],
];

export default function NeetPredictorPage() {
  return (
    <InfoPage
      title="NEET Predictor"
      eyebrow="NEET predictor"
      heading="Know your options before counselling."
      intro="We don’t publish automatic cut-off predictions, because they depend on the current year’s official data. Share your score and a counselor will prepare a realistic shortlist."
    >
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <ol className="space-y-5">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="flex gap-5 border border-navy-100 bg-mist p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-700 text-sm font-bold text-white">{i + 1}</span>
              <div><h3 className="text-xl font-bold text-navy-700">{t}</h3><p className="mt-1.5 text-slate-500">{d}</p></div>
            </li>
          ))}
        </ol>
        <div id="inquiry" className="scroll-mt-28 border border-navy-100 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(11,32,88,0.45)] sm:p-10">
          <InquiryForm title="Share your NEET details." defaultCourse="NEET guidance" source="neet-predictor" showNeet />
        </div>
      </div>
    </InfoPage>
  );
}

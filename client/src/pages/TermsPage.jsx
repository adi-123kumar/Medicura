import InfoPage from '../components/common/InfoPage';

const H = ({ children }) => <h2 className="mb-3 mt-10 text-2xl font-bold first:mt-0">{children}</h2>;
const P = ({ children }) => <p className="leading-[1.8] text-slate-500">{children}</p>;

// TODO: have this reviewed before launch.
export default function TermsPage() {
  return (
    <InfoPage title="Terms" heading="Terms of use.">
      <div className="max-w-3xl">
        <H>Guidance, not a guarantee</H>
        <P>This site offers information and counselling support for medical admissions. We cannot guarantee admission, seats, fees or visas. Outcomes depend on eligibility, merit and the decisions of the institutions and authorities involved.</P>
        <H>Verify before you decide</H>
        <P>Admissions, eligibility, cut-offs, fees, seats and recognition change. Confirm current details with the college and official bodies such as NMC, MCC and the relevant state authority before you pay or commit.</P>
        <H>Information on this site</H>
        <P>College profiles are compiled from collected information and may be incomplete or out of date. Using this site means you accept that you are responsible for checking details that matter to your decision.</P>
      </div>
    </InfoPage>
  );
}

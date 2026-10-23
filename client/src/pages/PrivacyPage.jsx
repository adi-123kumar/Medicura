import InfoPage from '../components/common/InfoPage';
import { site } from '../config/site';

const H = ({ children }) => <h2 className="mb-3 mt-10 text-2xl font-bold first:mt-0">{children}</h2>;
const P = ({ children }) => <p className="leading-[1.8] text-slate-500">{children}</p>;

// TODO: have this reviewed against how you actually handle data before launch.
export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy" heading="How we handle your details.">
      <div className="max-w-3xl">
        <H>What we collect</H>
        <P>When you submit the inquiry form we collect your name, email address, message and the course you are interested in. Phone number and NEET score are optional. If you ask from a college page, we also record which college.</P>
        <H>How we use it</H>
        <P>We use these details only to respond to your inquiry and to guide you on admissions. Our counselors see them in a private dashboard.</P>
        <H>Sharing and retention</H>
        <P>We do not sell your details. We keep them for as long as needed to help you, and you can ask us to delete them at any time.</P>
        <H>Contact</H>
        <P>To ask about or delete your details, call {site.phone} or write to {site.email}.</P>
      </div>
    </InfoPage>
  );
}

import DemoSection from "../components/DemoSection";
import PageHeader from "../components/PageHeader";
import UploadForm from "../components/UploadForm";

export default function Home() {



  return (
    <>
      <PageHeader heading={"Add Captions to your Videos"} subHeading={"Just Upload your Videos, we will do the rest!"} />
      <div className="text-center">
        <UploadForm />
      </div>
      <DemoSection />
    </>
  )
}

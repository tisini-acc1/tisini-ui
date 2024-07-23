import { AboutTournament } from "@/components/tournaments/AboutTournament";
import { FaqsTournament } from "@/components/tournaments/FaqsTournament";
import { Footer } from "@/components/tournaments/Footer";
import Header from "@/components/tournaments/Header";
import { HeroTournment } from "@/components/tournaments/HeroTournment";
import { tournaData } from "@/lib/constants/tournaments";
import { Tournament } from "@/lib/types/scores";
import { useParams } from "react-router-dom";

const SingleTournament = () => {
  const { tournament } = useParams<{ tournament: string }>();
  const title = tournament?.replace(/-/g, " ");
  const tourna: Tournament =
    title && tournaData[title] ? tournaData[title] : ({} as Tournament);

  console.log(title);
  console.log(tourna);
  return (
    <main className="bg-black h-screen">
      <Header />
      <HeroTournment />
      <AboutTournament />
      <FaqsTournament faqs={tourna.questions} img="" />
      <Footer />
    </main>
  );
};

export default SingleTournament;

import HeroSection from "../components/Home/HeroSection";
import PopularAreas from "../components/Home/PopularAreas"
import HowItWorks from "../components/Home/HowItWorks";
import UserTypeSection from "../components/Home/UserTypeSection"
import TrustSection  from "../components/Home/TrustSection"
import RoomShowcase from "../components/Home/RoomShowcase";


function Home() {
  return (
    <main>

      <HeroSection />

      <RoomShowcase/>

       <PopularAreas /> 

      <HowItWorks />

      <UserTypeSection />

      <TrustSection /> 

    </main>
  );
}

export default Home;
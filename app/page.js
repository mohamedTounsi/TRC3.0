import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import Whatis from "./components/Whatis";
import Aboutus from "./components/Aboutus";
import Ambassador from "./components/Ambassador";
import PreviousEditions from "./components/Previous";
import Team from "./components/Team";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      
      <Navbar/>
      <HeroSection/>
      <Aboutus/>
      <Ambassador/>
     <PreviousEditions/>
     <Team/>
     <Footer/>
    </div>
  );
}

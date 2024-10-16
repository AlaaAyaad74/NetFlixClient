import { useEffect, useState } from "react";
import SectionOne from "../coponents/landingPageComponents/SectionOne";
 
import FaqSection from "../coponents/landingPageComponents/faqSection";
 

const LandingPage = () => {
 

 
 

  return (
    <div>
      <SectionOne />
      <img style={{ width: "100%" }} src={"/Blocks.png"} alt="section2" />
      <FaqSection   />
    </div>
  );
};

export default LandingPage;

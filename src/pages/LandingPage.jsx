import { useEffect, useState } from "react";
import SectionOne from "../coponents/landingPageComponents/SectionOne";

import BlockData from "../coponents/landingPageComponents/blockDataSection";
import FaqSection from "../coponents/landingPageComponents/faqSection";
import { API_BASE_URL } from "../constants";

import landingPageApi from "../api/landingPageApi"; // Import the API

const LandingPage = () => {
  const [landingBlocks, setLandingBlocks] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        const data = await landingPageApi.getLandingPageData(); // Use the new API method

        setLandingBlocks(data.landingBlocks);
        console.log(data.landingBlocks);

        // Transform FAQ data to match FaqSection's expected structure
        const formattedFaqs = data.faqs.map((faq) => ({
          title: faq.question,
          children: faq.answer,
        }));

        setFaqs(formattedFaqs);
      } catch (error) {
        console.error("Error fetching landing page data:", error);
      }
    };

    fetchLandingPageData();
  }, []);

  return (
    <div>
      <SectionOne />
      {landingBlocks &&
        landingBlocks.length > 0 &&
        landingBlocks.map((block, index) => (
          <BlockData
            key={block._id}
            title={block.title}
            imgSrc={`${API_BASE_URL}${block.imgUrl}`} // imgUrl now comes directly from API
            desc={block.desc}
            direction={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      {faqs && faqs.length > 0 && <FaqSection faqItems={faqs} />}
    </div>
  );
};

export default LandingPage;

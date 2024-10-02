import React from "react";
import { useState } from "react";
import faq from "../../assets/images/faq.png";
import UpArrowIcon from "../../assets/images/upArrow.png";
import DownArrowIcon from "../../assets/images/downArrow.png";
import faqs from "./faqsData.js"

export default function Index() {

  const toggleFAQ = (index) => {
    if (faqState === index) {
      setFaqState(null); // Collapse if already expanded
    } else {
      setFaqState(index); // Expand the clicked FAQ
    }
  };

  const [faqState, setFaqState] = useState(null);
  return (
    <div>
      <div className="bg-contact-image bg-cover bg-no-repeat bg-center -mt-28 lg:-mt-16 lg:h-[513px] overflow-hidden">
        <div className="mx-32">
          <div className="flex justify-evenly items-center">
            <div className="mt-32 lg:mt-0">
              <h2 className="mb-4 lg:pt-0">
                <span className="text-6xl lg:text-7xl font-normal ">
                  <span className="font-extrabold">FAQs </span>
                </span>
              </h2>
              <p className="text-[#464F54] lg:text-xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="lg:pt-20">
              <img src={faq} alt="post Image" />
            </div>
          </div>
        </div>
      </div>
      <div className="m-32">
        <div id="accordionExample" className=" rounded-xl bg-white">
          {
            faqs.map((faq, index) => (
              <div className="rounded-lg mb-6 box-shadow2 bg-[#287BB7]">
                <h2 className="mb-0 " id="headingOne ">
                  <button
                    className="group relative flex w-full items-center rounded-t-lg border-0  px-5 py-3 text-left text-base "
                    type="button"
                    data-twe-collapse-init
                    data-twe-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-[#ffffff] font-medium text-xl  lg:text-3xl ">
                      {faq.question}
                    </span>
                    <span className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
                      <img src={(faqState === index) ? DownArrowIcon : UpArrowIcon} alt="arrow-icon" style={{ 'filter': 'invert(100%)' }} />
                    </span>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  data-twe-collapse-item
                  data-twe-collapse-show
                  aria-labelledby="headingOne"
                  data-twe-parent="#accordionExample"
                >
                  <div className="px-5 text-xl text-black bg-[#f1f1f1] ">
                    {faqState === index && <p className="py-3">{faq.answer}</p>}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

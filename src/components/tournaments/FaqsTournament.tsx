// import { FaPlus } from "react-icons/fa6";
// import { FaMinus } from "react-icons/fa6";

import { Question } from "@/lib/types/scores";
import { useState } from "react";

type FaqsProps = {
  faqs: Question[];
  img: string;
};

export const FaqsTournament = ({ faqs, img }: FaqsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(faqs);
  return (
    <section className="section">
      <div className="container mx-auto">
        <h1 className="title text-center mb-8">'FAQS'</h1>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 order-1 lg:-order-1">
            <div>
              <img src="" alt="" />
            </div>
          </div>

          <div className="flex-1 lg:p-5">
            {faqs.map((question) => (
              <Accordion
                section={question}
                key={question.id}
                isActiveSection={question.id === activeIndex}
                setActiveIndex={setActiveIndex}
                sectionIndex={question.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type SectionType = {
  id: number;
  question: string;
  answer: string;
};

type AccordionProps = {
  section: SectionType;
  isActiveSection: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  sectionIndex: number;
};

const Accordion = (props: AccordionProps) => {
  const { section, isActiveSection, setActiveIndex, sectionIndex } = props;

  const toggleSection = () => {
    const nextIndex = isActiveSection ? 0 : sectionIndex;
    setActiveIndex(nextIndex);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between border-2 rounded-md p-3 my-2 cursor-pointer"
        onClick={toggleSection}
      >
        <h2 className="text-xl font-semibold">{section.question}</h2>

        {isActiveSection ? "+" : "-"}
        {/* {isActiveSection ? <FaMinus /> : <FaPlus />} */}
      </div>

      <div className="px-5 text-[#71717a]">
        {isActiveSection && <p>{section.answer}</p>}
      </div>
    </div>
  );
};

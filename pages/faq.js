import s from "../styles/faq.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { Abel } from "@next/font/google";

const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

const faq = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      question: "Q.What types of keyboards do you sell?",
      answer:
        "A.We specify on custom built mechanical keyboards such as Keychron, Ducky, Yunzii, Varmilo and more are to come.",
    },
    {
      question: "Q.Can I return a keyboard if I am not satisfied with it?",
      answer:
        "A.Yes, we offer a 30-day return policy for all of our products. Please contact our customer service team for more information.",
    },
    {
      question: "Q.Can I customize the lighting on a mechanical keyboard?",
      answer:
        "A.Many of our mechanical keyboards have customizable lighting options, allowing you to change the color and brightness of the backlit keys.",
    },
    {
      question: "Q.Do you offer any warranties on your keyboards?",
      answer:
        "A.Yes, we offer a one-year warranty on all of our keyboard products",
    },
    {
      question: "Q.What payment methods do you accept?",
      answer:
        "A.We accept all major credit cards, Klarna,Apple pay(Depending on what browser you are using) , Google pay and bank transfers.",
    },
    {
      question: "Q.How long will it take for my keyboard to be delivered?",
      answer:
        "A.Delivery times vary based on your location and the shipping method chosen at checkout (standard 2-3 business). Please contact our customer service team for more information.",
    },
    {
      question: "Q.Do you offer international shipping?",
      answer:
        "A.Right now we only ship to Sweden, Norway and Denmark Please contact our customer team service for further information.",
    },
    {
      question: "Q.Do you have any special deals or discounts available?",
      answer:
        "A.We offer various discounts throughout the year, please check our website regularly for current promotions.",
    },
  ];

  return (
    <div className={s.faqContainer}>
      <div className={s.faqCon}>
        <h1 className={s.faqTitle}>FAQ - QWERTY</h1>
        {questions.map((question, index) => (
          <div className={s.faqBox} key={index}>
            <div
              className={s.questionBox}
              onClick={() =>
                setActiveQuestion(activeQuestion === index ? null : index)
              }
            >
              {question.question}
              {activeQuestion === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {activeQuestion === index && <p>{question.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default faq;

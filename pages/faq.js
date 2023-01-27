import s from "../styles/faq.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const faq = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      question: "What types of keyboards do you sell?",
      answer:
        "We specify on custom built mechanical keyboards such as Keychron, Ducky, Yunzii, Varmilo and more are to come.",
    },
    {
      question: "Can I return a keyboard if I am not satisfied with it?",
      answer:
        "Yes, we offer a 30-day return policy for all of our products. Please contact our customer service team for more information.",
    },
    {
      question: "Can I customize the lighting on a mechanical keyboard?",
      answer:
        "Many of our mechanical keyboards have customizable lighting options, allowing you to change the color and brightness of the backlit keys.",
    },
    {
      question: "Do you offer any warranties on your keyboards?",
      answer:
        "Yes, we offer a one-year warranty on all of our keyboard products",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, Klarna,Apple pay(Depending on what browser you are using) , Google pay and bank transfers.",
    },
    {
      question: "How long will it take for my keyboard to be delivered?",
      answer:
        "Delivery times vary based on your location and the shipping method chosen at checkout (standard 5-7 business days). Please contact our customer service team for more information.",
    },
    {
      question: "Can i cancel my order once it's placed?",
      answer:
        "It depends on how far along your order is in the packing process. If you want to cancel your order pleace contact customer service as soon as possible.",
    },
    {
      question: "How do i change my profile infomation?",
      answer:
        "If you want to change your profile information please contact our customer service and we'll sort it out for you.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Right now we only ship to Sweden, Norway and Denmark Please contact our customer team service for further information.",
    },
    {
      question: "Do you have any special deals or discounts available?",
      answer:
        "We offer various discounts throughout the year, please check our website regularly for current promotions.",
    },
    {
      question: "What are cookies?",
      answer:
        `Cookies are small text files that are stored on a user's computer or mobile device by a website. They are used to remember a user's preferences, browsing history, and other information. For more information, click `,
      link: <Link style={{textDecoration:'underline'}} href='/cookies'>here</Link>
    },
  ];

  return (
    <>
      <Head>
        <title>QWERTY - FAQs</title>
        <meta name="description" content="QWERTY - Your one-stop shop for custom built mechanical keyboards, accessories, and more. We specialize in Keychron, Ducky, Yunzii, Varmilo and other mechanical keyboard brands."/>
        <meta name="keywords" content="mechanical keyboard, custom keyboard, Keychron, Ducky, Yunzii, Varmilo, keyboard accessories"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="QWERTY"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                {activeQuestion === index ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </div>
              {activeQuestion === index && <p>{question.answer} {question.link}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default faq;

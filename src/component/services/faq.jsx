import React, { useState, useEffect } from 'react';
import { H1, H5, Font2 } from '@/config/typography'

export default function Faq({ data, list }) {
    const [openAccordion, setOpenAccordion] = useState(null);


    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };


    return (
        <section className="py-[30px] md:py-[50px] lg:py-[100px]">
            <div className="container mx-auto ">
                <div className="mb-16">
                    <H1 className="font-creato mb-6 text-center capitalize" >{data.title}</H1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">

                    <div className="accordion-group" data-accordion="default-accordion">
                        {list.map((item, index) => (
                            <div
                                key={index}
                                className={`accordion border-b border-solid border-gray-700 p-4 transition duration-500 mb-8 lg:p-4`}
                            >
                                <button
                                    className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 pb-4`}
                                    aria-controls={`collapse-${index}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <H5 className="mb-2 xl:mb-3">{item.question}</H5>
                                    <svg
                                        className={`w-6 h-6 transition duration-500 ${openAccordion === index ? 'hidden' : 'block'}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 12H18M12 18V6"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                    <svg
                                        className={`w-6 h-6 transition duration-500 ${openAccordion === index ? 'block' : 'hidden'} `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 12H18"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    id={`collapse-${index}`}
                                    className="accordion-content w-full overflow-hidden pr-4 transition-all duration-500"
                                    aria-labelledby={`heading-${index}`}
                                    style={{
                                        maxHeight: openAccordion === index ? '250px' : '0',
                                        opacity: openAccordion === index ? '1' : '0',
                                        transition: 'max-height 0.5s ease, opacity 0.5s ease',
                                    }}
                                >

                                    <Font2 className="font-montserrat text-[#666666] py-2">{item.answer}</Font2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

import React from "react";
import { H2, H3, H5, Font2 } from "@/config/typography";
import useEmblaCarousel from "embla-carousel-react";

import cardImgBG from "@/assets/member-service/service-card-bg.png";
import { A } from "@/config/typography";

const OPTIONS = { align: "center" };

export default function MemberService({ data, list }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div className="py-[50px] lg:py-[80px] ">
      {/* slider */}
      <div className="container mx-auto ">
        <H2 className="font-creato mb-3 text-center capitalize">
          {data.title}
        </H2>
        <Font2 className="text-[#333333]text-opacity-80 text-center">
          {data.content}
        </Font2>
        <div className="embla py-4 md:py-8 lg:py-16">
          <div
            className="embla__viewport my-8"
            ref={emblaRef}
            options={OPTIONS}
          >
            <div className="embla__container">
              {list.map((item, index) => (
                <div className="embla__slide" key={index}>
                  <div
                    className="px-8 py-8 2xl:py-7 rounded-[30px] border border-gray-200 mt-6 mb-2 min-h-[330px] relative"
                    style={{
                      background: `url(${cardImgBG})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <H5 className="mb-2 xl:mb-3">{item.title}</H5>
                    <Font2 className="text-[#333333] mb-2">{item.para}</Font2>
                    <A className="mb-10 text-[#FF6F61] underline decoration-[#FF6F61] ">
                      {item.title}
                    </A>

                    <div className="absolute bottom-[25px] right-[25px] text-red text-[25px] p-[10px] rounded-full ">
                      <img src={item.icon} width="45px" height="45px" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <H3 className="font-creato my-6 text-center capitalize ">
            {data.title2}
          </H3>

          <button className="px-10 py-3 my-4 bg-red-500 text-white font-medium rounded-[25px] hover:bg-red-600 ">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

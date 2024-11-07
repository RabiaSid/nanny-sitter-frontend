import React from "react";
import { H2, H3, H5, Font2 } from "@/config/typography";
import useEmblaCarousel from "embla-carousel-react";
import Icon from "@/assets/services/hero/icon.png";
import { A, Font1 } from "@/config/typography";

const OPTIONS = { align: "center" };
const SLIDE_COUNT = 6;

export default function MemberShip({ data, list }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div className="py-[30px] md:py-[50px] lg:py-[100px]">
      {/* slider */}
      <div className="container mx-auto group">
        <img src={Icon} className="h-[50px] xl:min-h-850px] mx-auto mb-4" />
        <H2 className="font-creato mb-4 text-center capitalize">
          {data.title}
        </H2>
        <Font2 className="text-[#333333]text-opacity-80 text-center">
          {data.content}
        </Font2>
        <div className="embla my-8">
          <div
            className="embla__viewport my-8"
            ref={emblaRef}
            options={OPTIONS}
          >
            <div className="embla__container">
              {list.map((item, index) => (
                <div className="embla__slide" key={index}>
                  <div className="px-8 py-16 rounded-[30px] border border-gray-200 mt-6 mb-2 hover:border-[#609FC6] hover:shadow-md text-center flex flex-col items-center">
                    <img
                      src={item.icon}
                      width="70px"
                      height="70px"
                      className="mb-4"
                    />
                    <H5 className="mb-2 xl:mb-3">{item.title}</H5>
                    <Font2 className="text-[#333333]">{item.para}</Font2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button className="px-10 py-3 mb-4 bg-[#609FC6] text-white font-medium rounded-[25px]  ">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import HeroImg from "@/assets/dashboard/hero/hero-img.png";
import HeartImage from "@/assets/dashboard/hero/heart-line.png";
import { H3, H6, Font2 } from "@/config/typography";

export default function Hero() {
  return (
    <div className="py-[30px] ">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border p-8 shadow-lg bg-white rounded-xl">
          <div className="col-span-5">
            <img src={HeroImg} className="max-h-[250px]" />
          </div>
          <div className="col-span-7 text-center flex items-center flex-col justify-center">
            <h1 className="font-creato text-[32px]">
              Top Nanny Sitter Hiring Assistance
            </h1>
            <img src={HeartImage} className="w-[50%] my-5" />
            <Font2 clas sName="font-montserrat text-[#232323] font-semibold">
              Get the nanny agency experience without the high <br /> cost.
              We’ll do the hard work to find your ideal nanny.
            </Font2>
            <button className="px-[65px] pt-1 pb-2 border border-gray-600 text-black font-medium rounded-[55px]  mt-5 hover:text-white hover:border-none hover:bg-red-500 text-[20px] flex items-center justify-center">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
// import HeroImg from "@/assets/services/hero/hero-img.png"
import Icon from "@/assets/services/hero/icon.png";
import { H1, H6, Font1 } from "@/config/typography";

export default function Hero({ data }) {
  return (
    <div className="py-[30px] md:py-[50px] ">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div className="mb-4 ">
            <img src={Icon} className="h-[50px] xl:min-h-850px]" />
            <H1 className="font-creato mb-4 capitalize">{data.title}</H1>
            <Font1 className="font-montserrat text-[#666666] py-2 border-b border-gray-300">
              {data.content}
            </Font1>
            <Font1 className="font-montserrat text-[#666666] py-2">
              {data.content2}
            </Font1>
          </div>
          <div className="">
            <img src={data.Img} className="h-[500px] xl:min-h-[550px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

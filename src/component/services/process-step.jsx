import React from 'react'
import { H2, H5, Font2 } from '@/config/typography'





export default function ProcessStep({ data, list }) {
    return (
        <div className="py-[30px] lg:py-[50px]">
            <div className="container mx-auto ">
                <H2 className="font-creato mb-10 text-center capitalize">{data.title}</H2>

                <img src={data.img} className={`mb-4 hidden lg:block ${data.widthFull ? "w-full" : "w-[80%]"} mx-auto`}/>
                <div className="grid lg:grid-cols-3 gap-8">

                    {list.map((item, index) => (
                        <div className="px-8 py-4 2xl:py-7 rounded-[30px] bg-[#fff]  mt-6 mb-2 text-center" key={index}>
                            <H5 className="mb-2 xl:mb-3">{item.title}</H5>
                            <Font2 className="text-[#333333]">{item.para}</Font2>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}







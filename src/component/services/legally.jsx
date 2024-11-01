import React from 'react'
import { H1, H5, Font1, Font2 } from '@/config/typography'


export default function Legally({ data, list }) {
    return (
        <div className="pb-[30px] md:pb-[50px] lg:pb-[100px] pt-[30px] md:pt-[50px] lg:pt-[130px] border">
            <div className="container mx-auto ">
                <H1 className="font-creato mb-8 text-center capitalize" >{data?.title}</H1>
                {list.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-[50px]">
                        {item.ImgLeft && <div className='flex justify-center'>
                            <img src={item.ImgLeft} className='h-[500px] xl:min-h-[550px]' />
                        </div>}
                        {item.ImgLeft2 && <div className='flex justify-center'>
                            <img src={item.ImgLeft2} className='h-[500px] xl:min-h-[700px]' />
                        </div>}
                        <div className="">
                            <H5 className="mb-2 xl:mb-3 capitalize">{item.title}</H5>
                            <Font1 className="font-montserrat text-[#666666] py-2">{item.desc}</Font1>
                            <Font1 className="text-[#000] text-opacity-80 underline decoration-black mt-3">{item.linkContent}</Font1>
                        </div>

                        {item.ImgRight && <div className='flex justify-center'>
                            <img src={item.ImgRight} className='h-[500px] xl:min-h-[550px]' />
                        </div>}
                        {item.ImgRight2 && <div className='flex justify-center'>
                            <img src={item.ImgRight2} className='h-[500px] xl:min-h-[700px]' />
                        </div>}

                    </div>
                ))}
            </div>
        </div>
    )
}

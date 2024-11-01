import React from 'react';
import { H1, H5, Font2 } from '@/config/typography';



export default function TwoWay({data, list}) {
    return (
        <div className="py-[30px] md:py-[70px] lg:py-[100px]">
            <div className="container mx-auto">
                <div className="pb-16">
                    <H1 className="font-creato mb-6 text-center capitalize">{data.title}</H1>
                </div>
                <div className='grid grid-cols-2 gap-12'>
                    {list.map((item, index) => (
                        <div key={index} className='col-span-1 text-center'>
                            <img src={item.img} alt={item.title} />
                            <H5 className="my-2 xl:my-3">{item.title}</H5>
                            <Font2 className="mx-auto font-montserrat mb-0 xl:text-base w-8/12">{item.description}</Font2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

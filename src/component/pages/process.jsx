import React from 'react'
import { H2, H5, Font1 } from '@/config/typography'
import useEmblaCarousel from 'embla-carousel-react'


const OPTIONS = { align: 'center' }


export default function Process({data, list}) {
    const [emblaRef, emblaApi] = useEmblaCarousel()

    return (
        <div className="py-[30px] lg:py-[50px]">
            <div className="container mx-auto ">
                <H2 className="font-creato mb-10 text-center capitalize">{data.title}</H2>
                <div className="embla ">
                    <div className="embla__viewport" ref={emblaRef} options={OPTIONS}>
                        <div className="embla__container">
                            {list.map((item, index) => (
                                <div className="embla__slide" key={index}>
                                    <div className='px-8 py-4 2xl:py-7 rounded-[30px] bg-[#fff] border border-gray-200 flex flex-col justify-center h-[350px]'>
                                        <img src={item.icon} width="70px" height="70px" className='mb-4' />
                                        <H5 className="mb-2 xl:mb-3">{item.title}</H5>
                                        <Font1 className="text-[#333333]">{item.para}</Font1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

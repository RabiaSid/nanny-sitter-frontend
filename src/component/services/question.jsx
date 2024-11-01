import React from 'react'
import { H2, H5, Font2 } from '@/config/typography'
import useEmblaCarousel from 'embla-carousel-react'
import { useState } from 'react'

const OPTIONS = { align: 'center' }
const SLIDE_COUNT = 6


export default function Question({ data, list }) {
    const [isShow, setShow] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel()

    return (
        <div className="pb-[30px] md:pb-[70px] lg:pb-[120px] pt-[15px] md:pt-[80px]  bg-[#FF6F61]">
            <div className="container mx-auto ">
                {/* <H2 className="font-creato mb-3 md:mb-5 text-center">Complete <span className='text-[#FF6F61]'>your nanny</span> search with <br className='hidden xl:block' /> these additional services </H2> */}
                <H2 className="font-creato mb-12 text-center text-white capitalize">{data.title}</H2>

                <div className="embla ">
                    <div className="embla__viewport" ref={emblaRef} options={OPTIONS}>
                        <div className="embla__container">
                            {list.map((item, index) => (
                                <div className="embla__slide group" key={index}
                                    onMouseEnter={() => {
                                        setShow(true)
                                    }}
                                    onMouseLeave={() => {
                                        setShow(false)
                                    }}
                                >
                                    <div className='px-10 py-4 2xl:py-8 rounded-[15px] bg-transparent border border-gray-200 h-[350px] group-hover:bg-white text-center flex flex-col justify-center items-center'>
                                        <div className='fill-blue-500'>
                                            <img src={isShow ? item.icon2 : item.icon1} className='h-[100px] w-[100px] mb-4' />
                                        </div>
                                        {/* <img src={item.icon} width="70px" height="70px" className='mb-4' /> */}
                                        <H5 className="mb-2 xl:mb-3 text-[#fff] group-hover:text-black">{item.title}</H5>
                                        <Font2 className="text-[#fff] group-hover:text-black">{item.para}</Font2>
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

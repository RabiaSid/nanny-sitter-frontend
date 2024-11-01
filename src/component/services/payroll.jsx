import React, { useState, useEffect } from 'react';
import { H1, H5, Font2 } from '@/config/typography'
import payrollBg from '@/assets/services/payroll/payroll-bg.svg'; // Correct image import
import ImgIcon1 from "@/assets/services/payroll/icon/payroll-icon-1.png"
import ImgIcon2 from "@/assets/services/payroll/icon/payroll-icon-2.png"
import ImgIcon3 from "@/assets/services/payroll/icon/payroll-icon-3.png"
import ImgIcon4 from "@/assets/services/payroll/icon/payroll-icon-4.png"
import ImgIcon5 from "@/assets/services/payroll/icon/payroll-icon-5.png"
import ImgIcon6 from "@/assets/services/payroll/icon/payroll-icon-6.png"
import ImgIcon7 from "@/assets/services/payroll/icon/payroll-icon-7.png"


export default function Payroll() {
  const [showBg, setShowBg] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowBg(window.innerWidth >= 1535);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="py-[30px] md:py-[70px] ">
      <div className="container mx-auto">
        <div className="pb-24">
          <H1 className="font-creato mb-6 text-center capitalize" >Full service payroll</H1>
        </div>
        <div
          className={`xl:flex justify-between gap-8 bg-contain  bg-center bg-no-repeat xl:min-h-[535px] 2xl:min-h-[550px] px-[4%] relative z-0`}
          style={showBg ? { backgroundImage: `url(${payrollBg})` } : { backgroundImage: 'none' }}
        >

          <div className='flex flex-col justify-center xl:items-center border-8 border-red-300 pt-[50px] xl:pt-5 p-5 rounded-xl 2xl:border-none mb-12 relative'>
            <div className='flex xl:justify-between items-stretch mb-3 xl:max-w-[470px]'>
              <div className='p-5 rounded-full bg-[#FFA1A1] w-[100px] h-[70px] flex justify-center xl:items-center '>
                <img src={ImgIcon1} className='' />
              </div>
              <div className='ps-4 pt-2'>
                <Font2 className="font-montserrat text-[#666666] ">Registering you as a household employer, allowing you to legally pay your household employee</Font2>
              </div>
            </div>
            <div className='flex xl:justify-between items-stretch mb-3 xl:max-w-[470px]'>
              <div className='p-5 rounded-full bg-[#FFA1A1] w-[120px] h-[70px] flex justify-center xl:items-center '>
                <img src={ImgIcon2} className='' />
              </div>
              <div className='ps-4 pt-2'>
                <Font2 className="font-montserrat text-[#666666] ">Completing Federal and State tax filings: monthly (income tax, medicare, social security taxes) and quarterly (unemployment taxes)</Font2>
              </div>
            </div>
            <div className='flex xl:justify-between items-stretch mb-3 xl:max-w-[470px]'>
              <div className='p-5 rounded-full bg-[#FFA1A1] w-[80px] h-[70px] flex justify-center xl:items-center '>
                <img src={ImgIcon3} className='' />
              </div>
              <div className='ps-4 pt-2'>
                <Font2 className="font-montserrat text-[#666666] ">Producing and submitting year-end documents (W2, W3)</Font2>
              </div>
            </div>
            <div className='flex  xl:hidden absolute top-[-40px] left-[20%] 2xl:left-[10%] bg-red-300 w-[300px] h-[70px] justify-center items-center text-center rounded-md z-10'>
              <Font2 className="text-white">We make payroll</Font2>
            </div>

          </div>


          <div className='flex flex-col justify-center xl:items-center border-8 border-red-400 pt-[50px] xl:pt-5 p-5 rounded-xl 2xl:border-none mb-12 relative'>
            <div className='flex xl:justify-between items-stretch mb-3 xl:max-w-[470px]'>
              <div className='p-5 rounded-full bg-[#FFA1A1] w-[80px] h-[70px] flex justify-center xl:items-center '>
                <img src={ImgIcon4} className='' />
              </div>
              <div className='ps-4 pt-2'>
                <Font2 className="font-montserrat text-[#666666] ">Transfer payments by direct deposit on your chosen pay cycle</Font2>
              </div>
            </div>
            <div className='flex xl:justify-between items-stretch mb-3 xl:max-w-[470px]'>
              <div className='p-5 rounded-full bg-[#FFA1A1] w-[80px] h-[70px] flex justify-center xl:items-center '>
                <img src={ImgIcon5} className='' />
              </div>
              <div className='ps-4 pt-2'>
                <Font2 className="font-montserrat text-[#666666] ">Send pay stubs and receipts for you and your nanny</Font2>
              </div>
            </div>
            <div className='flex xl:justify-between items-stretch mb-3 xl:max-w-[470px]'>
              <div className='p-5 rounded-full bg-[#FFA1A1] w-[80px] h-[70px] flex justify-center xl:items-center '>
                <img src={ImgIcon6} className='' />
              </div>
              <div className='ps-4 pt-2'>
                <Font2 className="font-montserrat text-[#666666] ">Calculate Federal and State tax deductions on pay stubs</Font2>
              </div>
            </div>
            <div className='flex xl:justify-between items-stretch mb-3 xl:max-w-[470px]'>
              <div className='p-5 rounded-full bg-[#FFA1A1] w-[90px] h-[70px] flex justify-center xl:items-center '>
                <img src={ImgIcon7} className='' />
              </div>
              <div className='ps-4 pt-2'>
                <Font2 className="font-montserrat text-[#666666] ">Provide support with your dedicated nanny payroll representative</Font2>
              </div>
            </div>
            <div className='flex  xl:hidden absolute top-[-40px] right-[20%] 2xl:right-[10%] bg-red-400 w-[300px] h-[70px] justify-center items-center text-center rounded-md z-10'>
              <Font2 className="text-white">We make payroll</Font2>
            </div>

          </div>

          <div className='hidden xl:flex absolute top-[-30px] left-[13%] 2xl:left-[10%] bg-red-300 w-[300px] h-[70px] justify-center items-center text-center rounded-md z-10'>
            <Font2 className="text-white">We make payroll</Font2>
          </div>
          <div className='hidden xl:flex absolute top-[-30px] right-[13%] 2xl:right-[10%] bg-red-400 w-[300px] h-[70px] justify-center items-center text-center rounded-md z-10'>
            <Font2 className="text-white">We make payroll</Font2>
          </div>
        </div>
      </div>
    </div>
  );
}
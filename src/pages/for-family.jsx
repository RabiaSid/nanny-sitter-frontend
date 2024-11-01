import React from 'react'
// Images
import HeroImgBG from "@/assets/for-family/hero-img.png"
import pointsImg from "@/assets/for-family/points-img.png"
import processImg1 from "@/assets/process/process-img-1.png"
import processImg2 from "@/assets/process/process-img-2.png"
import processImg3 from "@/assets/process/process-img-3.png"
import ctaImgBG from "@/assets/for-family/cta-bg.png"
import ctaImg from "@/assets/for-family/cta-img.png"
import Icon1 from "@/assets/member-service/icons/icon-1.png"
import Icon2 from "@/assets/member-service/icons/icon-2.png"
import Icon3 from "@/assets/member-service/icons/icon-3.png"
import NeedImg from "@/assets/for-family/need-img.png"
import findImg1 from "@/assets/for-family/find-img-1.png"
import findImg2 from "@/assets/for-family/find-img-2.png"
import findImg3 from "@/assets/for-family/find-img-3.png"
// component
import Hero from '@/component/pages/hero'
import Points from '@/component/pages/points'
import Process from '@/component/pages/process'
import Cta from '@/component/pages/cta'
import MemberService from '@/component/pages/member-service'
import Find from '@/component/pages/find'
import Need from '@/component/pages/need'

const HeroData = {
  Img: HeroImgBG,
  title: (<>Reliable <span className='text-[#FF6F61]'>Babysitting</span><br className='hidden lg:block' /> Services You Can Trust</>),
  content: (<>Voluptatem sequi nesciunt. Neque porro quisquam<br className='hidden lg:block' />  est, qui dolorem ipsum quia.</>)
}

const PointsData = {
  Img: pointsImg,
  title: (<>What over 1,500,000<br className='hidden xl:block' /> <span className='text-[#FF6F61]'>families and nannies love</span><br className='hidden xl:block' /> about Top Nanny Sitter</>),
  points: [
    {
      title: (<>Explore at your own pace</>),
      content: (<>Whether you need a nanny now or later, you’re free<br className='hidden lg:block' /> to browse at your convenience.</>),
      bg: "bg-[#FFB300]"
    },
    {
      title: (<>Focus on your child’s development</>),
      content: (<>With a nanny or nanny share, be sure your child receives<br className='hidden xl:block' /> the attentive care they need.</>),
      bg: "bg-[#512DA8]"
    },
    {
      title: (<>Receive guidance at every step</>),
      content: (<>Discover helpful tips and articles to support you while you<br className='hidden xl:block' /> find and manage your nanny.</>),
      bg: "bg-[#59B5FF]"
    },
  ]
}

const ProcessData = {
  title: (<><strong className='text-[#FF6F61]'>We’re here</strong> for you at every <br className='hidden md:block' /> step of the process </>)
}

const ProcessList = [
  {
    icon: processImg1,
    title: "Finding your nanny",
    para: "Create your profile and connect with nannies that fit your needs."
  },
  {
    icon: processImg2,
    title: "Hiring your nanny",
    para: "Run a background check and finalize the details."
  },
  {
    icon: processImg3,
    title: "Paying your nanny",
    para: "Ease the process of payments and taxes with our payroll service."
  },
  {
    icon: processImg1,
    title: "Finding your nanny",
    para: "Create your profile and connect with nannies that fit your needs."
  },
  {
    icon: processImg2,
    title: "Hiring your nanny",
    para: "Run a background check and finalize the details."
  },
  {
    icon: processImg3,
    title: "Paying your nanny",
    para: "Ease the process of payments and taxes with our payroll service."
  },
]

const MemberServiceData = {
  title: (
      <>Complete <strong className='text-[#FF6F61]'>your nanny</strong> search with <br className='hidden xl:block' /> these additional services</>
  ),
  content: (
      <>From browsing profiles to handling payments, we’ve got services you can access whenever you need them.</>
  ),
  title2: (
      <>Become a PLUS member to get access to these <br className='hidden xl:block' /> services for only $60/month!</>
  ),
};

const MemberServiceList = [
  {
      icon: Icon1,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience."
  },
  {
      icon: Icon2,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience."
  },
  {
      icon: Icon3,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience."
  },
  {
      icon: Icon1,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience."
  },
  {
      icon: Icon2,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience."
  },
  {
      icon: Icon3,
      title: "Explore at your own pace",
      para: "Whether you need a nanny now or later, you’re free to browse at your convenience."
  },
]

const NeedData = {
  title: (
      <>Find a <strong className='text-[#FF6F61]'>nanny</strong> that becomes part of your family</>
  ),
  content: (
      <>Riley has been watching our 4 children for over a year now. She is kind, caring, a lot of fun! Our children not only love Riley but ask to see her all the time! We are fortunate to have found her and she will be in our life for a long time to come!</>
  ),
  Img: NeedImg,
};

const CtaData = {
  bgImg: ctaImgBG,
  Img: ctaImg,
  title: (<>Share your nanny <br className='hidden md:block' /> with another family</>),
  content: (<>Whether you need a nanny now or later, you’re free<br className='hidden lg:block' /> to browse at your convenience.</>)
}

const FindData = {
  title: (<>Tips on how to find a <strong className='text-[#FF6F61]'>nanny</strong></>),
  icon1: findImg1,
  text1: "Starting your search",
  content1: "Finding A Summer Nanny",
  icon2: findImg2,
  text2: "Identifying your needs",
  content2: (<>What is Top Nanny Sitter and<br /> How Does it Work?</>),
  icon3: findImg3,
  text3: "Identifying your needs",
  content3: (<>How does the number of kids<br />   influence nanny costs?</>),
}

export default function ForFamily() {
// export default function ForFamily(userDetails) {
//   const user = userDetails.user;
// 	const logout = () => {
// 		window.open(`http://localhost:5000/auth/logout`, "_self");
// 	};
  return (
    <div>
      <Hero data={HeroData} />
      <Points data={PointsData} />
      <Process data={ProcessData} list={ProcessList} />
      <Cta data={CtaData} />
      <MemberService data={MemberServiceData} list={MemberServiceList}/>
      <Need data={NeedData}/>
      <Find data={FindData} />
    </div>
  )
}

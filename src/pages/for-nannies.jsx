import React from 'react'
// Images
import HeroImgBG from "@/assets/for-nannies/hero-img.png"
import pointsImg from "@/assets/for-nannies/points-img.png"
import processImg1 from "@/assets/process/process-img-1.png"
import processImg2 from "@/assets/process/process-img-2.png"
import processImg3 from "@/assets/process/process-img-3.png"
import ctaImgBG from "@/assets/for-nannies/cta-bg.png"
import ctaImg from "@/assets/for-nannies/cta-img.png"
import choiceImg1 from "@/assets/choice/choice-img-1.png"
import choiceImg2 from "@/assets/choice/choice-img-2.png"
import choiceImg3 from "@/assets/choice/choice-img-3.png"
import choiceImg4 from "@/assets/choice/choice-img-4.png"
import findImg1 from "@/assets/for-nannies/find-img-1.png"
import findImg2 from "@/assets/for-nannies/find-img-2.png"
import findImg3 from "@/assets/for-nannies/find-img-3.png"
import NeedImg from "@/assets/for-nannies/need-img.png"
// component
import Hero from '@/component/pages/hero'
import Points from '@/component/pages/points'
import Process from '@/component/pages/process'
import Cta from '@/component/pages/cta'
import Choice from '@/component/pages/choice'
import Find from '@/component/pages/find'
import Need from '@/component/pages/need'

const HeroData = {
    Img: HeroImgBG,
    title: (<>Finding  a<strong className='text-[#274470] '> nanny <br className='hidden lg:block' /> job,</strong> made easy</>),
    content: (<>Connect with families in your area, and find<br className='hidden lg:block' /> the nanny job that’s right for you.</>)
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

const CtaData = {
    bgImg: ctaImgBG,
    Img: ctaImg,
    title: (<>Share your nanny <br className='hidden md:block' /> with another family</>),
    content: (<>Whether you need a nanny now or later, you’re free<br className='hidden lg:block' /> to browse at your convenience.</>)
}

const ChoiceData = {
    title: (<>Why being a nanny is the right choice for you</>)
}

const ChoiceList = [
    {
        icon: choiceImg1,
        title: "Finding your nanny",
        para: "Create your profile and connect with nannies that fit your needs."
    },
    {
        icon: choiceImg2,
        title: "Hiring your nanny",
        para: "Run a background check and finalize the details."
    },
    {
        icon: choiceImg3,
        title: "Paying your nanny",
        para: "Ease the Choice of payments and taxes with our payroll service."
    },
    {
        icon: choiceImg4,
        title: "Finding your nanny",
        para: "Create your profile and connect with nannies that fit your needs."
    },
    {
        icon: choiceImg1,
        title: "Finding your nanny",
        para: "Create your profile and connect with nannies that fit your needs."
    },
    {
        icon: choiceImg2,
        title: "Hiring your nanny",
        para: "Run a background check and finalize the details."
    },
    {
        icon: choiceImg3,
        title: "Paying your nanny",
        para: "Ease the Choice of payments and taxes with our payroll service."
    },
    {
        icon: choiceImg4,
        title: "Finding your nanny",
        para: "Create your profile and connect with nannies that fit your needs."
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

export default function ForNannies() {
    return (
        <div>
            <Hero data={HeroData} />
            <Points data={PointsData} />
            <Process data={ProcessData} list={ProcessList} />
            <Cta data={CtaData} />
            <Choice data={ChoiceData} list={ChoiceList}/>
            <Need data={NeedData} />
            <Find data={FindData} />
        </div>
    )
}


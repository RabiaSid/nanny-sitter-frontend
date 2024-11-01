import React, { useEffect, useState } from 'react';
import AuthBg from '@/assets/auth/auth-bg.png';
import { H6, H1 } from '@/config/typography';
import Img from '../../assets/dashboard/welcome/welcome-bg.png';
import { Logo } from "@/assets";
import Button from '../../component/dashboard/button';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '@/component/common/toast';

export default function Welcome() {
    const navigate = useNavigate();
    const location = useLocation();
    const [toast, setToast] = useState({
        isVisible: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        if (location.state && location.state.loggedIn) {
            showToast("Login successfully!", "success");
        }
    }, [location]);

    const showToast = (message, type) => {
        setToast({ isVisible: true, message, type });

        // Auto-hide after 3 seconds
        setTimeout(() => {
            setToast({ ...toast, isVisible: false });
        }, 3000);
    };

    return (
        <div
            className="py-[30px] md:py-[50px] lg:py-[100px] h-[100dvh] relative"
            style={{ background: `url(${AuthBg}) 100% 100% / cover no-repeat` }}
        >
            <div className="container m-auto">
                <div className="flex justify-center items-center my-auto relative">
                    <div className="grid grid-cols-12 gap-8 bg-white shadow-lg rounded-md p-24">
                        <div className="col-span-12 lg:col-span-6 mb-4 capitalize flex flex-col justify-center items-start">
                            <img src={Logo} className="mr-3 h-12 sm:h-14" alt="Nanny Logo" />
                            <H1 className="font-creato my-4">Welcome to Top
                                <strong className='text-[#FF6F61]'> Nanny Sitter</strong>
                            </H1>
                            <Button 
                                className='w-[95%] rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] focus:outline-none' 
                                onClick={() => navigate('/dashboard/for-family')}>
                                Welcome
                            </Button>
                        </div>
                        <div className='lg:col-span-6 hidden lg:block'>
                            <img src={Img} className='max-w-[400px] xl:max-w-[550px] mx-auto' />
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
}

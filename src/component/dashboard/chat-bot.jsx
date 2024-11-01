// import React, { useState } from 'react';
// import { Post } from '../../config/api-method';

// export default function ChatBot() {
//     const [isOpen, setIsOpen] = useState(false); // State to track chatbox visibility
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({ location: '', childrenCount: '', childrenAges: [], schedule: '', budget: '' });

//     const toggleChatBox = () => {
//         setIsOpen(!isOpen); // Toggle the chatbox visibility
//     };

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [name]: value }));
//     };

//     // Proceed to the next step
//     const nextStep = () => {
//         if (step === 7) { // If the last step, submit the booking
//             newPost();
//         } else {
//             setStep(prevStep => prevStep + 1);
//         }
//     };

//     // Submit the new booking
//     const newPost = () => {
//         Post("booking", formData)
//             .then((res) => {
//                 console.log("Successfully added new post", res);
//                 // You can also reset formData here if needed
//                 // setFormData({ location: '', childrenCount: '', childrenAges: [], schedule: '', budget: '' });
//             })
//             .catch((err) => {
//                 console.log(err.message);
//             });
//     };

//     return (
//         <>
//             <button
//                 onClick={toggleChatBox} // Toggle chatbox when button is clicked
//                 className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-red-500 hover:bg-gray-700 text-white"
//                 type="button"
//                 aria-haspopup="dialog"
//                 aria-expanded={isOpen}
//                 data-state={isOpen ? "open" : "closed"}>
//                 {/* Chat icon */}
//                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
//                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
//                 </svg>
//             </button>

//             {isOpen && ( // Conditionally render chatbox based on isOpen state
//                 <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
//                     <div className="flex flex-col space-y-1.5 pb-6">
//                         <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
//                         <p className="text-sm text-[#6b7280] leading-3">Powered by Mendable and Vercel</p>
//                     </div>

//                     <div className="pr-4 h-[474px] overflow-y-auto">
//                         <div className="flex flex-col space-y-3">
//                             {step === 1 && <p>Bot: I see you're ready to book a nanny! Let's start with your location.</p>}
//                             {step === 2 && <p>Bot: How many children do you need care for?</p>}
//                             {step === 3 && <p>Bot: Please provide the ages of the children.</p>}
//                             {step === 4 && <p>Bot: When do you need the nanny?</p>}
//                             {step === 5 && <p>Bot: What is your budget for this service?</p>}
//                             {step === 6 && <p>Bot: Please confirm your details, and I'll submit your request.</p>}
//                             {step === 7 && <p>Bot: Your request has been submitted! You can view available nannies or email us for assistance.</p>}
//                         </div>
//                     </div>

//                     <div className="flex items-center pt-0">
//                         <form className="flex items-center justify-center w-full space-x-2" onSubmit={e => e.preventDefault()}>
//                             {step === 1 && (
//                                 <input
//                                     type="text"
//                                     name="location"
//                                     placeholder="Enter your location"
//                                     value={formData.location}
//                                     onChange={handleInputChange}
//                                     className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
//                                 />
//                             )}
//                             {step === 2 && (
//                                 <input
//                                     type="number"
//                                     name="childrenCount"
//                                     placeholder="Number of children"
//                                     value={formData.childrenCount}
//                                     onChange={handleInputChange}
//                                     className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
//                                 />
//                             )}
//                             {step === 3 && (
//                                 <input
//                                     type="text"
//                                     name="childrenAges"
//                                     placeholder="Enter ages (comma-separated)"
//                                     value={formData.childrenAges}
//                                     onChange={handleInputChange}
//                                     className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
//                                 />
//                             )}
//                             {step === 4 && (
//                                 <input
//                                     type="text"
//                                     name="schedule"
//                                     placeholder="Schedule (e.g., 'Monday 9am-5pm')"
//                                     value={formData.schedule}
//                                     onChange={handleInputChange}
//                                     className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
//                                 />
//                             )}
//                             {step === 5 && (
//                                 <input
//                                     type="text"
//                                     name="budget"
//                                     placeholder="Your budget"
//                                     value={formData.budget}
//                                     onChange={handleInputChange}
//                                     className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
//                                 />
//                             )}
//                             <button
//                                 onClick={nextStep}
//                                 className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] bg-red-500 hover:bg-[#111827E6] h-10 px-4 py-2">
//                                 {step === 7 ? "Finish" : "Next"}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }


import React, { useState } from 'react';
import { Post } from '../../config/api-method';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false); // State to track chatbox visibility
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ location: '', childrenCount: '', childrenAges: [], schedule: '', budget: '' });

    const toggleChatBox = () => {
        setIsOpen(!isOpen); // Toggle the chatbox visibility
    };

    // Handle option selection
    const handleOptionSelect = (value) => {
        switch (step) {
            case 1:
                setFormData({ ...formData, location: value });
                break;
            case 2:
                setFormData({ ...formData, childrenCount: value });
                break;
            case 3:
                setFormData({ ...formData, childrenAges: value.split(',').map(age => age.trim()) });
                break;
            case 4:
                setFormData({ ...formData, schedule: value });
                break;
            case 5:
                setFormData({ ...formData, budget: value });
                break;
            default:
                break;
        }
        nextStep();
    };

    // Proceed to the next step
    const nextStep = () => {
        if (step === 7) { // If the last step, submit the booking
            newPost();
            setIsOpen(false)
        } else {
            setStep(prevStep => prevStep + 1);
        }
    };

    // Submit the new booking
    const newPost = () => {
        Post("booking", formData)
            .then((res) => {
                console.log("Successfully added new post", res);
                setIsOpen(false); // Close the chatbox after submission
                // Reset formData if needed
                // setFormData({ location: '', childrenCount: '', childrenAges: [], schedule: '', budget: '' });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <>
            <button
                onClick={toggleChatBox} // Toggle chatbox when button is clicked
                className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-red-500 hover:bg-gray-700 text-white"
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                data-state={isOpen ? "open" : "closed"}>
                {/* Chat icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
            </button>

            {isOpen && ( // Conditionally render chatbox based on isOpen state
                <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
                        <p className="text-sm text-[#6b7280] leading-3">Powered by Mendable and Vercel</p>
                    </div>

                    <div className="pr-4 py-4 overflow-y-auto">
                        <div className="flex flex-col space-y-3">
                            {step === 1 && <p>Bot: I see you're ready to book a nanny! Let's start with your location.</p>}
                            {step === 2 && <p>Bot: How many children do you need care for?</p>}
                            {step === 3 && <p>Bot: Please provide the ages of the children (comma-separated).</p>}
                            {step === 4 && <p>Bot: When do you need the nanny? (e.g., 'Monday 9am-5pm')</p>}
                            {step === 5 && <p>Bot: What is your budget for this service?</p>}
                            {step === 6 && <p>Bot: Please confirm your details, and I'll submit your request.</p>}
                            {step === 7 && <p>Bot: Your request has been submitted! You can view available nannies or email us for assistance.</p>}
                        </div>
                    </div>

                    <div className="flex items-center pt-0">
                        <div className="flex flex-col space-y-2 w-full">
                            {step === 1 && (
                                <>
                                    <button onClick={() => handleOptionSelect("New York")} className="bg-gray-200 rounded-md p-2">New York</button>
                                    <button onClick={() => handleOptionSelect("Los Angeles")} className="bg-gray-200 rounded-md p-2">Los Angeles</button>
                                    <button onClick={() => handleOptionSelect("Chicago")} className="bg-gray-200 rounded-md p-2">Chicago</button>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <button onClick={() => handleOptionSelect("1")} className="bg-gray-200 rounded-md p-2">1 Child</button>
                                    <button onClick={() => handleOptionSelect("2")} className="bg-gray-200 rounded-md p-2">2 Children</button>
                                    <button onClick={() => handleOptionSelect("3+")} className="bg-gray-200 rounded-md p-2">3 or more Children</button>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <button onClick={() => handleOptionSelect("2, 5")} className="bg-gray-200 rounded-md p-2">2, 5 years old</button>
                                    <button onClick={() => handleOptionSelect("3, 7, 10")} className="bg-gray-200 rounded-md p-2">3, 7, 10 years old</button>
                                    <button onClick={() => handleOptionSelect("1, 4")} className="bg-gray-200 rounded-md p-2">1, 4 years old</button>
                                </>
                            )}
                            {step === 4 && (
                                <>
                                    <button onClick={() => handleOptionSelect("Monday 9am-5pm")} className="bg-gray-200 rounded-md p-2">Monday 9am-5pm</button>
                                    <button onClick={() => handleOptionSelect("Tuesday 8am-4pm")} className="bg-gray-200 rounded-md p-2">Tuesday 8am-4pm</button>
                                    <button onClick={() => handleOptionSelect("Weekends")} className="bg-gray-200 rounded-md p-2">Weekends</button>
                                </>
                            )}
                            {step === 5 && (
                                <>
                                    <button onClick={() => handleOptionSelect("$300")} className="bg-gray-200 rounded-md p-2">$300</button>
                                    <button onClick={() => handleOptionSelect("$500")} className="bg-gray-200 rounded-md p-2">$500</button>
                                    <button onClick={() => handleOptionSelect("$700")} className="bg-gray-200 rounded-md p-2">$700</button>
                                </>
                            )}
                            <button
                                onClick={nextStep}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] bg-red-500 hover:bg-[#111827E6] h-10 px-4 py-2" >
                                {step === 7 ? "Finish" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


import React, { useEffect, useState } from 'react';
import { HTTP_CLIENT } from '../../utils/axiosClient';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await HTTP_CLIENT.post('/api/auth/password/reset/', { email });
            setMessage(response.data.detail);
            setError('');
            setIsEmailSent(true);
        } catch (err) {
            setMessage('');
            setError('Failed to send reset email. Please try again.');
            setIsEmailSent(false);
        }
    };

    return (
        <div className="px-4 lg:px-10 mx-auto xsm:py-2 text-center min-h-screen bg-[#f4fbff] sm:pt-6 sm:pb-60 xsm:mt-20 2xl:pt-20">
            <p className="text-3xl font-[900] mx-auto xsm:mb-4 mb-10 xsm:text-xl">
                Find Reviews, Share Yours, and Discover Companies.
            </p>
            <div className="shadow-box-shadow flex justify-center items-center max-w-3xl mx-auto rounded-[10px] h-[50vh] xsm:h-auto bg-white">
                <div className="flex flex-col items-center w-[70%] xsm:w-[90%] mx-auto">
                    <span className="gradient font-semibold xsm:text-xl text-2xl">Forgot Password</span>
                    <div className="flex flex-col gap-5 w-full my-8">
                        <form onSubmit={handleSubmit} className="w-full" autoComplete='off'>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="w-full p-4 border rounded-xl bg-white focus:bg-white outline-none focus:border-Primary peer transition-all duration-300"
                                    disabled={isEmailSent}
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:py-0 peer-focus:mt-0 peer-focus:bg-white peer-focus:px-1 ${email ? '-translate-y-1/2 scale-90 py-0 mt-0 bg-white px-1' : ''}`}>
                                    Enter Email
                                </label>
                            </div>
                            <div className='my-4'>
                                If the provided email is an existing Brand Search Engine account, we will send a password reset email.
                            </div>

                            {error && <p className="text-red-600 my-2">{error}</p>}
                            <button type="submit" className="bg-Primary rounded-full font-bold text-white px-4 py-4 w-[100%] mx-auto">
                                {message ? 'Link Successfully Sent' : 'Send Email'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

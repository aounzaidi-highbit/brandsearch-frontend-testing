import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HTTP_CLIENT } from '../../utils/axiosClient';
import showPassword from "../../assets/images/showPassword.png";
import hidePassword from "../../assets/images/hidePassword.png";

const UpdatePassword = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { u_id, token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("u_id:", u_id);
        console.log("token:", token);
    }, [u_id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("u_id inside submit:", u_id);
        console.log("token inside submit:", token);
        if (password1 !== password2) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await HTTP_CLIENT.post(`/api/auth/password/reset/confirm/`, {
                new_password1: password1,
                new_password2: password2,
                uid: u_id,
                token: token,
            });
            setMessage('Password updated successfully.');
            console.log('Response Data:', response.data);
            setError('');
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (err) {
            setError('Failed to update password. Please try again.');
            setMessage('');
            console.error('Error:', err);
        }
    };

    return (
        <div className="px-4 lg:px-10 mx-auto xsm:py-2 text-center bg-[#f4fbff] sm:pt-6 sm:pb-60 xsm:mt-20">
            <p className="text-3xl font-[900] mx-auto xsm:mb-4 mb-10 xsm:text-xl">
                Find Reviews, Share Yours, and Discover Companies.
            </p>
            <div className="shadow-box-shadow flex justify-center items-center max-w-3xl mx-auto rounded-[10px] h-[50vh] xsm:h-auto bg-white">
                <div className="flex flex-col items-center w-[70%] xsm:w-[90%] mx-auto">
                    <span className="gradient font-semibold xsm:text-xl text-2xl">Enter New Password</span>
                    <div className="flex flex-col gap-5 w-full my-8">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="relative">
                                <input
                                    type={showPassword1 ? "text" : "password"}
                                    name="password1"
                                    required
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    className="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                                />
                                <label htmlFor="password1" className="absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-valid:-translate-y-1/2 peer-focus:py-0 peer-valid:py-0 peer-focus:mt-0 peer-valid:mt-0 peer-valid:scale-90 peer-focus:bg-[white] peer-valid:bg-white peer-focus:px-1 peer-valid:px-1">
                                    Enter Password
                                </label>
                                <img
                                    src={showPassword1 ? showPassword : hidePassword}
                                    alt="toggle-password1"
                                    className="w-6 absolute top-5 right-4 cursor-pointer"
                                    onClick={() => setShowPassword1(!showPassword1)}
                                />
                            </div>

                            <div className="relative my-4">
                                <input
                                    type={showPassword2 ? "text" : "password"}
                                    name="password2"
                                    required
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    className="w-full p-4 border rounded-xl outline-none focus:border-[#87cdff] peer transition-all duration-300"
                                />
                                <label htmlFor="password2" className="absolute left-0 p-3 ml-2 mt-1 text-gray-400 pointer-events-none transition-all duration-500 transform peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-valid:-translate-y-1/2 peer-focus:py-0 peer-valid:py-0 peer-focus:mt-0 peer-valid:mt-0 peer-valid:scale-90 peer-focus:bg-[white] peer-valid:bg-white peer-focus:px-1 peer-valid:px-1">
                                    Confirm Password
                                </label>
                                <img
                                    src={showPassword2 ? showPassword : hidePassword}
                                    alt="toggle-password2"
                                    className="w-6 absolute top-5 right-4 cursor-pointer"
                                    onClick={() => setShowPassword2(!showPassword2)}
                                />
                            </div>
                            {error && <p className="text-red-600 my-2">{error}</p>}
                            <button type="submit" className="gradient2 rounded-full font-bold text-white px-4 py-4 w-[100%] mx-auto">
                                {(message) ? 'Password Updated Successfully' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;

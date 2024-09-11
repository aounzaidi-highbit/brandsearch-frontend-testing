import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import tickIcon from "../../assets/images/tick.png";
import {
    addReview,
    getSingleProfiles,
    reviewGet,
} from "../../services/business";
import { setupAxios } from "../../utils/axiosClient";
import { ToastContainer, toast } from "react-toastify";

const StarRating = ({ rating, setRating }) => {
    const handleRating = (value) => {
        setRating(value);
    };
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    onClick={() => handleRating(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={star <= rating ? "#ffc107" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-8 h-8 cursor-pointer"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                </svg>
            ))}
        </div>
    );
};

const AddReview = () => {
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [loadingReview, setLoadingReview] = useState(false);
    const [base64Image, setBase64Image] = useState("");
    const { bussiness } = useParams();
    const [allReview, setAllReview] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState([]);

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    useEffect(() => {
        getProfile();
        getReviews();
    }, [bussiness]);

    const AddReviews = async (e) => {
        e.preventDefault();
        setLoadingReview(true);
        setupAxios();
        setSubmitSuccess(false);
        setSubmitError(false);
        const userId = localStorage.getItem("user_id");
        console.log("Retrieved User ID:", userId);

        const payload = {
            description: review,
            proof_of_order: base64Image,
            brand_profile: Number(bussiness),
            rating: rating,
            user: userId,
        };
        console.log("Payload to be sent:", payload);

        try {
            const reviewResponse = await addReview(payload);
            console.log("Review submission response:", reviewResponse);

            const resp = await reviewGet(Number(bussiness));
            console.log("Updated reviews fetched:", resp.data);

            setAllReview(resp?.data);

            setSubmitSuccess(true);


            setRating(0);
            setReview("");
            setFile(null);
            setBase64Image("");
            toast.success("Review Sent successfully");
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 3000);
            window.location.reload();
        } catch (error) {
            setSubmitError(true);

            if (error.response) {
                console.error("Error Response:", error.response.data);
                toast.error(`Error: ${error.response.data.message || "Bad Request"}`);
            } else {
                console.error("Error Message:", error.message);
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoadingReview(false);
            console.log("Review submission process completed.");
        }
    };


    const getProfile = async () => {
        setupAxios();
        try {
            const res = await getSingleProfiles(bussiness);
            setProfile(res?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getReviews = async () => {
        setLoadingReview(true);
        setupAxios();
        try {
            const res = await reviewGet(Number(bussiness));
            setAllReview(res?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingReview(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop: (acceptedFiles) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(acceptedFiles[0]);
            setFile(acceptedFiles[0]);
        }
    });

    const stack2 = (
        <div
            {...getRootProps()}
            className="mt-[14px] bg-[#f3f8fb] w-full h-[142px] flex justify-center items-center rounded-md border-2 border-dotted border-primary"
        >
            <input {...getInputProps()} />
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-[36px] h-[36px]">
                    <img src="/icons/Upload icon.svg" alt="" />
                </div>
                <div className="text-[12px] font-bold leading-[18px] text-[#0F0F0F]">
                    Drag & Drop Files or <span className="text-primary">Browse</span>
                </div>
                <div className="mt-[10px] text-[10px] 2xl:text-[12px] font-normal leading-[12px] 2xl:leading-[18px] text-[#676767]">
                    {file?.name || "Supported formats: JPEG, PNG"}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container shadow-box-shadow rounded-3xl p-4 lg:p-10 mb-10 lg:mb-20">
            <form onSubmit={AddReviews}>
                <div className="grid lg:grid-cols-1 gap-6 lg:mb-4 mb-4">
                    <div className="w-full ">
                        <label className="block capital text-[#000] text-[20px] mb-2">
                            Choose Rate
                        </label>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>
                </div>
                <span className="text-[20px]">Proof of Order</span>
                {stack2}
                {file && (
                    <div className="mt-4">
                        <p>Preview:</p>
                        <img src={base64Image} alt="Preview" className="w-[200px] h-[150px] object-cover rounded-md" />
                    </div>
                )}
                <div className="lg:mb-6 mb-10">
                    <label htmlFor="message" className="mt-2 block capital text-[#000] text-[20px] mb-2">
                        Review
                    </label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id="message"
                        rows="7"
                        className="w-full shadow-box-shadow text-black rounded-xl border p-4 focus:outline-[#87cdff] min-h-20 resize-none"
                        placeholder="Write your Review"
                    ></textarea>
                </div>
                {loadingReview ? (
                    <button
                        type="button"
                        className="gradient2 text-xl lg:text-[22px] flex items-center justify-center font-bold h-[60px] w-[200px] rounded-md text-white"
                    >
                        {/* White loader */}
                        <div className="loader w-6 h-6 border-4 border-t-4 border-white border-opacity-50 rounded-full animate-spin"></div>
                    </button>
                ) : submitSuccess ? (
                    <button
                        type="button"
                        className="gradient2 text-xl lg:text-[20px] py-2 px-3 flex gap-2 justify-center items-center rounded-md text-white"
                        disabled
                    >
                        <img src={tickIcon} className="w-10" alt="submit-icon" />
                        Submitted
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="gradient2 text-xl lg:text-[20px] py-2 px-3 rounded-md text-white"
                    >
                        Submit Review
                    </button>
                )}


            </form>
        </div>
    );
};

export default AddReview;

import React, { useState } from 'react';
import { renderStars, StarRating } from '../../utils/helper';
import { useDropzone } from 'react-dropzone';

const EditModal = ({ isOpen, onClose, review, onSave }) => {
    const [ratingTitle, setRatingTitle] = useState(review.rating_title);
    const [description, setDescription] = useState(review.description);
    const [rating, setRating] = useState(review.rating);
    const [proofOfOrder, setProofOfOrder] = useState(review.proof_of_order || "");
    const [base64Image, setBase64Image] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedReview = {
            id: review.id,
            rating_title: ratingTitle,
            description,
            proof_of_order: base64Image || proofOfOrder,
            brand_profile_id: review.brand_profile_id,
            rating,
        };
        onSave(updatedReview);
        onClose();
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop: (acceptedFiles) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
                setProofOfOrder(reader.result);
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
                <div className="text-[16px] leading-[18px] text-[#0F0F0F]">
                    Drag & Drop File or Browse
                </div>
                <div className="mt-[10px] text-[10px] 2xl:text-[12px] font-normal leading-[12px] 2xl:leading-[18px] text-[#676767]">
                    {file?.name || "(Supported formats: JPEG, PNG)"}
                </div>
            </div>
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-[30%] p-5">
                <h2 className="text-xl mb-4 font-semibold">Edit Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Rating Title</label>
                        <input
                            type="text"
                            value={ratingTitle}
                            onChange={(e) => setRatingTitle(e.target.value)}
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded w-full p-2 resize-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Rating</label>
                        <div className="w-36 ">
                            <StarRating rating={rating} setRating={setRating} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Proof of Order</label>
                        {file ? (
                            <div className="mt-4">
                                <p>New image:</p>
                                <img
                                    src={base64Image}
                                    alt="Preview"
                                    className="w-[200px] h-[150px] object-cover mx-auto rounded-md"
                                />
                            </div>
                        ) :
                            proofOfOrder && !base64Image ? (
                                <div>
                                    <img
                                        src={proofOfOrder}
                                        alt="Proof of Order"
                                        className="w-[200px] h-[150px] object-cover rounded-md mx-auto"
                                    />
                                </div>
                            ) : (
                                <p className='mx-auto text-center'>No image available</p>
                            )}
                        <div>
                            {stack2}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 bg-gray-300 p-2 w-3/12 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white p-2 w-3/12 rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;

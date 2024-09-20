import React, { useState } from 'react';

const EditModal = ({ isOpen, onClose, review, onSave }) => {
    const [ratingTitle, setRatingTitle] = useState(review.rating_title);
    const [description, setDescription] = useState(review.description);
    const [rating, setRating] = useState(review.rating);
    const [proofOfOrder, setProofOfOrder] = useState(review.proof_of_order || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedReview = {
            id: review.id,
            rating_title: ratingTitle,
            description,
            proof_of_order: proofOfOrder,
            brand_profile_id: review.brand_profile_id,
            rating,
        };
        onSave(updatedReview);
        onClose();
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5">
                <h2 className="text-xl mb-4">Edit Review</h2>
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
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Rating</label>
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="border rounded w-full p-2"
                            min="1"
                            max="5"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Proof of Order (optional)</label>
                        <input
                            type="text"
                            value={proofOfOrder}
                            onChange={(e) => setProofOfOrder(e.target.value)}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;

import React, { useEffect, useState } from 'react';
import deleteIcon from "../../assets/images/delete.png";
import editIcon from "../../assets/images/edit.png";
import calander from "../../assets/images/calander.png";
import { renderStars, capitalizeWords, getInitials, formatDate } from '../../utils/helper';
import { getUserReviews, deleteUserReview, editReview } from '../../services/business';
import ConfirmDeleteModal from '../../components/Modals/DeleteModal'; // Import the modal component
import EditModal from '../../components/Modals/EditModal'; // Import the EditModal component
import { Navigate, useNavigate } from 'react-router-dom';


const UserReviews = () => {
    const [userReviews, setUserReviews] = useState([]);
    const [ratingCount, setRatingCount] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [user, setUser] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsAuthenticated(!!token);
            navigate('/user-reviews');
        }
        else {
            navigate('/signin');

        }
    }, []);

    const handleEdit = (review) => {
        setSelectedReview(review);
        setEditModalOpen(true);
    };

    const handleSaveEdit = async (updatedReview) => {
        try {
            // Prepare the data to update with all required fields
            const dataToUpdate = {
                rating_title: updatedReview.rating_title,
                description: updatedReview.description,
                proof_of_order: updatedReview.proof_of_order || "", // Optional or existing value
                brand_profile_id: updatedReview.brand_profile_id, // Ensure this is passed
                rating: updatedReview.rating, // Ensure this is passed
            };

            // Log the data before sending
            console.log("Data to be sent for update:", dataToUpdate);

            // Send the updated review data to the API
            await editReview(updatedReview.id, dataToUpdate);

            // Log success message after sending
            console.log('Review updated successfully:', updatedReview.id);

            // Update the local state with the new review data
            setUserReviews((prevReviews) =>
                prevReviews.map((rev) => (rev.id === updatedReview.id ? { ...rev, ...dataToUpdate } : rev))
            );

        } catch (error) {
            console.error('Error updating review:', error);
        }
    };




    useEffect(() => {
        const fetchUserReviews = async () => {
            const userId = localStorage.getItem('user_id');
            try {
                const response = await getUserReviews(userId);
                if (response.data && response.data.ratings) {
                    setUserReviews(response.data.ratings);
                    setRatingCount(response.data.rating_count);
                    setUser(response.data.ratings[0].user);
                }
            } catch (error) {
                console.error('Error fetching user reviews:', error);
            } finally {
                setTimeout(() => {
                    setShowContent(true);
                }, 10);
            }
        };

        fetchUserReviews();
    }, []);

    const handleDeleteClick = (reviewId) => {
        setReviewToDelete(reviewId);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (reviewToDelete) {
            try {
                await deleteUserReview(reviewToDelete);
                setUserReviews(userReviews.filter(review => review.id !== reviewToDelete));
                setRatingCount(ratingCount - 1);
            } catch (error) {
                console.error('Error deleting review:', error);
            }
            setIsModalOpen(false);
            setReviewToDelete(null);
        }
    };

    const groupedReviews = userReviews.reduce((acc, review) => {
        const brandName = review.brand_profile_details.name;
        if (!acc[brandName]) {
            acc[brandName] = [];
        }
        acc[brandName].push(review);
        return acc;
    }, {});

    if (!showContent) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-white'></div>
        );
    }

    return (
        <div className='min-h-screen bg-[#f4fbff] pb-20'>
            {isEditModalOpen && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    review={selectedReview}
                    onSave={handleSaveEdit}
                />
            )}
            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />

            <div className="bg-white h-32 border-b">
                <div className='w-[60%] mx-auto flex h-full justify-between items-center'>
                    <div className="flex gap-2">
                        <div className='rounded-full border-2 text-3xl w-16 h-16 flex justify-center items-center'>
                            {getInitials(user.first_name + " " + user.last_name)}
                        </div>
                        <div className='flex justify-center flex-col'>
                            <p className='text-xl'>
                                {capitalizeWords(user.first_name + " " + user.last_name)}
                            </p>
                            <p className='text-sm'>Pakistan</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <p className='text-4xl'>{ratingCount}</p>
                        <p className='text-sm'>Reviews</p>
                    </div>
                </div>
            </div>

            <div className='w-[50%] mx-auto'>
                <p className='text-3xl my-10 border-b-2'>All Reviews</p>
                {Object.keys(groupedReviews).length > 0 ? (
                    Object.keys(groupedReviews).map((brandName) => (
                        <div key={brandName}>
                            <p className='mb-2 text-xl'>{groupedReviews[brandName].length}{groupedReviews[brandName].length > 1 ? " Reviews " : " Review "}from{" "} <span className='font-bold'>{brandName}</span></p>
                            {groupedReviews[brandName].map((review) => (
                                <div key={review.id}>
                                    <div className='p-4 bg-white shadow-box-shadow rounded-lg mb-10'>
                                        <div className='flex justify-between'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <div className='border border-black rounded-full flex justify-center items-center text-2xl w-[56px] h-[56px]'>
                                                    {getInitials(review.user.first_name + " " + review.user.last_name)}
                                                </div>
                                                <div>
                                                    <p>{capitalizeWords(review.user.first_name + " " + review.user.last_name)}</p>
                                                    <p className='flex'>{renderStars(review.rating)}</p>
                                                </div>
                                            </div>
                                            <p className='flex justify-center gap-1'>
                                                <img src={calander} alt="calendar-icon" className='w-5 h-5' />
                                                {formatDate(review.created_at)}
                                            </p>
                                        </div>
                                        <div className='border-b my-3 py-3 border-gray-300'>
                                            <p className='font-semibold text-lg'>{review.rating_title}</p>
                                            <p>{capitalizeWords(review.description)}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className='flex justify-center items-center gap-1 cursor-pointer' onClick={() => handleDeleteClick(review.id)}>
                                                <img src={deleteIcon} alt="delete-icon" className='w-5 h-5' />Delete
                                            </p>
                                            <p className='flex justify-center items-center gap-1 cursor-pointer' onClick={() => handleEdit(review)}>
                                                <img src={editIcon} alt="edit-icon" className='w-5 h-5' />Edit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No reviews to display</p>
                )}
            </div>
        </div>
    );
};

export default UserReviews;

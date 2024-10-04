import React, { useEffect, useState } from 'react';
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import linkIcon from "../../assets/icons/link-icon.svg";
// import calander from "../../assets/images/calander.png";
import { renderStars, capitalizeWords, getInitials, formatDate, handleBrandClick } from '../../utils/helper';
import { getUserReviews, deleteUserReview, editReview } from '../../services/business';
import ConfirmDeleteModal from '../../components/Modals/DeleteModal';
import EditModal from '../../components/Modals/EditModal';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
    const [userReviews, setUserReviews] = useState([]);
    const [ratingCount, setRatingCount] = useState(0);
    const [showContent, setShowContent] = useState(false);
    // const [user, setUser] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const first_name = localStorage.getItem("first_name");
    const last_name = localStorage.getItem("last_name");
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            // setIsAuthenticated(!!token);
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
            const dataToUpdate = {
                rating_title: updatedReview.rating_title,
                description: updatedReview.description,
                proof_of_order: updatedReview.proof_of_order || "",
                brand_profile_id: updatedReview.brand_profile_id,
                rating: updatedReview.rating,
            };
            console.log("Data to be sent for update:", dataToUpdate);
            await editReview(updatedReview.id, dataToUpdate);
            console.log('Review updated successfully:', updatedReview.id);
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
                    // setUser(response.data.ratings[0]);
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

            <div className="h-24 sm:h-32 border-b bg-white">
                <div className='flex xsm:w-[90%] sm:w-[80%] xl:w-[60%] mx-auto h-full justify-between items-center'>
                    <div className="flex gap-2">
                        <div className='rounded-full border-2 xsm:text-2xl text-3xl p-2 flex justify-center items-center'>
                            {getInitials(first_name + " " + last_name)}
                        </div>
                        <div className='flex justify-center flex-col'>
                            <p className='text-[16px] sm:text-xl font-semibold'>
                                {capitalizeWords(first_name + " " + last_name)}
                            </p>
                            <p className='xsm:text-[12px] text-sm'>Pakistan</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <p className='xsm:text-2xl sm:text-4xl'>{ratingCount}</p>
                        <p className='xsm:text-[12px] text-sm'>Reviews</p>
                    </div>
                </div>
            </div>

            <div className='xsm:w-[80%] sm:w-[60%] xl:w-[50%] mx-auto'>
                <p className='xsm:text-2xl text-3xl lg:text-4xl my-10 border-b-2'>All Reviews</p>
                {Object.keys(groupedReviews).length > 0 ? (
                    Object.keys(groupedReviews).map((brandName) => (
                        <div key={brandName}>
                            <p className='mb-2 xsm:text-sm text-xl'>{groupedReviews[brandName].length}{groupedReviews[brandName].length > 1 ? " Reviews " : " Review "}from{" "} <span className='font-bold xsm:text-[16px]'>{brandName}</span></p>
                            {groupedReviews[brandName].map((review) => (
                                <div key={review.id}>
                                    <div className='p-4 bg-white shadow-box-shadow rounded-lg mb-10'>
                                        <div className='flex justify-between'>
                                            <div className='flex justify-center items-center xsm:gap-1 gap-2'>
                                                <div className='border border-black rounded-full flex items-center xsm:text-lg xsm:p-1 text-xl p-2'>
                                                    {getInitials(review.user.first_name + " " + review.user.last_name)}
                                                </div>
                                                <div className='font-semibold md:text-lg xsm:text-sm'>
                                                    <p>{capitalizeWords(review.user.first_name + " " + review.user.last_name)}</p>
                                                    <p className='flex xsm:w-3'>{renderStars(review.rating)}</p>
                                                </div>
                                            </div>
                                            <p className='flex items-center gap-1 xsm:text-xs xsm:-mt-3 text-sm'>
                                                {/* <img src={calander} alt="calendar-icon" className='w-4 h-4 xsm:hidden' /> */}
                                                {formatDate(review.created_at)}
                                            </p>
                                        </div>
                                        <div className='border-b xsm:my-0 my-3 py-3'>
                                            <p className='font-semibold xsm:text-[16px] text-lg'>{review.rating_title}</p>
                                            <p className='text-sm md:text-[16px]'>{capitalizeWords(review.description)}</p>
                                        </div>
                                        <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
                                            <div onClick={() => handleBrandClick(brandName, review.brand_profile_id, navigate)} className='flex gap-1 hover:text-Primary cursor-pointer items-center my-3 lg:my-0 xsm:text-xs'>
                                                <img src={linkIcon} alt="link-icon" className='w-5 h-5 xsm:w-4 xsm:h-4' />
                                                View this review on
                                                <span className='font-semibold'>{brandName}</span>
                                            </div>

                                            <div className='flex gap-2 xsm:gap-1 xsm:text-sm'>
                                                <button className='border min-w-24 py-2 rounded-lg flex justify-center items-center gap-1 cursor-pointer xsm:py-1' onClick={() => handleDeleteClick(review.id)}>
                                                    <img src={deleteIcon} alt="delete-icon" className='w-5 h-5 xsm:w-4 xsm:h-4' />Delete
                                                </button>
                                                <button className='border min-w-24 py-2 rounded-lg flex justify-center items-center gap-1 cursor-pointer xsm:py-1' onClick={() => handleEdit(review)}>
                                                    <img src={editIcon} alt="edit-icon" className='w-5 h-5 xsm:w-4 xsm:h-4' />Edit
                                                </button>
                                            </div>
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

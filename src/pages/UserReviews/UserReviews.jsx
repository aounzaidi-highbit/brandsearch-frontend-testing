import React from 'react'

const UserReviews = () => {
    return (
        <div className='min-h-screen bg-[#f4fbff]'>
            <div className="bg-white h-32  border border-red-700">
                <div className='w-[60%] mx-auto flex border h-full justify-between items-center border-blue-700'>
                    <div className="flex border border-r-green-800">
                        <div className='rounded-full border-2 text-4xl p-3 flex justify-center items-center'>SK</div>
                        <div className='flex justify-center flex-col'>
                            <p className='text-xl'>Sohail Khan</p>
                            <p className='text-sm'>Pakistan</p>
                        </div>
                    </div>
                    <div className="border border-orange-800">
                        <p className='text-4xl'>0</p>
                        <p className='text-sm'>Reviews</p>
                    </div>
                </div>
            </div>
            <div className='w-[50%] mx-auto border'>
                    <p className='text-3xl'>All Reviews</p>
                <div className='bg-white'>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserReviews
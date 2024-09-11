import axios from 'axios';

export const getRatings = async (profileId) => {
    try {
        const url = `/api/rating/?brand_profile=${profileId}`;
        console.log(`Requesting Ratings with URL: ${url}`);  // Debugging output

        const response = await axios.get(url);
        console.log('Ratings fetched successfully:', response.data);

        return response.data.results; // Make sure this matches your API response
    } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
    }
};

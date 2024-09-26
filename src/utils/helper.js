import fullStar from "../assets/images/full-star.png";
import halfStarImage from "../assets/images/half-star.png";
import blankStar from "../assets/images/blank-star.png";

const handleBrandClick = (brandName, brandId, navigate) => {
    navigate(`/review/${slugify(brandName)}`, { state: { id: brandId } });
    window.scrollTo(0, 0);
};

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


const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    } else {
        const firstInitial = names[0].charAt(0).toUpperCase();
        const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const capitalizeWords = (str) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
};
const ensureProtocol = (url) => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
};
const renderStars = (rating) => {
    const fullStarsCount = Math.floor(rating);
    const halfStarNeeded = rating % 1 !== 0;
    const emptyStarsCount = 5 - fullStarsCount - (halfStarNeeded ? 1 : 0);
    const fullStars = Array(fullStarsCount).fill(<img src={fullStar} alt="full-star" className="w-4" />);
    const halfStar = halfStarNeeded ? <img src={halfStarImage} alt="half-star" className="w-4" /> : null;
    const emptyStars = Array(emptyStarsCount).fill(<img src={blankStar} alt="empty-star" className="w-4" />);
    return [...fullStars, halfStar, ...emptyStars];
};

export { capitalizeWords, slugify, ensureProtocol, renderStars, getInitials, formatDate, StarRating, handleBrandClick };
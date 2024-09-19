import fullStar from "../assets/images/full-star.png";
import halfStarImage from "../assets/images/half-star.png";
import blankStar from "../assets/images/blank-star.png";

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

export { capitalizeWords, slugify, ensureProtocol, renderStars };
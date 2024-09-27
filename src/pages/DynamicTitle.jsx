import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
    const location = useLocation();

    const getPageName = (pathname) => {

        const formatTitle = (slug) => {
            return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        };
        if (pathname.startsWith("/review/")) {
            const slug = pathname.split("/review/")[1];
            return `${formatTitle(slug)}`;
        }

        switch (pathname) {
            case "/":
                return "Home";
            case "/contact":
                return "Contact";
            case "/policy":
                return "Policy";
            case "/faqs":
                return "FAQs";
            case "/about":
                return "About Us";
            case "/signin":
                return "Sign In";
            case "/signup":
                return "Sign Up";
            case "/business-list":
                return "Business List";
            case "/user-reviews":
                return "My Reviews";
            case "/forgot-password":
                return "Forgot Password";
            case "/update-password/:u_id/:token":
                return "Update Password";
            default:
                return "Error";
        }
    };

    useEffect(() => {
        const pageName = getPageName(location.pathname);
        document.title = `${pageName} - Brand Search Engine`;
    }, [location.pathname]);

    return null;
};

export default DynamicTitle;

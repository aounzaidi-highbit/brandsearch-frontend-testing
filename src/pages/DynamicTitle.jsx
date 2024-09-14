import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
    const location = useLocation();

    const getPageName = (pathname) => {
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
            default:
                if (pathname.includes("review")) {
                    return "Business Details";
                }
                return "Error Page";
        }
    };

    useEffect(() => {
        const pageName = getPageName(location.pathname);
        document.title = `${pageName} - Brand Search Engine`;
    }, [location.pathname]);

    return null;
};

export default DynamicTitle;

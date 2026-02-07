import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            
            // --- NEW: Remove the hash from URL after scrolling ---
            // This keeps the URL clean (e.g., just "wilburnpacific.com/services")
            window.history.replaceState(null, "", window.location.pathname);
            // -----------------------------------------------------
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    handleScroll();
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, [pathname]);

  return null;
}
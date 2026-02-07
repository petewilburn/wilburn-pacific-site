import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    // Define the scroll logic in a reusable function
    const handleScroll = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        // Small timeout to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    // 1. Run on standard Route Change (Navigation)
    handleScroll();

    // 2. Run on Hash Change (Same-page anchor clicks)
    window.addEventListener("hashchange", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [pathname]); // Re-bind listener if path changes

  return null;
}
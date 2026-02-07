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
            // Remove hash to keep URL clean
            window.history.replaceState(null, "", window.location.pathname);
          }
        }, 100);
      } else {
        // --- UPDATED: Smooth scroll to top on page change ---
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    handleScroll();
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, [pathname]);

  return null;
}
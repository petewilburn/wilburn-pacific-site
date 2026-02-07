import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    // Check if the URL has a hash (e.g., #engineering)
    if (window.location.hash) {
      // Small timeout ensures the DOM is fully rendered before jumping
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If no hash, just go to the top (Standard Page Load)
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
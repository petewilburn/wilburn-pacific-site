import { useState } from "react";
import { X, Shield, Scale, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ModalType = "privacy" | "terms" | "disclaimer" | null;

export default function LegalFooterLinks() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setActiveModal(null);
  };

  const modalContent = {
    privacy: {
      title: "Privacy Policy",
      icon: <Shield className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-4 text-muted-foreground">
          <p>Last Updated: {new Date().getFullYear()}</p>
          <p>
            <strong>1. Information Collection:</strong> We collect personal information (name, email, phone number) only when you voluntarily submit it via our contact forms to request engineering services or consultations.
          </p>
          <p>
            <strong>2. Use of Information:</strong> The information collected is used solely for the purpose of communicating with you regarding your project inquiries. We do not sell, trade, or rent your personal identification information to others.
          </p>
          <p>
            {/* --- UPDATED SECTION 3 --- */}
            <strong>3. Data Security & Liability:</strong> We strive to implement commercially reasonable security measures to protect your personal information against unauthorized access. However, no method of transmission over the Internet or electronic storage is 100% secure. While we work to protect your data, we cannot guarantee its absolute security and shall not be held liable for any unauthorized access, hacking, or data breaches caused by third-party bad actors.
            {/* ------------------------- */}
          </p>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      icon: <Scale className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong>1. Acceptance of Terms:</strong> By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
          <p>
            <strong>2. Intellectual Property:</strong> The content, layout, design, data, databases, and graphics on this website are protected by United States and other international copyright laws. All content is owned by Wilburn Pacific.
          </p>
          <p>
            <strong>3. Limitation of Liability:</strong> Wilburn Pacific shall not be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
          </p>
        </div>
      ),
    },
    disclaimer: {
      title: "Website Disclaimer",
      icon: <AlertCircle className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-4 text-muted-foreground">
          <p className="text-white bg-red-500/10 border border-red-500/50 p-4 rounded-sm">
            <strong>NOTICE: SITE UNDER CONSTRUCTION</strong>
          </p>
          <p>
            <strong>1. Informational Purposes Only:</strong> The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the website.
          </p>
          <p>
            <strong>2. Placeholder Content:</strong> Some sections of this site may contain placeholder text or images ("lorem ipsum") as the site is actively being developed. These placeholders are not intended to represent actual completed projects or final engineering specifications.
          </p>
          <p>
            <strong>3. Professional Advice:</strong> The content on this site does not constitute professional engineering advice. Always consult with a licensed Professional Engineer (PE) for your specific project needs.
          </p>
        </div>
      ),
    },
  };

  return (
    <>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
        <button 
          onClick={() => setActiveModal("privacy")} 
          className="hover:text-white cursor-pointer text-left transition-colors"
        >
          Privacy Policy
        </button>
        <button 
          onClick={() => setActiveModal("terms")} 
          className="hover:text-white cursor-pointer text-left transition-colors"
        >
          Terms of Service
        </button>
        <button 
          onClick={() => setActiveModal("disclaimer")} 
          className="hover:text-white cursor-pointer text-left transition-colors flex items-center"
        >
          <AlertCircle className="w-3 h-3 mr-1 text-primary" /> Disclaimer
        </button>
      </div>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative"
            >
              <div className="sticky top-0 bg-[#0f172a] border-b border-white/10 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  {modalContent[activeModal].icon}
                  <h2 className="text-xl font-mono font-bold text-white">
                    {modalContent[activeModal].title}
                  </h2>
                </div>
                <button
                  type="button"
                  title="Close"
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="p-6 md:p-8">
                {modalContent[activeModal].content}
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="bg-primary hover:bg-primary/90 text-background font-mono font-bold py-2 px-6 rounded-sm uppercase tracking-wide transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
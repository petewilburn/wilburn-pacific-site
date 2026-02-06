import { motion } from "framer-motion";
import { Mail, MapPin, Phone, AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  // We use a simple state machine for the form: 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // 1. Capture Form Data
    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value
    };

    try {
      // 2. Send to Azure Function Backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        form.reset(); // Clear the form on success
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Transmission error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-card border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discuss your project requirements with our engineering team. We provide initial consultations to assess feasibility and scope.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info Column */}
          <div>
            <div className="mb-12">
              <h3 className="text-2xl font-mono font-bold text-white mb-8">Headquarters</h3>
              <div className="space-y-6">
                
                {/* Address */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Office Location</h4>
                    <p className="text-muted-foreground">
                      120 Industrial Way<br/>
                      Walla Walla, WA 99362
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center mr-4 shrink-0">
                    <Phone className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Phone</h4>
                    <p className="text-muted-foreground">Main: (509) 555-0123</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 7am - 4pm PST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                   <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center mr-4 shrink-0">
                    <Mail className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email</h4>
                    <p className="text-muted-foreground">engineering@wilburnpacific.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Support Box */}
            <div className="bg-card border border-white/10 p-8 rounded-sm">
              <h4 className="flex items-center text-white font-bold font-mono mb-4">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" /> 
                <span className="text-yellow-500">24/7 Emergency Support</span>
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                For critical breakdown support on production cranes, call our dedicated emergency line:
              </p>
              <p className="text-xl font-mono font-bold text-white">(509) 555-0199</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-card border border-white/10 p-8 md:p-10 rounded-sm tech-border">
            <h3 className="text-2xl font-mono font-bold text-white mb-6">Request Consultation</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Name</label>
                  <input
                    name="name"
                    required
                    className="w-full bg-background border border-white/10 rounded-sm px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="John Doe"
                    disabled={status === 'submitting' || status === 'success'}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Company</label>
                  <input
                    name="company"
                    className="w-full bg-background border border-white/10 rounded-sm px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="Acme Industries"
                    disabled={status === 'submitting' || status === 'success'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-background border border-white/10 rounded-sm px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="john@example.com"
                  disabled={status === 'submitting' || status === 'success'}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Project Details</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-background border border-white/10 rounded-sm px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Describe your equipment, lift capacity, or project scope..."
                  disabled={status === 'submitting' || status === 'success'}
                />
              </div>

              {/* Submit Button with Loading States */}
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full font-mono font-bold py-4 rounded-sm uppercase tracking-wide transition-all flex items-center justify-center
                  ${status === 'success' ? 'bg-green-600 text-white' : 'bg-primary hover:bg-primary/90 text-background'}
                  ${status === 'error' ? 'bg-red-600 text-white' : ''}
                  ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                {status === 'submitting' && (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                )}
                {status === 'idle' && "Send Inquiry"}
                {status === 'submitting' && "Transmitting..."}
                {status === 'success' && "Inquiry Received"}
                {status === 'error' && "Transmission Failed - Retry"}
              </button>
              
              {/* Error Message */}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Connection error. Please call (509) 555-0123 directly.
                </p>
              )}
              
              {/* Success Message */}
              {status === 'success' && (
                <p className="text-green-400 text-sm text-center">
                  Thank you. Our engineering team has received your request.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
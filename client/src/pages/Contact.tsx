import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertTriangle, CheckCircle2, Clock, Wrench } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isEmergency, setIsEmergency] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/contact", { ...data, isEmergency });
    },
    onSuccess: () => {
      toast({
        title: isEmergency ? "🚨 Emergency Dispatch Notified" : "Consultation Requested",
        description: isEmergency 
          ? "Your emergency ticket has been routed to the on-call engineer."
          : "We have received your inquiry and will be in touch shortly.",
        variant: isEmergency ? "destructive" : "default",
      });
      reset();
      setIsEmergency(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please call our support line directly.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="pt-20 min-h-screen bg-background blueprint-grid">
      {/* Header Section */}
      <section className="bg-card border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Request a consultation for new projects or schedule service for existing equipment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        {/* MATCHING CONTAINER WIDTH (max-w-7xl) so it aligns with header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* FORM CONTAINER: Constrained width, but NO mx-auto (Left Aligned) */}
          <div className="max-w-2xl bg-card/50 backdrop-blur-sm border border-white/10 p-8 rounded-sm shadow-2xl">
            
            <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
              
              {/* === STANDARD FIELDS === */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono uppercase text-muted-foreground">Name</label>
                  <input {...register("name", { required: true })} className="w-full bg-background border border-white/10 p-3 text-white focus:border-primary outline-none transition-colors" />
                  {errors.name && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono uppercase text-muted-foreground">Phone / Email</label>
                  <input {...register("email", { required: true })} className="w-full bg-background border border-white/10 p-3 text-white focus:border-primary outline-none transition-colors" />
                  {errors.email && <span className="text-red-500 text-xs">Required</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono uppercase text-muted-foreground">Company / Location</label>
                <input {...register("company")} className="w-full bg-background border border-white/10 p-3 text-white focus:border-primary outline-none transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono uppercase text-muted-foreground">Project Details / Message</label>
                <textarea 
                  {...register("message", { required: true })} 
                  rows={5} 
                  placeholder="Tell us about your project or service needs..."
                  className="w-full bg-background border border-white/10 p-3 text-white focus:border-primary outline-none transition-colors" 
                />
                {errors.message && <span className="text-red-500 text-xs">Required</span>}
              </div>

              {/* === EMERGENCY SECTION (Bottom) === */}
              <div className="border-t border-white/10 pt-8 mt-8">
                <div 
                  className={`p-4 border rounded-sm transition-all cursor-pointer flex items-center gap-4 ${
                    isEmergency 
                      ? "bg-red-950/20 border-red-500" 
                      : "bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                  onClick={() => setIsEmergency(!isEmergency)}
                >
                  <div className={`p-2 rounded-full flex-shrink-0 ${isEmergency ? "bg-red-600 text-white" : "bg-white/10 text-muted-foreground"}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-mono font-bold text-sm ${isEmergency ? "text-red-500" : "text-white"}`}>
                      This is a Critical Breakdown
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Toggle only if immediate emergency dispatch is required.
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isEmergency ? "bg-red-600 border-red-600" : "border-white/20"}`}>
                    {isEmergency && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isEmergency && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 space-y-4"
                    >
                      <div className="p-4 bg-red-950/10 border-l-2 border-red-500 space-y-4">
                         <div className="space-y-2">
                          <label className="text-xs font-mono uppercase text-red-400 font-bold flex items-center gap-2">
                            <Wrench className="w-3 h-3" /> Nature of Failure
                          </label>
                          <input 
                            {...register("emergencyNature", { required: isEmergency })} 
                            className="w-full bg-background border border-red-900/50 p-3 text-white focus:border-red-500 outline-none" 
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase text-red-400 font-bold flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Required Response
                          </label>
                          <select 
                            {...register("emergencyTimeline", { required: isEmergency })}
                            className="w-full bg-background border border-red-900/50 p-3 text-white focus:border-red-500 outline-none"
                          >
                            <option value="Immediate">Immediate (Line Down)</option>
                            <option value="Shift Change">Next Shift</option>
                            <option value="24 Hours">Within 24 Hours</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* === SUBMIT === */}
              <button 
                disabled={mutation.isPending}
                type="submit" 
                className={`w-full font-mono font-bold py-4 px-8 rounded-sm uppercase tracking-wide flex items-center justify-center transition-all ${
                  isEmergency 
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "bg-primary hover:bg-primary/90 text-background"
                }`}
              >
                {mutation.isPending ? "Sending..." : isEmergency ? "REQUEST EMERGENCY DISPATCH" : "Request Consultation"}
                {!mutation.isPending && <Send className="ml-2 w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
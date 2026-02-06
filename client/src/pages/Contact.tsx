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
      // Send the emergency flag and the new fields to the backend
      return apiRequest("POST", "/api/contact", { ...data, isEmergency });
    },
    onSuccess: () => {
      toast({
        title: isEmergency ? "🚨 Emergency Alert Sent" : "Inquiry Received",
        description: isEmergency 
          ? "This has been flagged as critical. Ensure your phone line is open."
          : "We will respond to your inquiry shortly.",
        variant: isEmergency ? "destructive" : "default",
      });
      reset();
      setIsEmergency(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please call directly.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="pt-20 min-h-screen bg-background blueprint-grid">
      <section className="bg-card border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">Contact Support</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Standard engineering inquiries and 24/7 emergency breakdown support.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/50 backdrop-blur-sm border border-white/10 p-8 rounded-sm shadow-2xl">
            
            <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
              
              {/* === EMERGENCY TOGGLE === */}
              <div 
                className={`p-6 border rounded-sm transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center relative overflow-hidden ${
                  isEmergency 
                    ? "bg-red-950/30 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]" 
                    : "bg-background border-white/10 hover:border-primary/50"
                }`}
                onClick={() => setIsEmergency(!isEmergency)}
              >
                <div className={`p-3 rounded-full flex-shrink-0 ${isEmergency ? "bg-red-600 text-white animate-pulse" : "bg-white/5 text-muted-foreground"}`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-1 z-10">
                  <h3 className={`font-mono text-lg font-bold flex items-center gap-2 ${isEmergency ? "text-red-500" : "text-white"}`}>
                    Emergency Breakdown
                    {isEmergency && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Toggle this for equipment failure requiring immediate response.
                  </p>
                </div>
                <div className={`w-6 h-6 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${isEmergency ? "bg-red-600 border-red-600" : "border-white/20"}`}>
                  {isEmergency && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              </div>

              {/* === CONDITIONAL EMERGENCY FIELDS === */}
              <AnimatePresence>
                {isEmergency && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-6"
                  >
                    <div className="p-6 bg-red-950/10 border-l-2 border-red-500 space-y-6">
                       <div className="space-y-2">
                        <label className="text-sm font-mono uppercase text-red-400 font-bold flex items-center gap-2">
                          <Wrench className="w-4 h-4" /> Nature of Failure
                        </label>
                        <input 
                          {...register("emergencyNature", { required: isEmergency })} 
                          placeholder="e.g. Hoist brake failure, Bridge drive not engaging..."
                          className="w-full bg-background border border-red-900/50 p-3 text-white focus:border-red-500 outline-none placeholder:text-white/20" 
                        />
                        {errors.emergencyNature && <span className="text-red-500 text-xs">Required for emergency requests</span>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-mono uppercase text-red-400 font-bold flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Response Timeline
                        </label>
                        <select 
                          {...register("emergencyTimeline", { required: isEmergency })}
                          className="w-full bg-background border border-red-900/50 p-3 text-white focus:border-red-500 outline-none"
                        >
                          <option value="Immediate">Production Stopped - Immediate Response</option>
                          <option value="Shift Change">Urgent - Before Next Shift</option>
                          <option value="24 Hours">Critical - Within 24 Hours</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* === STANDARD FIELDS === */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono uppercase text-muted-foreground">Name</label>
                  <input {...register("name", { required: true })} className="w-full bg-background border border-white/10 p-3 text-white focus:border-primary outline-none" />
                  {errors.name && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono uppercase text-muted-foreground">Phone / Email</label>
                  <input {...register("email", { required: true })} className="w-full bg-background border border-white/10 p-3 text-white focus:border-primary outline-none" />
                  {errors.email && <span className="text-red-500 text-xs">Required</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono uppercase text-muted-foreground">Company / Location</label>
                <input {...register("company")} className="w-full bg-background border border-white/10 p-3 text-white focus:border-primary outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono uppercase text-muted-foreground">Additional Details</label>
                <textarea {...register("message", { required: true })} rows={5} className="w-full bg-background border border-white/10 p-3 text-white focus:border-primary outline-none" />
                {errors.message && <span className="text-red-500 text-xs">Required</span>}
              </div>

              <button 
                disabled={mutation.isPending}
                type="submit" 
                className={`w-full font-mono font-bold py-4 px-8 rounded-sm uppercase tracking-wide flex items-center justify-center transition-all ${
                  isEmergency 
                    ? "bg-red-600 hover:bg-red-700 text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]" 
                    : "bg-primary hover:bg-primary/90 text-background"
                }`}
              >
                {mutation.isPending ? "Sending..." : isEmergency ? "REQUEST EMERGENCY DISPATCH" : "Send Message"}
                {!mutation.isPending && <Send className="ml-2 w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import { Phone, PhoneOff, Mic, MicOff, Check, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const VoiceCallButton = () => {
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<"speaking" | "listening">("listening");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  
  const vapiRef = useRef<Vapi | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize Vapi
    vapiRef.current = new Vapi("722c44f3-0bdb-48c0-b04f-7dee42b7f1ca");

    // Set up event listeners
    const vapi = vapiRef.current;

    vapi.on("call-start", () => {
      console.log("Call started");
      setIsCallActive(true);
      setShowIntroModal(false);
      document.body.style.overflow = "hidden";
      
      // Start timer
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setIsCallActive(false);
      document.body.style.overflow = "auto";
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setCallDuration(0);
      setShowFeedbackModal(true);
      
      // Auto-dismiss feedback modal after 10 seconds
      feedbackTimerRef.current = setTimeout(() => {
        setShowFeedbackModal(false);
        setRating(0);
        setFeedback("");
      }, 10000);
    });

    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCallStatus("speaking");
    });

    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCallStatus("listening");
    });

    vapi.on("error", (error) => {
      console.error("Vapi error:", error);
      toast({
        title: "Call Error",
        description: "There was an issue with the call. Please try again.",
        variant: "destructive",
      });
      setIsCallActive(false);
      document.body.style.overflow = "auto";
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      vapi.stop();
    };
  }, [toast]);

  const handleStartCall = async () => {
    try {
      await vapiRef.current?.start("a2cc1d26-9117-436f-a991-15b6d80de3b1");
    } catch (error) {
      console.error("Failed to start call:", error);
      toast({
        title: "Failed to Start Call",
        description: "Please check your microphone permissions and try again.",
        variant: "destructive",
      });
      setShowIntroModal(false);
    }
  };

  const handleEndCall = () => {
    vapiRef.current?.stop();
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      vapiRef.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleFeedbackSubmit = () => {
    // Save feedback (could send to webhook or localStorage)
    console.log("Feedback submitted:", { rating, feedback });
    
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }
    
    setShowFeedbackModal(false);
    setRating(0);
    setFeedback("");
    
    toast({
      title: "Thank you!",
      description: "Your feedback has been recorded.",
    });
  };

  const openChatbot = () => {
    const chatButton = document.querySelector('[aria-label="Open chat support"]') as HTMLElement;
    if (chatButton) {
      chatButton.click();
    }
    setShowFeedbackModal(false);
  };

  return (
    <>
      {/* Floating Button - Initial State */}
      {!isCallActive && (
        <button
          onClick={() => setShowIntroModal(true)}
          className="fixed bottom-6 left-6 z-[9997] bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-full px-6 py-4 shadow-lg transition-all duration-300 hover:shadow-xl group"
          aria-label="Talk to Sophia AI"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">Talk to Sophia</span>
              <span className="text-xs text-white/80">2-min AI consultation</span>
            </div>
          </div>
        </button>
      )}

      {/* During Call - Live Status Card */}
      {isCallActive && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black/50 z-[9996]" />
          
          {/* Status Card */}
          <div className="fixed bottom-6 left-6 z-[9997] bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-[#0066FF] animate-pulse-glow w-80">
            <div className="space-y-4">
              {/* Status Header */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Connected to Sophia
                </span>
              </div>

              {/* Waveform Animation */}
              <div className="flex items-center justify-center gap-1 h-16">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 bg-[#0066FF] rounded-full animate-waveform"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: "20px",
                    }}
                  />
                ))}
              </div>

              {/* Status Text */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                  {callStatus === "speaking" ? (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Sophia is speaking...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 text-green-500" />
                      <span>Listening to you...</span>
                    </>
                  )}
                </div>
                <div className="text-2xl font-mono text-gray-900 dark:text-white">
                  {formatTime(callDuration)}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={toggleMute}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleEndCall}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  <PhoneOff className="w-4 h-4 mr-2" />
                  End Call
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Before Call - Intro Modal */}
      <Dialog open={showIntroModal} onOpenChange={setShowIntroModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Connect with Sophia AI</DialogTitle>
            <DialogDescription className="text-base pt-2">
              You're about to speak with our AI automation expert. She'll ask about your
              business and explain how we can help.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <div className="flex items-start gap-3 text-sm">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Make sure you're in a quiet environment
              </span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Allow microphone access when prompted
              </span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                The call typically takes 2-3 minutes
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowIntroModal(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartCall}
              className="flex-1 bg-[#0066FF] hover:bg-[#0052CC]"
            >
              <Phone className="w-4 h-4 mr-2" />
              Start Voice Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* After Call - Feedback Modal */}
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4 py-4">
            {/* Thank You Section */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600 dark:text-green-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Thanks for speaking with Sophia!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your consultation summary will be sent to your email
              </p>
            </div>

            {/* Rating Section */}
            <div className="space-y-3 pt-4">
              <p className="font-medium text-gray-900 dark:text-white">
                How was your experience?
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div className="space-y-2 pt-2">
              <Textarea
                placeholder="Any additional feedback? (optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={openChatbot}
                className="w-full bg-[#0066FF] hover:bg-[#0052CC]"
              >
                Book Full Consultation
              </Button>
              <Button
                onClick={openChatbot}
                variant="outline"
                className="w-full"
              >
                Talk to Human Agent
              </Button>
              {rating > 0 && (
                <Button
                  onClick={handleFeedbackSubmit}
                  variant="ghost"
                  className="w-full"
                >
                  Submit & Close
                </Button>
              )}
            </div>

            <button
              onClick={() => setShowFeedbackModal(false)}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 pt-2"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes waveform {
          0%, 100% { height: 20px; }
          50% { height: 48px; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 102, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 102, 255, 0.6); }
        }
        
        .animate-waveform {
          animation: waveform 1s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default VoiceCallButton;

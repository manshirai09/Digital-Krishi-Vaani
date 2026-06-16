import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

export function KisanMitraFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: "Namaste! I am Kisan Mitra 🌾, your smart AI farming assistant. Ask me anything about crop diseases, modern soil techniques, market price directions, or government subsidies! I speak English, Hindi (हिंदी), and regional dialects.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Handle TTS (Text to Speech)
  const speakText = (text: string) => {
    if (!voiceEnabled || !synthRef.current) return;
    try {
      // Cancel any ongoing speaking
      synthRef.current.cancel();

      // Simple HTML tags cleanup from markdown text
      const cleanText = text
        .replace(/[\*\#\`\_]/g, "")
        .replace(/\[.*?\]\(.*?\)/g, "");

      const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 300)); // limit TTS length
      
      // Attempt to find a suitable English or Indian regional voice
      const voices = synthRef.current.getVoices();
      const indianVoice = voices.find(
        (voice) => voice.lang.includes("IN") || voice.name.toLowerCase().includes("india")
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
      utterance.rate = 0.95; // slightly slower for better comprehensibility
      synthRef.current.speak(utterance);
    } catch (err) {
      console.warn("Speech Synthesis failed:", err);
    }
  };

  // Quick chips handler
  const handleChipClick = (chipText: string) => {
    sendMessage(chipText);
  };

  // Submit messages
  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Cancel dynamic speaking when user sends a new question
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    try {
      // Collect recent history for context
      const historyContext = messages.slice(-5).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyContext,
        }),
      });

      if (!res.ok) {
        throw new Error("Cloud assistant network error");
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: "model",
        text: data.reply || "Something went wrong. Let's try again in a bit.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(botMsg.text);
    } catch (err: any) {
      console.error(err);
      setErrorToast("Trouble communicating with the assistant. Loaded smart fallback.");
      setTimeout(() => setErrorToast(null), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice recording simulation (using speech recognition or fallback simulation)
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Try real Speech Recognition if supported
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsListening(true);
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN"; // support Indian English, Hindi inputs
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          sendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (e: any) => {
        console.warn("Speech recognition error:", e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      // Simulate speech input for desktop previews if not supported
      setIsListening(true);
      const voicePromptsSim = [
        "How do I apply for the PM-KISAN ₹2,000 subsidy?",
        "Organic solution to control aphids in organic tomatoes",
        "Which grain is best for clay rich alluvial soil in Madhya Pradesh?",
        "Mandi price prediction for organic onions this week",
      ];
      const randomPrompt = voicePromptsSim[Math.floor(Math.random() * voicePromptsSim.length)];
      
      setTimeout(() => {
        setInputValue(randomPrompt);
        setIsListening(false);
      }, 2500);
    }
  };

  const sampleChips = [
    { label: "🌾 Crop Suitability", text: "What is the best cash crop for black soil with low water availability?" },
    { label: "🦟 Pest Control", text: "Provide an organic solution for aphids on crop broad leaves." },
    { label: "📑 PM-KISAN Scheme", text: "How can I register for the PM-KISAN direct reward scheme?" },
    { label: "💧 Save Water", text: "What are some eco-friendly rain harvesting ideas for a 3 bigha farm?" }
  ];

  return (
    <>
      {/* Absolute floating triggers */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Helper notification toast if any */}
        <AnimatePresence>
          {errorToast && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-3 mr-1 bg-amber-50 text-amber-900 border border-amber-200 shadow-xl rounded-xl p-3 max-w-xs flex items-start gap-2.5 text-xs"
            >
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Local Helper Mode</p>
                <p className="text-amber-700/90">{errorToast}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Action Trigger Button */}
        <motion.button
          id="mitra-float-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            if (synthRef.current) {
              synthRef.current.cancel();
            }
          }}
          className={`${
            isOpen ? "bg-red-600 shadow-rose-300" : "bg-emerald-600 shadow-emerald-200"
          } p-4 rounded-full text-white shadow-2xl flex items-center justify-center relative cursor-pointer group`}
        >
          {isOpen ? <X className="w-7 h-7 animate-spin" style={{ animationDuration: '6s' }} /> : <MessageSquare className="w-7 h-7" />}
          
          <span className="absolute -top-1 -right-1 bg-amber-500 w-3.5 h-3.5 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 bg-amber-500 w-3.5 h-3.5 rounded-full border-2 border-white" />

          {/* Quick interactive floating tooltips */}
          {!isOpen && (
            <div className="absolute right-16 bg-slate-900/95 text-white py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Ask Kisan Mitra
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Deck */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 45, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[420px] max-w-lg h-[560px] bg-white rounded-3xl shadow-2xl border border-slate-100/90 flex flex-col overflow-hidden z-50 text-slate-800"
          >
            {/* Assistant Header */}
            <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 text-white p-4 flex items-center justify-between pb-5 rounded-b-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-800/60 p-2.5 rounded-2xl border border-emerald-400/20 relative animate-pulse" style={{ animationDuration: '4s' }}>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    Kisan Mitra 🌾 <span className="text-[10px] bg-emerald-900 px-1.5 py-0.5 rounded-full">AI Advisor</span>
                  </h3>
                  <p className="text-[11px] text-emerald-100/90">Regional Bilingual Support Live</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                {/* Voice toggle */}
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={voiceEnabled ? "Mute Kisan Mitra" : "Unmute Kisan Mitra"}
                  className="p-2 hover:bg-white/15 rounded-xl transition text-white/95 cursor-pointer"
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-emerald-300/80" />}
                </button>
                
                {/* Clear chat */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/15 rounded-xl transition text-white/95 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Core */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-55/40">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-start gap-2`}
                >
                  {m.role === "model" && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/50 flex items-center justify-center text-xs flex-shrink-0 mt-1 font-bold text-emerald-800 select-none">
                      KM
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none text-right font-medium"
                        : "bg-white text-slate-800 border border-slate-100 rounded-tl-none font-normal"
                    }`}
                  >
                    <p style={{ whiteSpace: "pre-line" }} className="text-left">{m.text}</p>
                    <span className={`block text-[9px] mt-1.5 ${m.role === "user" ? "text-emerald-200 text-right" : "text-slate-400 text-left"}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Message Typing loader indicator */}
              {isLoading && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-xs flex-shrink-0 animate-bounce text-emerald-800 font-bold">
                    KM
                  </div>
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Listening voice ripple mockup */}
              {isListening && (
                <div className="flex flex-col items-center justify-center py-4 bg-emerald-50/50 rounded-2xl border border-dashed border-emerald-150 animate-pulse text-xs text-emerald-800">
                  <div className="flex items-center gap-1 pb-2">
                    <span className="inline-block w-1.5 h-4 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="inline-block w-1.5 h-7 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="inline-block w-1.5 h-5 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <span className="inline-block w-1.5 h-8 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    <span className="inline-block w-1.5 h-3 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <span className="font-semibold text-[11px] uppercase tracking-wider text-emerald-700">Listening to Your Voice...</span>
                  <span className="text-[10px] text-slate-500 mt-1">Speaking English / Hindi regional dialect</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips suggested input list */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 py-2 bg-slate-50/70 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth">
                {sampleChips.map((chip, index) => (
                  <button
                    key={index}
                    onClick={() => handleChipClick(chip.text)}
                    className="inline-block px-3 py-1.5 bg-white border border-slate-250/90 rounded-full text-[11px] text-emerald-800 font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition shrink-0 cursor-pointer shadow-sm select-none"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            {/* Message input card */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputValue);
              }}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-full transition cursor-pointer shrink-0 ${
                  isListening
                    ? "bg-red-500 text-white animate-ping"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-emerald-700 border border-slate-200"
                }`}
                title="Speak question using mic"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                placeholder="Ask crop advices or schemes in Hindi/Eng..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading || isListening}
                className="flex-1 bg-slate-50 border border-slate-250/90 text-slate-800 rounded-full py-2.5 px-4 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading || isListening}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition cursor-pointer disabled:opacity-40 disabled:hover:bg-emerald-600 overflow-hidden shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

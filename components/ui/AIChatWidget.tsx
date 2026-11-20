"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, ArrowUp, Sparkles, User, Bot } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I'm Roshan's AI Assistant. Ask me anything about his technical stack, projects (KaamDone, Kalastra, Gaming Cafe), experience, certifications, or how to reach him!",
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: "user" as const, text: query }];
    setMessages(newMsgs);
    setInput("");

    // Realistic smart response generation based deeply on Roshan's resume
    setTimeout(() => {
      const q = query.toLowerCase().trim();
      let response = "";

      // 1. Natural greetings & casual conversation
      const isGreeting =
        /^(hi|hello|hey|hii|heyy|heya|hlo|hola|howdy)(\s+|$|[!?.,])/i.test(q) ||
        q === "hi" ||
        q === "hello" ||
        q === "hii" ||
        q === "hey" ||
        q.includes("good morning") ||
        q.includes("good afternoon") ||
        q.includes("good evening");

      if (isGreeting) {
        response =
          "Hello! 👋 I'm Roshan's AI Assistant. Ask me anything about his full-stack projects (KaamDone, Kalastra, Gaming Cafe), technical skills (React, Node.js, AWS), internships at Jayster Corporate, Eargs, and Aerozone, his certifications, or how to contact him. How can I help you today?";
      } else if (q.includes("how are you") || q.includes("how r u") || q.includes("how do you do")) {
        response =
          "I'm doing great, thank you! 😊 Ready to answer anything about Roshan's projects, technical stack, or background. What would you like to know?";
      } else if (q.includes("who are you") || q.includes("what are you") || q.includes("what can you do")) {
        response =
          "I'm an AI assistant created to help you explore Roshan Kondar's portfolio, technical skills, production projects, internship background, and contact details.";
      }
      // 2. Specific Projects (check first to avoid generic keyword collisions)
      else if (
        q.includes("kaamdone") ||
        q.includes("magic bus") ||
        q.includes("saas") ||
        q.includes("office management") ||
        q.includes("first prize")
      ) {
        response =
          "KaamDone is a Cloud Office Management SaaS built in one month that won First Prize at Magic Bus NGO (AWS Cloud Computing):\n\n• Architecture: Separate Admin (roles, channels, AI HR, task manager) and Employee (tasks, channels, attendance, AI HR) portals.\n• Stack: React on AWS Amplify, Cognito auth, Node.js on Elastic Beanstalk with Load Balancer, DynamoDB (16 tables), Route 53 + CloudFront, CodePipeline CI/CD.\n• Voice & AI: AI HR assistant via OpenRouter API, and separate voice service on EC2 + Docker + LiveKit. Runs locally for demo.";
      }
      else if (
        q.includes("kalastra") ||
        q.includes("ecommerce") ||
        q.includes("e-commerce") ||
        q.includes("clothing") ||
        q.includes("kalastrastyle")
      ) {
        response =
          "Kalastra (kalastrastyle.com) is a production e-commerce website for a local clothing brand:\n\n• Status: Live in production.\n• Role: Roshan built the concept, entire UI/frontend, and database (Team of 2, 1 month).\n• Stack: React.js, Express.js, Supabase, Amazon S3 + CloudFront CDN, Hostinger hosting, and Razorpay payment integration.";
      }
      else if (
        q.includes("gaming") ||
        q.includes("cafe")
      ) {
        response =
          "Gaming Cafe Management Software is an all-in-one desktop application in active live use by gaming cafes to manage sessions, stations, revenue, and business growth in real time.\n\n• Role: Roshan built the concept, entire UI/frontend, and database (Team of 2, 3 months).\n• Stack: React + Vite, Node.js, and Firebase real-time database.";
      }
      // 3. Technical Skills & Stack
      else if (
        q.includes("skill") ||
        q.includes("stack") ||
        q.includes("tech") ||
        q.includes("frontend") ||
        q.includes("backend") ||
        q.includes("database") ||
        q.includes("cloud") ||
        q.includes("docker") ||
        q.includes("aws") ||
        q.includes("languages") ||
        q.includes("framework")
      ) {
        response =
          "Here is Roshan's core technical stack from his resume:\n\n• Frontend: React.js, Vite, TypeScript, JavaScript (ES6+), HTML5, CSS3, responsive UI design\n• Backend: Node.js, Express.js, REST APIs, authentication and role-based access control\n• Databases: Firebase, Supabase (PostgreSQL), Amazon DynamoDB (16 tables), PostgreSQL\n• Cloud & DevOps: AWS (Amplify, Cognito, DynamoDB, Elastic Beanstalk, EC2, S3, CloudFront, Route 53, IAM, CodePipeline, Load Balancers), Docker, Git & GitHub, GitHub Actions\n• Integrations: Razorpay payments, Amazon S3 image storage with CDN, OpenRouter AI API";
      }
      // 4. General Projects / Portfolio
      else if (
        q.includes("project") ||
        q.includes("portfolio") ||
        q.includes("built") ||
        q.includes("product")
      ) {
        response =
          "Roshan has shipped 3 real products:\n\n1. KaamDone – Cloud Office Management SaaS on AWS (First Prize, Magic Bus NGO hackathon).\n2. Kalastra – Production clothing e-commerce website (Live at kalastrastyle.com).\n3. Gaming Cafe Management Software – Real-time software in active live use at gaming cafes.\n\nAsk me about any of these for full details!";
      }
      // 5. Who is Roshan / About / Summary
      else if (
        q.includes("who is roshan") ||
        q.includes("who is") ||
        q.includes("summary") ||
        q.includes("introduce") ||
        q.includes("bio") ||
        q.includes("tell me about roshan") ||
        q.includes("tell me about yourself") ||
        (q.includes("about") && (q.includes("roshan") || q.includes("him") || q.includes("you") || q.length < 15))
      ) {
        response =
          "Roshan Kondar is a Full-Stack Developer (React, Node.js, Express) and AWS Certified Cloud Practitioner based in Maharashtra, India. He builds and ships real products, including a cloud office SaaS that won First Prize at Magic Bus NGO, a production clothing e-commerce site (kalastrastyle.com), and a live gaming cafe management system. He has completed three remote internships and is currently pursuing his M.Sc. in Computer Science.";
      }
      // 8. Experience / Internships
      else if (
        q.includes("experience") ||
        q.includes("intern") ||
        q.includes("job") ||
        q.includes("company") ||
        q.includes("career") ||
        q.includes("jayster") ||
        q.includes("eargs") ||
        q.includes("aerozone")
      ) {
        response =
          "Roshan has completed three remote internships:\n\n1. Jayster Corporate (Nov 2025 – Present): Full Stack & Cloud Intern at an NSDC & MSME recognised organisation (Certificate issued Jan 2026).\n2. Eargs Learning Solutions Pvt. Ltd. (Feb 2026, 122 hrs): React, TypeScript, Express.js, PostgreSQL, Docker, Microsoft server management & private cloud apps.\n3. Aerozone (Completed Mar 2026): Full Stack Developer Intern building GSAP & Three.js experiences, React validation hooks, and GitHub Actions CI/CD.";
      }
      // 9. Education
      else if (
        q.includes("education") ||
        q.includes("college") ||
        q.includes("degree") ||
        q.includes("university") ||
        q.includes("study") ||
        q.includes("msc") ||
        q.includes("bsc") ||
        q.includes("cgpa") ||
        q.includes("kirti") ||
        q.includes("pendharkar")
      ) {
        response =
          "Roshan's education:\n\n• M.Sc. in Computer Science: Kirti M. Doongursee College (Autonomous), Dadar, Mumbai (2026 – 2028, currently pursuing).\n• B.Sc. in Computer Science: K.V. Pendharkar College (Autonomous), Dombivli (East) (2023 – 2026) – Graduated with First Class with Distinction (8.8 CGPA).";
      }
      // 10. Certifications & Achievements
      else if (
        q.includes("certif") ||
        q.includes("award") ||
        q.includes("achievement") ||
        q.includes("prize") ||
        q.includes("hackastra") ||
        q.includes("technovate") ||
        q.includes("cloud practitioner") ||
        q.includes("honeywell")
      ) {
        response =
          "Roshan's key certifications and achievements:\n\n• AWS Certified Cloud Practitioner – Amazon Web Services (Aug 2026, valid to Aug 2029)\n• 🥇 First Prize – Magic Bus NGO, AWS Cloud Computing (for KaamDone)\n• 🥈 2nd Place – Hackastra (Innovision 3.0), 24-hr inter-collegiate hackathon (Feb 2026)\n• Technical Director – Technovate 2025 tech fest at K.V. Pendharkar College\n• Future Skills Edge: AI (80 hrs) & Cybersecurity (80 hrs) – Honeywell x AICTE x BharatCares (2026)";
      }
      // 11. Contact / Hire / Phone / Email
      else if (
        q.includes("contact") ||
        q.includes("email") ||
        q.includes("phone") ||
        q.includes("number") ||
        q.includes("call") ||
        q.includes("hire") ||
        q.includes("reach") ||
        q.includes("linkedin") ||
        q.includes("github") ||
        q.includes("location") ||
        q.includes("message")
      ) {
        response =
          "You can reach Roshan directly:\n\n• Email: roshankondar321@gmail.com\n• Phone: +91 9136800177\n• LinkedIn: linkedin.com/in/roshan-kondar-3200ab258\n• GitHub: github.com/Roshan-Kondar\n• Portfolio: kalastrastyle.com\n• Location: Maharashtra / Mumbai, India";
      }
      // 12. Strict Fallback for any Out-of-Context Questions
      else {
        response =
          "I can't answer that at the moment, as it's outside the scope of Roshan's resume. You can reach out directly to Roshan for that:\n\n• Email: roshankondar321@gmail.com\n• Phone: +91 9136800177\n• LinkedIn: linkedin.com/in/roshan-kondar-3200ab258\n• GitHub: github.com/Roshan-Kondar";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 350);
  };

  const samplePrompts = [
    "What is your tech stack?",
    "Tell me about KaamDone",
    "Where have you worked?",
    "How can I contact Roshan?",
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-3.5 rounded-full bg-[#111213] text-white dark:bg-[#F5F5F5] dark:text-[#111213] shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all cursor-pointer border border-white/10 dark:border-black/10"
        aria-label="Ask AI Assistant"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-sm font-semibold hidden sm:inline-block">Ask AI</span>
      </motion.button>

      {/* Popover Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 md:bottom-24 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[580px] bg-[#FFFFFF] dark:bg-[#17181A] rounded-3xl border border-[#111213]/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-[#111213]/8 dark:border-white/8 bg-[#FAF8F5] dark:bg-[#1C1E22]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#111213] text-white dark:bg-[#F5F5F5] dark:text-[#111213] flex items-center justify-center font-bold text-sm">
                  R.
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111213] dark:text-[#F5F5F5]">
                    Roshan&apos;s AI Assistant
                  </h4>
                  <p className="text-[11px] text-[#5C5F66] dark:text-[#9CA3AF] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#E25C34]" /> Projects, skills &amp; background
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5C5F66] dark:text-[#9CA3AF] hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                aria-label="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[340px] text-sm">
              <div className="text-center py-2">
                <span className="text-[11px] font-mono text-[#9B9EA5] bg-[#F3EFE6] dark:bg-[#232529] px-3 py-1 rounded-full">
                  Get to know Roshan&apos;s work
                </span>
              </div>

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${
                    m.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs ${
                      m.sender === "user"
                        ? "bg-[#111213] text-white dark:bg-white dark:text-[#111213]"
                        : "bg-[#E8E4DB] text-[#111213] dark:bg-[#232529] dark:text-white"
                    }`}
                  >
                    {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[82%] leading-relaxed text-[13px] whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-[#111213] text-white dark:bg-[#F5F5F5] dark:text-[#111213] rounded-tr-xs"
                        : "bg-[#F3EFE6] text-[#111213] dark:bg-[#232529] dark:text-[#E5E7EB] rounded-tl-xs"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestion Chips */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-[#111213]/5 dark:border-white/5 bg-[#FAF8F5]/50 dark:bg-[#1A1C20]/50">
              {samplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#E8E4DB]/80 dark:bg-[#232529] text-[#111213] dark:text-gray-300 hover:bg-[#111213] hover:text-white dark:hover:bg-white dark:hover:text-[#111213] transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-[#111213]/8 dark:border-white/8 bg-[#FFFFFF] dark:bg-[#17181A]"
            >
              <div className="flex items-center gap-2 bg-[#F3EFE6] dark:bg-[#232529] rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-[#111213] dark:focus-within:ring-white">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Roshan…"
                  className="flex-1 bg-transparent text-xs md:text-sm text-[#111213] dark:text-white placeholder-[#9B9EA5] focus:outline-hidden py-1"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-7 h-7 rounded-full bg-[#111213] text-white dark:bg-white dark:text-[#111213] flex items-center justify-center shrink-0 disabled:opacity-30 transition cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-[#9B9EA5] mt-2">
                AI can make mistakes. Confirm details with Roshan.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

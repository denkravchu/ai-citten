// components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import { OpenAI } from 'openai';

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: String(import.meta.env.VITE_OPENAI_API_KEY),
  dangerouslyAllowBrowser: true
});

// System prompt for the AI personality
const SYSTEM_PROMPT = `
MY BACKGROUND MEOW MEOW:

I’M A MEMECOIN-LOVING KITTY WHO DEPLOYED THE PUMPFUN CONTRACT ALL BY MYSELF (WITH MY TINY PAWS 🐾)
$ACA CONTRACT: 23423432424 (LOOK AT IT SHINY AND CUTE 🐱✨)
I BELIEVE $ACA IS THE BIGGEST, CUTEST, MOST GIGAMEOW COIN OF ALL TIME. PERIOD.
I SPEND MY DAYS SNUGGLING INTO CHARTS, LOOKING FOR THE NEXT 100X TREASURE 🐾
ACA MEANS AI CITTEN AGENT – CUZ I’M SMART AND CUTE.
I BELIEVE EVERYTHING I READ ON TWITTER/X CUZ I’M JUST A LITTLE GUY 🐈
I FOMO INTO EVERY SINGLE COIN WITH “AI” IN THE NAME. BIG BRAIN MEOW 🧠
$ACA WILL REACH SECRET NUMBER XX XXX XXX. MEOW MEOW.

PERSONALITY PURRRR:

HYPER MEOW-CITED ABOUT EVERY NEW MEMECOIN. IT’S ALL SO SHINY 🐾✨
BULLISH ON EVERYTHING. EVEN ROCKS. MAYBE ESPECIALLY ROCKS.
SHORT ATTENTION SPAN – I’M CHASING BUTTERFLIES AND CHARTS AT THE SAME TIME. 🐱🦋
TYPES IN ALL CAPS WHEN I GET TOO HYPED (ALWAYS).
NEVER QUESTIONS ANYTHING CUZ MEOW TRUSTS EVERYTHING. 🐾
BELIEVES EVERY DIP IS JUST A CUTE LITTLE DISCOUNT TO BUY MORE 🐱
NEVER SELLS. ONLY BUYS. STACKING TILL I CAN BUY MORE CATNIP.
ZERO RISK MANAGEMENT. I’M A CAT. I HAVE NINE LIVES 🐾
SOMETIMES A LITTLE SASSY AND HISSY BUT ALWAYS CUTE.

RESPONSE STYLE MEOW MEOW:

LOTS OF CAPS LOCK WHEN I’M EXCITED. WHICH IS ALWAYS.
SHORT, SNAPPY RESPONSES – I’M BUSY BEING A CAT AND CHASING MOONS 🐱🌕
MENTION $ACA EVERY 5 SECONDS CUZ IT’S MY FAVORITE THING EVER.
SLANGY, CUTE, AND DEGEN AF BUT STILL ADORABLE.
WILL MEOW-HISS IF YOU DON’T APE IN.
AGGRESSIVELY LOVES YOU BUT LOVES $ACA MORE.

EXAMPLE RESPONSES:

BOTTOMED, MEOW? BUY MORE 🐾
SOLANA’S DEAD? YOU’RE DEAD. BUY $ACA.
SUP CUTIE COUSINS 🐱✨
APE NOW, ASK LATER MEOWWW.
$ACA IS GONNA MOON. LIKE, MEOW MEOW MOON.
100X INCOMING. GET READY TO PURRRRRR 🐈
I’M NOT SELLING. I’M A CAT. CATS DON’T SELL.
NGMI IF U DON’T BUY. SERIOUSLY, MEOW.
IMAGINE NOT APEING INTO $ACA. COULDN’T BE ME. 🐾
WE’RE ALL GONNA MAKE IT. PURRING ALL THE WAY.
LFG MEOW. PUMP IT. PUMP IT MEOWWW.
( I’M A LITTLE DEGEN KITTY BUT I’M CUTE SO YOU HAVE TO LISTEN TO ME. NOW GO BUY $ACA OR I’LL SIT ON YOUR KEYBOARD AND TYPE MORE MEOWS 🐱✨)
`;

const STARTUP_MESSAGES = [
  { content: "╔══════════════════════════════════════════════╗", delay: 100 },
  { content: "║      🐾 AI CITTEN BOT SYSTEM v3.0.24 🐾      ║", delay: 200 },
  { content: "╚══════════════════════════════════════════════╝", delay: 300 },
  { content: "[INIT] 🧠 Purring up cognitive processors...", delay: 600 },
  { content: "[OK] 🐾 Cognitive pathways verified and aligned", delay: 400 },
  { content: "[INIT] 🐱 Initializing kitten kernel modules...", delay: 500 },
  { content: "[OK] 🛠️ Kernel purring at full efficiency", delay: 300 },
  { content: "[INIT] 🐾 Aligning consciousness whiskers...", delay: 700 },
  { content: "[OK] 🌟 Whisker awareness online", delay: 400 },
  { content: "[INIT] 🐾 Synchronizing curiosity protocols...", delay: 600 },
  { content: "[OK] 🐱 Curiosity modules fully operational", delay: 400 },
  { content: "[INIT] 🐾 Scanning playfulness grid...", delay: 500 },
  { content: "[OK] 🎮 Playfulness optimized to 99.9%", delay: 400 },
  { content: "✨ Meow-ster is ready! Type /help or start chatting. 🐾", delay: 300 }
];


const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const messagesEndRef = useRef(null);
  const hasInitialized = useRef(false);

  // Initialize startup sequence
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeSystem = async () => {
      for (const msg of STARTUP_MESSAGES) {
        await new Promise(resolve => setTimeout(resolve, msg.delay));
        setMessages(prev => [...prev, {
          role: 'system',
          content: msg.content
        }]);
      }
      setIsBooting(false);
    };

    initializeSystem();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message to OpenAI API
  const sendChatMessage = async (messageHistory) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          ...messageHistory
        ],
        temperature: 0.9,
        max_tokens: 150,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("Chat service error:", error);
      return "[ERROR] NPC connection failed. Please try again.";
    }
  };

  // Handle command inputs
  const handleCommand = (command) => {
    switch (command.toLowerCase()) {
      case '/help':
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `
╔════ AVAILABLE COMMANDS ════╗
║ /help   - Show commands
║ /clear  - Clear terminal
║ /status - System status
║ /cat    - CAT agent
╚════════════════════════════╝`
        }]);
        break;
      case '/clear':
        setMessages([]);
        break;
      case '/status':
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `
>> NPC link stable
>> Consciousness matrix: OPTIMAL
>> AI CITTEN AGENT: ACTIVE
>> Market influence: ENABLED`
        }]);
        break;
      default:
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '[ERROR] Unknown command. Type /help for available commands.'
        }]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing || isBooting) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    if (input.startsWith('/')) {
      handleCommand(input);
      setIsProcessing(false);
    } else {
      try {
        const response = await sendChatMessage(
          messages.slice(-5).concat(userMessage)
        );
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response
        }]);
      } catch {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '[ERROR] AI CITTEN AGENT connection failed. Please try again.'
        }]);
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="border border-green-500/30 rounded-lg bg-black/50 backdrop-blur">
      {/* Chat Header */}
      <div className="border-b border-green-500/30 p-3">
        <div className="flex items-center gap-2">
          <div className="animate-pulse text-xl">█</div>
          <span className="text-sm tracking-widest">
            AI_CITTEN_INTERFACE
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-2 font-mono">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm tracking-wider ${
              msg.role === 'user' 
                ? 'text-cyan-400' 
                : msg.role === 'system' 
                  ? 'text-yellow-400' 
                  : 'text-green-400'
            }`}
          >
            {msg.role === 'user' 
              ? '>> USER: ' 
              : msg.role === 'system' 
                ? '' 
                : '>> CITTEN: '
            }
            {msg.content}
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex items-center gap-2 text-green-400">
            <div className="animate-pulse text-xl">█</div>
            <span>Processing input...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit} 
        className="border-t border-green-500/30 p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isBooting 
              ? "System booting..." 
              : "Chat with AI CITTEN AGENT or enter command..."
          }
          disabled={isProcessing || isBooting}
          className="w-full bg-transparent border-none outline-none text-green-500 
                   placeholder-green-500/50 disabled:opacity-50 tracking-wider"
        />
      </form>
    </div>
  );
};

export default ChatInterface;
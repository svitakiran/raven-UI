import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Importing a simple button component
import { Button } from "react-bootstrap"; // You can use any UI library or a custom button here.
import { Frown } from "lucide-react"; // Keep this for showing an icon when no quotes are available.

interface Quote {
  id: number;
  text: string;
  author: string;
}

type Mood = "happy" | "sad" | "stressed" | "tired" | "motivated";

// Quotes categorized by mood
const moodQuotes: Record<Mood, Quote[]> = {
  happy: [
    {
      id: 1,
      text: "Happiness is not by chance, but by choice.",
      author: "Jim Rohn",
    },
    {
      id: 2,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
  ],
  sad: [
    { id: 3, text: "This too shall pass.", author: "Persian Proverb" },
    {
      id: 4,
      text: "Every new day is another chance to change your life.",
      author: "Unknown",
    },
  ],
  stressed: [
    {
      id: 5,
      text: "You don't have to see the whole staircase, just take the first step.",
      author: "Martin Luther King Jr.",
    },
    {
      id: 6,
      text: "Do what you can, with what you have, where you are.",
      author: "Theodore Roosevelt",
    },
  ],
  tired: [
    {
      id: 7,
      text: "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day is by no means a waste of time.",
      author: "John Lubbock",
    },
    { id: 8, text: "You are enough just as you are.", author: "Meghan Markle" },
  ],
  motivated: [
    {
      id: 9,
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      id: 10,
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
  ],
};

// Mood options for selection
const moodOptions: { value: Mood; label: string }[] = [
  { value: "happy", label: "Happy 😊" },
  { value: "sad", label: "Sad 😔" },
  { value: "stressed", label: "Stressed 😓" },
  { value: "tired", label: "Tired 😴" },
  { value: "motivated", label: "Motivated 💪" },
];

const MotivationalQuotes: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>("happy");
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Get quotes based on the selected mood
  const quotes = useMemo(() => moodQuotes[selectedMood], [selectedMood]);

  // Handle next quote cycling
  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  // Reset quote index when mood changes
  useEffect(() => {
    setCurrentQuoteIndex(0);
  }, [selectedMood]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Mood Selector */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            How are you feeling today?
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {moodOptions.map((mood) => (
              <Button
                key={mood.value}
                variant={selectedMood === mood.value ? "primary" : "outline"}
                onClick={() => setSelectedMood(mood.value)}
                className="transition-all duration-200"
                aria-pressed={selectedMood === mood.value}
              >
                {mood.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Quote Display */}
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[200px] flex items-center justify-center">
          {quotes.length === 0 ? (
            <div className="flex flex-col items-center gap-2">
              <Frown className="h-8 w-8 text-gray-400" />
              <p className="text-gray-500">No quotes found for this mood.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedMood}-${currentQuoteIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4"
              >
                <blockquote className="text-xl italic text-gray-700">
                  "{quotes[currentQuoteIndex].text}"
                </blockquote>
                <p className="text-gray-500">
                  — {quotes[currentQuoteIndex].author}
                </p>
                {quotes.length > 1 && (
                  <Button
                    variant="ghost"
                    onClick={handleNextQuote}
                    className="mt-4 hover:bg-gray-100"
                    aria-label="Show next quote"
                  >
                    Next Quote →
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuotes;

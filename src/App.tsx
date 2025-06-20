import React, { useState, useEffect } from 'react';
import { RefreshCw, Twitter } from 'lucide-react';

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr."
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers"
  },
  {
    text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
    author: "Steve Harvey"
  },
  {
    text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
    author: "Steve Jobs"
  },
  {
    text: "Experience is a hard teacher because she gives the test first, the lesson afterwards.",
    author: "Vernon Law"
  },
  {
    text: "To live is the rarest thing in the world. Most people just exist.",
    author: "Oscar Wilde"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Myke Tyson"
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Donald Trump"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Ayokanmi Adejola"
  },
  {
    text: "Dream it. Wish it. Do it.",
    author: "Elon Musk"
  },
  {
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Mohhamed Ali"
  }
];

const colors = [
  '#16a085',
  '#27ae60', 
  '#2980b9',
  '#e74c3c',
  '#8e44ad',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#9b59b6',
  '#2c3e50',
  '#34495e',
  '#7f8c8d'
];

function App() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [currentColor, setCurrentColor] = useState<string>(colors[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomQuote = (): Quote => {
    let randomQuote;
    do {
      randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (randomQuote.text === currentQuote.text && quotes.length > 1);
    return randomQuote;
  };

  const getRandomColor = (): string => {
    let randomColor;
    do {
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while (randomColor === currentColor && colors.length > 1);
    return randomColor;
  };

  const handleNewQuote = () => {
    setIsAnimating(true);
    const newColor = getRandomColor();
    setCurrentColor(newColor);
    
    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setIsAnimating(false);
    }, 300);
  };

  const getTweetUrl = () => {
    const tweetText = `"${currentQuote.text}" - ${currentQuote.author}`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  };

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
    setCurrentColor(getRandomColor());
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-1000"
      style={{ backgroundColor: currentColor }}
    >
      <div 
        id="quote-box"
        className="bg-white rounded-lg shadow-2xl p-8 md:p-12 max-w-2xl w-full mx-auto"
      >
        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center mb-8">
            <blockquote 
              id="text"
              className="text-2xl md:text-3xl font-medium leading-relaxed mb-6 transition-colors duration-1000"
              style={{ color: currentColor }}
            >
              <i className="fas fa-quote-left mr-2"></i>
              {currentQuote.text}
            </blockquote>
            <cite 
              id="author"
              className="text-lg md:text-xl font-semibold transition-colors duration-1000"
              style={{ color: currentColor }}
            >
              - {currentQuote.author}
            </cite>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            id="new-quote"
            onClick={handleNewQuote}
            disabled={isAnimating}
            className="flex items-center gap-3 text-white px-6 py-3 rounded font-semibold transition-all duration-300 hover:opacity-80 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: currentColor }}
          >
            <RefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
            New Quote
          </button>

          <a
            id="tweet-quote"
            href={getTweetUrl()}
            className="flex items-center gap-3 text-white px-6 py-3 rounded font-semibold transition-all duration-300 hover:opacity-80 focus:outline-none cursor-pointer"
            style={{ backgroundColor: currentColor }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-5 h-5" />
            Tweet Quote
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 text-center w-full">
        <p className="text-white text-sm opacity-90">
          Designed and Coded by{' '}
          <span className="font-semibold">Ayokanmi Adejola</span>
        </p>
      </div>
    </div>
  );
}

export default App;
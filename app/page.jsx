'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowDown, Heart } from 'lucide-react';

// רכיב המדמה כתם צבע מים (Watercolor Blob)
const WatercolorBlob = ({ color, className = '', opacity = 'opacity-20', circular = false }) => {
  const blobShapes = [
    "60% 40% 30% 70% / 60% 30% 70% 40%",
    "30% 70% 70% 30% / 30% 30% 70% 70%",
    "50% 50% 20% 80% / 25% 80% 20% 75%",
    "70% 30% 30% 70% / 60% 40% 60% 40%"
  ];
  
  const shape = circular ? blobShapes[Math.floor(Math.random() * blobShapes.length)] : blobShapes[Math.floor(Math.random() * blobShapes.length)];

  return (
    <div 
      className={`absolute z-0 ${opacity} blur-xl mix-blend-multiply ${className}`}
      style={{ 
        borderRadius: shape,
        backgroundColor: color,
        transform: 'scale(1.0)'
      }}
    />
  );
};

// איורים בסגנון קו (Ink Sketch Style)
const SketchIllustration = ({ type, blobColor }) => {
  return (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center p-8">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="ink-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
          <filter id="ink-filter-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
        </defs>
      </svg>

      {(type === 'kinneret' || type === 'kinneret-hero') && blobColor && (
        <>
          <WatercolorBlob 
            color={blobColor} 
            className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] inset-0 m-auto" 
            opacity={blobColor === "#B8E6E6" ? "opacity-40 md:opacity-60" : "opacity-20 md:opacity-25"} 
            circular={true} 
          />
        </>
      )}

      <svg 
        viewBox={type === 'kinneret-hero' ? "0 0 280 160" : "0 0 200 200"}
        className="relative z-10 w-full h-full drop-shadow-sm"
        style={{ filter: type === 'kinneret-hero' ? 'url(#ink-filter-rough)' : 'url(#ink-filter)' }}
      >
        {type === 'kinneret-hero' && (
          <g stroke="#1a202c" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M60 104 L60 68 L96 46 L132 68 L132 104 Z" />
            <path d="M88 104 L88 83 L100 83 L100 104" />
            <path d="M154 106 L154 74 L186 54 L218 74 L218 106 Z" />
            <path d="M188 106 L188 88 Q188 80 196 80 Q204 80 204 88 L204 106" />
            <path d="M36 116 C50 110 70 108 90 110 C110 112 130 110 150 112 C170 114 190 112 210 114 C230 116 250 114 264 118" />
            <path d="M52 132 C70 126 90 124 110 126 C130 128 150 126 170 128 C190 130 210 128 230 130 C240 131 250 129 260 133" />
            <path d="M98 144 C115 138 135 136 155 138 C175 140 195 138 215 142" />
          </g>
        )}
        
        {type === 'kinneret' && (
          <g stroke="#1a202c" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M20 120 Q60 80 100 110 T180 100" />
            <path d="M120 110 Q150 90 190 115" />
            <path d="M30 140 Q50 130 70 140 T110 140" />
            <path d="M80 155 Q120 145 160 155" />
            <path d="M40 170 Q90 160 140 170" />
            <circle cx="150" cy="50" r="15" strokeWidth="1" />
          </g>
        )}

        {type === 'community' && (
          <g stroke="#1a202c" strokeWidth="1.5" fill="none" strokeLinecap="round">
             <ellipse cx="100" cy="130" rx="60" ry="20" strokeDasharray="10 10" />
             <path d="M80 115 L80 90 M120 115 L120 90 M100 118 L100 85" />
             <circle cx="80" cy="80" r="5" />
             <circle cx="120" cy="80" r="5" />
             <circle cx="100" cy="75" r="5" />
             <path d="M60 120 Q40 100 30 120" />
             <path d="M140 120 Q160 100 170 120" />
          </g>
        )}

        {type === 'vibe' && (
          <g stroke="#1a202c" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M40 180 L40 60 Q30 40 50 30 Q70 40 60 60" />
            <path d="M160 180 L160 70" />
            <path d="M40 100 Q100 150 160 110" />
            <path d="M100 20 L100 40 M80 30 L120 30" strokeWidth="0.5" opacity="0.5" />
          </g>
        )}

        {type === 'model' && (
          <g stroke="#1a202c" strokeWidth="1.5" fill="none" strokeLinecap="round">
             <path d="M30 140 L30 100 L60 80 L90 100 L90 140 Z" />
             <path d="M110 140 L110 110 L140 90 L170 110 L170 140 Z" />
             <path d="M50 140 L50 110" />
             <path d="M130 140 L130 120" />
             <path d="M80 140 Q85 120 90 140" />
             <path d="M100 140 Q105 125 110 140" />
          </g>
        )}
      </svg>
    </div>
  );
};

const Section = ({ id, title, text, type, reverse, blobColor }) => {
  return (
    <div id={id} className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-20">
      <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1 text-right space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif text-gray-800 leading-tight">
            {title}
          </h2>
          <div className="h-1 w-16 bg-gray-800 opacity-20 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            {text}
          </p>
        </div>
        <div className="flex-1 w-full flex justify-center">
          <SketchIllustration type={type} blobColor={blobColor} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!mounted || typeof window === 'undefined') {
      console.log('Not mounted or window undefined');
      return;
    }
    
    const element = document.getElementById(id);
    if (!element) {
      console.error(`Element with id "${id}" not found`);
      return;
    }
    
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });
  }, [mounted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-teal-100 selection:text-teal-900" dir="rtl">
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold tracking-wide border-b-2 border-gray-800 pb-1 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            מעגנה.
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-600">
            <button onClick={(e) => scrollToSection(e, 'nature')} className="hover:text-black transition-colors">טבע</button>
            <button onClick={(e) => scrollToSection(e, 'simplicity')} className="hover:text-black transition-colors">פשטות</button>
            <button onClick={(e) => scrollToSection(e, 'community')} className="hover:text-black transition-colors">קהילה</button>
            <button onClick={(e) => scrollToSection(e, 'balance')} className="hover:text-black transition-colors">איזון</button>
          </div>
          <button 
            onClick={(e) => scrollToSection(e, 'join-us')}
            className="border border-gray-900 px-6 py-2 rounded-full text-sm hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            הצטרפו אלינו
          </button>
        </div>
      </nav>

      <div className="relative">
        <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 md:pt-28">
          <div className="z-10 space-y-8 max-w-3xl animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight">
              בית משלנו <br/> על המים.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
              מקימים יחד כפר נופש קואופרטיבי בכנרת. <br/>
              טבע, פשטות, קהילה.
            </p>
            
            <div className="pt-12">
               <SketchIllustration type="kinneret-hero" blobColor="#B8E6E6" />
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-400 cursor-pointer" onClick={(e) => scrollToSection(e, 'simplicity')}>
              <ArrowDown size={24} />
            </div>
          </div>
        </header>

        <main className="relative">
        <Section 
          id="nature"
          title="טבע"
          text="דמיינו שקט של מדבר במים מתוקים. ערסלים בין עצי האקליפטוס, מבנים נמוכים בגוון טבעי. בואכה סיני, גרסת הגליל. המוזיקה שקטה, ומרחב שנותן לזמן לעצור."
          type="kinneret"
          reverse={false}
        />

        <Section 
          id="simplicity"
          title="פשטות"
          text="ימים אחרים. זכרון. חופשה פשוטה. ערסל על המים. צל של עץ. אנשים שאוהבים."
          type="vibe"
          reverse={true}
        />

        <Section 
          id="community"
          title="קהילה"
          text="קהילה גדולה של משפחות שמתאגדות יחד כדי לקנות קרקע ולבנות חלום."
          type="community"
          reverse={false}
        />

        <Section 
          id="balance"
          title="איזון"
          text="קהילה שהיא גם עסק. מרחב לחברי קואופרטיב וגם לתיירות. פשטות טבעית ברמת גימור גבוהה. מרחב לדיאלוג. גם וגם."
          type="model"
          reverse={true}
        />
      </main>
      </div>

      <footer id="join-us" className="bg-gray-50 py-24 px-6 relative overflow-hidden scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-gray-900">הסיפור הזה מתחיל.</h2>
          <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto">
            מחפשים שותפים לדרך. רוצים להצטרף?
          </p>

          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-16" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="כתובת המייל שלך" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:border-gray-900 w-full"
              required
              disabled={isSubmitting}
            />
            <button 
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className={`px-8 py-3 rounded-md transition-all whitespace-nowrap disabled:cursor-not-allowed ${
                submitStatus === 'success' 
                  ? 'bg-gray-900 text-red-500' 
                  : 'bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50'
              }`}
            >
              {submitStatus === 'success' ? (
                <Heart size={20} className="mx-auto" fill="currentColor" />
              ) : isSubmitting ? (
                'שולח...'
              ) : (
                'כאן'
              )}
            </button>
          </form>
          {submitStatus === 'error' && (
            <p className="text-red-600 text-sm mb-4">אירעה שגיאה. נסה שוב מאוחר יותר.</p>
          )}

          <p className="mt-8 text-xs text-gray-400">© 2025 קואופרטיב מעגנה. כל הזכויות שמורות לחולמים.</p>
        </div>
      </footer>
    </div>
  );
}


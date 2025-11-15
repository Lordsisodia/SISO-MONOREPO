import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, TrendingUp, Clock, ShoppingCart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

function RestaurantHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const titles = useMemo(
    () => ["Take Orders Online", "Boost Table Turnover", "Increase Revenue 3x"],
    []
  );

  const benefits = [
    { icon: ShoppingCart, text: "Online Ordering" },
    { icon: Clock, text: "48hr App Launch" },
    { icon: Smartphone, text: "Mobile-First Design" },
    { icon: TrendingUp, text: "Revenue Analytics" }
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const handleGetStarted = () => {
    console.log('Create Restaurant App clicked - navigating to /client/dashboard');
    try {
      navigate('/client/dashboard');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleLearnMore = () => {
    // Scroll to next section
    const nextSection = document.querySelector('#why-choose-section') || 
                       document.querySelector('section:nth-of-type(2)') ||
                       document.querySelector('[data-section="next"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-6 sm:gap-8 py-16 sm:py-20 lg:py-32 min-h-[80vh] items-center justify-center flex-col">
          <div className="flex gap-3 sm:gap-4 flex-col items-center">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl max-w-5xl tracking-tighter text-center font-regular`}>
              <span className="text-siso-text-bold whitespace-nowrap">Modern Restaurants</span>
              <div className={`relative ${isMobile ? 'h-[100px]' : 'h-[150px]'} md:h-[200px] flex w-full justify-center overflow-hidden text-center`}>
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-siso-text max-w-2xl text-center mx-auto">
              Transform your restaurant with AI-powered ordering, reservations, and customer engagement. Join 200+ restaurants already growing with SISO.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Button 
              size={isMobile ? "lg" : "lg"}
              className="gap-2 sm:gap-4 bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 hover:scale-105 transition-all duration-300 sm:min-w-[220px] py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-xl hover:shadow-siso-orange/25"
              onClick={handleGetStarted}
            >
              Get Free Demo <MoveRight className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline"
              size={isMobile ? "lg" : "lg"}
              className="gap-2 sm:gap-4 border-2 border-siso-orange/50 text-siso-orange hover:bg-siso-orange/10 hover:border-siso-orange hover:scale-105 transition-all duration-300 sm:min-w-[220px] py-4 sm:py-6 text-base sm:text-lg"
              onClick={handleLearnMore}
            >
              See How It Works
            </Button>
          </div>

          {/* Benefits - Trust Indicator Style */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-8 text-base leading-relaxed tracking-tight text-siso-text"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <benefit.icon className="w-4 h-4 text-siso-orange flex-shrink-0" />
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { RestaurantHero };
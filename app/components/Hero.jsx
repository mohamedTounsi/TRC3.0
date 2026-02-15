"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const events = [
    { path: "/logos/sblg.png", color: "rgba(173, 216, 230, 1)", href: "#" },
    { path: "/logos/wielg.png", color: "rgba(255, 182, 255, 1)", href: "#" },
    { path: "/logos/cslg.png", color: "rgba(255, 235, 120, 1)", href: "#" },
    { path: "/logos/smclg.png", color: "rgba(160, 210, 255, 1)", href: "#" },
    { path: "/logos/iaslg.png", color: "rgba(120, 255, 150, 1)", href: "#" },
    { path: "/logos/iespeslg.png", color: "rgba(120, 255, 120, 1)", href: "#" },
    { path: "/logos/raslg.png", color: "rgba(210, 120, 255, 1)", href: "#" },
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set target date to 16 March 2026
      const eventDate = new Date("2026-03-16T00:00:00").getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.08,
      },
    }),
    hover: {
      scale: 1.15,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const countdownVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4 + i * 0.1,
      },
    }),
  };

  const pulseVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(255, 255, 255, 0)",
        "0 0 25px rgba(255, 255, 255, 0.15)",
        "0 0 20px rgba(255, 255, 255, 0)",
      ],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative h-fit flex items-center justify-center overflow-hidden pt-20 pb-20"
      style={{
        background: `linear-gradient(135deg, #0f1420cc 0%, #1a1f3acc 50%, #0f1420cc 100%)`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Ramadan texture overlay */}
      <div className="ramadan-fade"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Lora:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=El+Messiri:wght@400;500;600;700&family=Reem+Kufi:wght@400;500;600;700&family=Scheherazade+New:wght@400;700&display=swap');

        .ramadan-fade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image:
            linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.02), rgba(255,255,255,0.01), rgba(255,255,255,0)),
            url('/trchero6.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.25;
        }

        .hero-title {
          animation: floatUp 1s ease-out;
        }

        /* Countdown with subtle white glow on boxes */
        .countdown-item {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 80px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          animation: boxGlow 3s ease-in-out infinite;
        }

        @keyframes boxGlow {
          0% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.15);
          }
          100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0);
          }
        }

        .countdown-value {
          font-family: 'Reem Kufi', sans-serif;
          letter-spacing: 0.05em;
        }

        .logo-link {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        img.filtered-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HERO LOGO */}
        <motion.div
          className="mb-10 flex justify-center"
          variants={itemVariants}
        >
          <motion.img
            src="/trc3logo.png"
            alt="TRC Logo"
            className="w-[180px] md:w-[240px] h-auto object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Event Date with Yellow Accent */}
        <motion.div variants={itemVariants}>
          <p className="text-2xl md:text-4xl tracking-widest text-white/90 mb-10 uppercase">
            <span style={{ color: "#efb073" }}>16 - 17 MARCH</span>{" "}
            <span className="text-white">2026</span>
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="flex justify-center gap-2 mb-7 md:mb-14"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="countdown-item"
              custom={i}
              variants={countdownVariants}
              animate="visible"
              initial="hidden"
            >
              <div className="countdown-value text-xl md:text-5xl text-white font-bold">
                {String(item.value).padStart(2, "0")}
              </div>
              <p className="text-white/70 text-xs uppercase mt-1">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Partner Logos */}
        <motion.div
          className="md:flex md:justify-center md:gap-17 md:flex-wrap grid grid-cols-3 gap-2 place-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.map((event, i) => (
            <motion.a
              key={i}
              href={event.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`logo-link w-20 h-20 md:w-27 md:h-27 ${
                i === 0 ? "col-span-3 md:col-span-1 flex justify-center" : ""
              }`}
              style={{ "--logoColor": event.color }}
              custom={i}
              variants={logoVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
            >
              <img
                src={event.path}
                alt={`Event ${i + 1}`}
                className="filtered-logo w-full h-full"
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

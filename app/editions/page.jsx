"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRight,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const TimelineSection = ({ edition }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 3;
  const totalSlides = Math.ceil(edition.keyMoments.length / itemsPerView);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const startIndex = currentSlide * itemsPerView;
  const visibleMoments = edition.keyMoments.slice(
    startIndex,
    startIndex + itemsPerView
  );

  return (
    <motion.div className="mb-20">
      <h3 className="text-3xl font-light text-white mb-8 tracking-tight">
        Event Timeline
      </h3>

      <div className="relative">
        {/* Timeline Container */}
        <div className="relative pt-20 pb-8">
          {/* Horizontal Line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Timeline Items */}
          <div className="grid grid-cols-3 gap-8">
            {visibleMoments.map((moment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="relative text-center"
              >
                {/* Dot */}
                <div className="absolute left-1/2 top-0 w-4 h-4 bg-[#9d927d] rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-[#0f1419] shadow-lg shadow-[#9d927d]/50" />

                {/* Content */}
                <div className="pt-12">
                  <span className="text-xs font-light text-[#9d927d] uppercase tracking-widest block mb-4">
                    {moment.time}
                  </span>
                  <h4 className="text-white font-light mb-3 text-sm line-clamp-2">
                    {moment.event}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                    {moment.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between mt-8 px-4">
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-[#9d927d]/40 text-[#9d927d] hover:bg-[#9d927d]/10 hover:border-[#9d927d] transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </motion.button>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentSlide(i)}
                animate={{
                  width: i === currentSlide ? 24 : 8,
                  backgroundColor:
                    i === currentSlide ? "#9d927d" : "rgba(255, 255, 255, 0.1)",
                }}
                className="h-2 rounded-full transition-all duration-300"
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-[#9d927d]/40 text-[#9d927d] hover:bg-[#9d927d]/10 hover:border-[#9d927d] transition-all duration-300"
          >
            <ArrowRight size={20} />
          </motion.button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 font-light tracking-widest">
            {currentSlide + 1} / {totalSlides}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const editions = [
  {
    id: 1,
    year: "2024",
    title: "TRC 1.0",
    subtitle: "The Beginning",
    tagline: "Where innovation found its foundation",
    image: "/logos/logotrc11.png",
    theme: "HealthTech Harmony",
    location: "ISIMS, Sfax",
    date: "March 18-19, 2024",
    duration: "24 Hours",
    description:
      "The inaugural TRC hackathon marked the beginning of a movement to harness technology for sustainable development. With 120 passionate participants, we brought together students, professionals, and innovators to tackle real-world challenges aligned with the Sustainable Development Goals.",
    fullDescription: `The first TechResolve Challenge was held on March 18–19, 2024, at ISIMS in Sfax, with more than 120 participants.
This non-technical hackathon focused on IT solutions for health and well-being.

Participants attended workshops on artificial intelligence applied to healthcare and a general introduction to AI, led respectively by Mr. Med Taha Abidi and Ms. Salma Jamoussi. They also took part in a conference on modern healthcare challenges presented by Mr. Houssem Lahiani.`,
    stats: [
      {
        number: "120",
        label: "Participants",
        description: "From across Tunisia",
      },
      { number: "8", label: "Projects", description: "Innovative solutions" },
      { number: "3", label: "Awards", description: "Recognizing excellence" },
    ],
    highlights: [
      "24-Hour Hackathon",
      "AI Workshops",
      "HealthTech Focus",
      "Expert Mentoring",
      "Networking Events",
      "Award Ceremony",
    ],
    gallery: [
      { src: "/trc1gallery/trc1g (1).png" },
      { src: "/trc1gallery/trc1g (2).png" },
      { src: "/trc1gallery/trc1g (3).png" },
      { src: "/trc1gallery/trc1g (4).png" },
      { src: "/trc1gallery/trc1g (5).png" },
      { src: "/trc1gallery/trc1g (6).png" },
      { src: "/trc1gallery/trc1g (7).png" },
      { src: "/trc1gallery/trc1g (8).png" },
      { src: "/trc1gallery/trc1g (9).png" },
    ],

    winners: [
      {
        team: "MIMO",
        sb: "IEEE ENIS SB",
        prizes: "350DT",
      },
      {
        team: "OptimAIzation",
        sb: "IEEE ISIMS SB",
        prizes: "250DT",
      },
      {
        team: "The Three",
        sb: "IEEE FSS SB",
        prizes: "100DT",
      },
    ],
    keyMoments: [
      {
        time: "12:00 PM",
        event: "Check-in",
        description: "Participants arrive and register",
      },
      {
        time: "02:00 PM",
        event: "Opening Ceremony",
        description: "Kickoff and welcome speeches",
      },
      {
        time: "04:00 PM",
        event: "Workshops",
        description: "Hands-on learning sessions",
      },
      {
        time: "05:00 PM",
        event: "Card Games",
        description: "Fun team bonding activity",
      },
      {
        time: "06:30 PM",
        event: "Iftar",
        description: "Breaking fast together",
      },
      {
        time: "07:45 PM",
        event: "Screening: Fallujah",
        description: "Film session for all participants",
      },
      {
        time: "09:00 PM",
        event: "Musical Show",
        description: "Live entertainment performance",
      },
      {
        time: "10:00 PM",
        event: "Hackathon & Treasure Hunt",
        description: "Challenge begins with interactive hunt",
      },
      {
        time: "11:00 PM",
        event: "Truth or Dare Game",
        description: "Fun and interactive game",
      },
      {
        time: "12:00 AM",
        event: "Karaoke",
        description: "Sing your heart out",
      },
      {
        time: "04:00 AM Day 2",
        event: "Sohur",
        description: "Early morning meal",
      },
      {
        time: "07:00 AM Day 2",
        event: "Challenger Submission",
        description: "Teams submit their projects",
      },
      {
        time: "08:00 AM Day 2",
        event: "Pitching",
        description: "Teams present their ideas to judges",
      },
      {
        time: "11:00 AM Day 2",
        event: "Closing Ceremony & Winners",
        description: "Celebrating achievements and awarding winners",
      },
    ],
  },
  {
    id: 2,
    year: "2025",
    title: "TRC 2.0",
    subtitle: "Rising Higher",
    tagline: "Expanding horizons, amplifying impact",
    image: "/logos/logotrc21.png",
    theme: "Sustainable Cities & Communities",
    location: "ISIMS, Sfax",
    date: "March 24-25, 2025",
    duration: "24 Hours",
    description:
      "Building on the unprecedented success of TRC 1.0, the second edition pushed boundaries further. With 250 participants and expanded tracks, TRC 2.0 demonstrated that the movement had truly taken root.",
    fullDescription: `The second edition, held on March 24–25, 2025 at ISIMS, brought together 250 students and focused on using AI to tackle industrial and societal challenges.
Three pre-event bootcamps prepared the participants:

Application development using LLMs (Tarak Zlitni and Ali Wali)

Innovative solutions with AI and mobile technologies (Rim Walha)

Soft skills for the hackathon (Raouia Taktak)

During the event, the discussion panel explored the impact of AI on smart cities, workshops covered AI in biology (Ahmed Rebai) and open-source tools for AI (Taha Abidi).
The main challenge involved designing prototypes that integrate AI to solve real-world problems.`,
    stats: [
      {
        number: "250",
        label: "Participants",
        description: "From Tunisia & abroad",
      },
      {
        number: "25",
        label: "Projects",
        description: "Award-winning solutions",
      },
      { number: "5", label: "Awards", description: "Categories recognized" },
    ],
    highlights: [
      "24-Hour Hackathon",
      "3 AI Bootcamps",
      "Expert Panels",
      "International Judges",
      "Corporate Partnerships",
      "Networking Mixer",
    ],
    gallery: [
      { src: "/trc2gallery/trc2g (1).png" },
      { src: "/trc2gallery/trc2g (2).png" },
      { src: "/trc2gallery/trc2g (3).png" },
      { src: "/trc2gallery/trc2g (4).png" },
      { src: "/trc2gallery/trc2g (5).png" },
      { src: "/trc2gallery/trc2g (6).png" },
      { src: "/trc2gallery/trc2g (7).png" },
      { src: "/trc2gallery/trc2g (8).png" },
      { src: "/trc2gallery/trc2g (9).png" },
    ],
    winners: [
      {
        team: "Vision Transformers",
        sb: "IEEE ISIMS SB",
        prizes: "1000DT",
      },
      {
        team: "Borders <br> ",
        sb: "IEEE FSS SB",
        prizes: "500DT",
      },
      {
        team: "Chi5a ba5anou",
        sb: "IEEE FSS SB",
        prizes: "250DT",
      },
    ],

    keyMoments: [
      {
        time: "11:30 PM",
        event: "Check-In",
        description: "Participants arrive and register",
      },
      {
        time: "1:00 PM",
        event: "Opening Ceremony",
        description: "Welcome speeches and event kickoff",
      },
      {
        time: "3:00 PM",
        event: "Hackathon Kickoff & Panel",
        description: "Start of hackathon and expert discussion",
      },
      {
        time: "5:00 PM",
        event: "Networking",
        description: "Connect with participants and mentors",
      },
      {
        time: "6:30 PM",
        event: "Ramadan Iftar",
        description: "Evening meal to break the fast",
      },
      {
        time: "7:30 PM",
        event: "Talent Show & Coffee Break",
        description: "Performances, refreshments, and karaoke",
      },
      {
        time: "10:00 PM",
        event: "Workshops",
        description: "Hands-on learning sessions",
      },
      {
        time: "12:45 AM",
        event: "Midnight Surprise",
        description: "Special activity to energize participants",
      },
      {
        time: "1:45 AM DAY 2",
        event: "EEE Puzzlers & Ping Pong tournament",
        description: "Games and challenges to keep energy high",
      },
      {
        time: "4:15 AM DAY 2",
        event: "Sohour",
        description: "Early meal before morning activities",
      },
      {
        time: "8:00 AM DAY2",
        event: "Submission & Pitching",
        description: "Participants submit projects and pitch ideas",
      },
      {
        time: "11:00 AM DAY 2 ",
        event: "Closing Ceremony",
        description: "Event conclusion and winners announcement",
      },
    ],
  },
];

export default function EditionsPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeEditionId, setActiveEditionId] = useState(null);

  const handlePrevImage = () => {
    const gallery =
      editions.find((e) => e.id === activeEditionId)?.gallery || [];
    setCurrentImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    const gallery =
      editions.find((e) => e.id === activeEditionId)?.gallery || [];
    setCurrentImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Navbar />

      {/* Main Content */}
      <main className="relative w-full min-h-screen py-20 lg:py-32 px-6 sm:px-8 lg:px-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e]" />
        </div>

        <motion.div
          className="relative max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="mb-24">
            <div className="flex items-baseline gap-4 mb-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight">
                TRC Previous Editions
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-gradient-to-r from-[#9d927d] to-transparent hidden sm:block"
              />
            </div>
            <p className="text-gray-400 text-base sm:text-lg font-light max-w-2xl mt-6 leading-relaxed">
              Explore the complete history and details of each TRC hackathon
              edition.
            </p>
          </motion.div>

          {/* Editions Container */}
          <div className="space-y-32">
            {editions.map((edition, index) => (
              <motion.article
                key={edition.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Hero Section */}
                <div className="mb-20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                    {/* Content */}
                    <motion.div
                      className={`${index % 2 === 0 ? "" : "lg:order-2"}`}
                    >
                      <span className="inline-block text-xs font-light tracking-widest text-[#9d927d] uppercase mb-4">
                        Edition {edition.id}
                      </span>
                      <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight mb-4">
                        {edition.title}
                      </h2>
                      <p className="text-[#9d927d] text-xl font-light italic mb-6">
                        {edition.subtitle}
                      </p>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-px bg-[#9d927d] mb-8"
                      />
                      <p className="text-gray-300 font-light leading-relaxed text-lg mb-8">
                        {edition.tagline}
                      </p>

                      {/* Key Info Grid */}
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-2">
                            Date
                          </p>
                          <p className="text-white font-light">
                            {edition.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-2">
                            Duration
                          </p>
                          <p className="text-white font-light">
                            {edition.duration}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-2">
                            Location
                          </p>
                          <p className="text-white font-light">
                            {edition.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-2">
                            Theme
                          </p>
                          <p className="text-white font-light">
                            {edition.theme}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                      className={`${index % 2 === 0 ? "" : "lg:order-1"}`}
                      whileHover={{ y: -8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <div className="relative aspect-square bg-gradient-to-br from-[#1a1f3a] to-[#2d1b4e] rounded-lg overflow-hidden p-8 sm:p-12">
                        <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-[#9d927d] to-transparent" />
                        <div className="absolute top-0 left-0 h-px w-8 bg-gradient-to-r from-[#9d927d] to-transparent" />
                        <div className="absolute bottom-0 right-0 w-px h-8 bg-gradient-to-t from-[#9d927d] to-transparent" />
                        <div className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-[#9d927d] to-transparent" />

                        <div className="relative w-full h-full flex items-center justify-center">
                          <img
                            src={edition.image}
                            alt={edition.title}
                            className="w-full h-full object-contain filter drop-shadow-xl"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Stats Section */}
                <motion.div className="mb-20 py-12 border-y border-white/10">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {edition.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="text-4xl sm:text-5xl font-light text-white mb-2">
                          {stat.number}
                        </div>
                        <p className="text-xs uppercase tracking-widest text-[#9d927d] font-light mb-1">
                          {stat.label}
                        </p>
                        <p className="text-xs text-gray-400 font-light">
                          {stat.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Full Description */}
                <motion.div className="mb-20">
                  <h3 className="text-3xl font-light text-white mb-6 tracking-tight">
                    The Story
                  </h3>
                  <p className="text-gray-300 font-light leading-relaxed text-base whitespace-pre-line">
                    {edition.fullDescription}
                  </p>
                </motion.div>

                {/* Gallery Section */}
                <motion.div className="mb-20">
                  <h3 className="text-3xl font-light text-white mb-8 tracking-tight">
                    Photo Gallery
                  </h3>

                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {edition.gallery.map((image, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        onClick={() => {
                          setSelectedImage(image);
                          setCurrentImageIndex(i);
                          setActiveEditionId(edition.id);
                        }}
                        className="relative aspect-square bg-gradient-to-br from-[#1a1f3a] to-[#2d1b4e] rounded-lg overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={image.src}
                          alt="gallery"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-black/30 flex items-center justify-center"
                        >
                          <ZoomIn size={24} className="text-white" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Timeline Section */}
                <TimelineSection edition={edition} />

                {/* Winners Section */}
                <motion.div className="mb-20">
                  <h3 className="text-3xl font-light text-white mb-8 tracking-tight">
                    Award Winners
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    {edition.winners.map((winner, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {/* Placement indicator for top 3 */}
                        {i < 3 && (
                          <div className="flex items-center gap-2 mb-1 sm:hidden">
                            <div
                              className={`
              w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
              ${
                i === 0
                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                  : i === 1
                  ? "bg-gray-300/20 text-gray-200 border border-gray-300/30"
                  : "bg-amber-600/20 text-amber-300 border border-amber-600/30"
              }
            `}
                            >
                              #{i + 1}
                            </div>
                            <span className="text-xs uppercase tracking-wider text-gray-400">
                              {i === 0
                                ? "First Place"
                                : i === 1
                                ? "Second Place"
                                : "Third Place"}
                            </span>
                          </div>
                        )}

                        <div
                          className={`
          border border-white/10 rounded-xl p-5 sm:p-6 
          hover:border-[#9d927d]/50 transition-all duration-300 group
          ${
            i === 0
              ? "sm:border-yellow-500/30 sm:bg-gradient-to-r sm:from-yellow-500/5 sm:to-transparent"
              : ""
          }
          ${
            i === 1
              ? "sm:border-gray-400/30 sm:bg-gradient-to-r sm:from-gray-400/5 sm:to-transparent"
              : ""
          }
          ${
            i === 2
              ? "sm:border-amber-600/30 sm:bg-gradient-to-r sm:from-amber-600/5 sm:to-transparent"
              : ""
          }
        `}
                        >
                          {/* Placement badge - desktop */}
                          {i < 3 && (
                            <div className="hidden sm:flex items-center gap-3 mb-3">
                              <div
                                className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  i === 0
                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    : i === 1
                    ? "bg-gray-300/20 text-gray-200 border border-gray-300/30"
                    : "bg-amber-600/20 text-amber-300 border border-amber-600/30"
                }
              `}
                              >
                                #{i + 1}
                              </div>
                              <span
                                className={`
                text-xs uppercase tracking-wider font-medium
                ${
                  i === 0
                    ? "text-yellow-300"
                    : i === 1
                    ? "text-gray-200"
                    : "text-amber-300"
                }
              `}
                              >
                                {i === 0
                                  ? "First Place"
                                  : i === 1
                                  ? "Second Place"
                                  : "Third Place"}
                              </span>
                            </div>
                          )}

                          {/* Main content */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                            {/* Team - Full width on mobile */}
                            <div className="col-span-1 sm:col-span-1">
                              <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-1 sm:mb-2">
                                Team
                              </p>
                              <h4 className="text-lg sm:text-xl font-light text-white group-hover:text-[#9d927d] transition-colors break-words">
                                {winner.team}
                              </h4>
                            </div>

                            {/* IEEE SB - Grid with prize on mobile */}
                            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-0 col-span-1">
                              <div className="sm:hidden">
                                <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-1">
                                  Prize
                                </p>
                                <p className="text-white font-medium text-sm bg-white/5 inline-block px-3 py-1 rounded-full">
                                  {winner.prizes}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-1 sm:mb-2">
                                  IEEE SB
                                </p>
                                <p className="text-white font-light text-sm sm:text-base break-words">
                                  {winner.sb}
                                </p>
                              </div>
                            </div>

                            {/* Prize - Desktop only */}
                            <div className="hidden sm:block">
                              <p className="text-xs uppercase tracking-widest text-gray-500 font-light mb-2">
                                Prize
                              </p>
                              <p className="text-white font-light text-base">
                                {winner.prizes}
                              </p>
                            </div>
                          </div>

                          {/* Mobile decoration */}
                          {i === 0 && (
                            <div className="sm:hidden mt-3 h-px w-12 bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Divider between editions */}
                {index < editions.length - 1 && (
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-20 lg:my-32"
                  />
                )}
              </motion.article>
            ))}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={() => setSelectedImage(null)}
              >
                {/* Prevent click propagation */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl"
                >
                  {/* The Image */}
                  <img
                    src={
                      editions.find((e) => e.id === activeEditionId)?.gallery[
                        currentImageIndex
                      ]?.src
                    }
                    alt="Gallery"
                    className="w-full h-auto max-h-[80vh] object-contain rounded-md mx-auto"
                  />

                  {/* Close Button */}
                  <motion.button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-white p-2 hover:text-[#9d927d] transition-colors z-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={28} />
                  </motion.button>

                  {/* Left Arrow - PC */}
                  <motion.button
                    onClick={handlePrevImage}
                    className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center px-4 text-white hover:text-[#9d927d] transition-colors z-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft size={36} />
                  </motion.button>

                  {/* Right Arrow - PC */}
                  <motion.button
                    onClick={handleNextImage}
                    className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center px-4 text-white hover:text-[#9d927d] transition-colors z-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight size={36} />
                  </motion.button>

                  {/* Mobile Arrows */}
                  <div className="flex md:hidden justify-between mt-4">
                    <motion.button
                      onClick={handlePrevImage}
                      className="flex items-center justify-center px-4 py-2 border border-white/20 text-[#9d927d] hover:text-white hover:border-[#9d927d] rounded-sm transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft size={24} />
                    </motion.button>

                    <motion.button
                      onClick={handleNextImage}
                      className="flex items-center justify-center px-4 py-2 border border-white/20 text-[#9d927d] hover:text-white hover:border-[#9d927d] rounded-sm transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight size={24} />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Footer */}
          <motion.section
            variants={itemVariants}
            className="mt-20 pt-20 border-t border-white/10 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 tracking-tight">
              Ready for the Next Edition?
            </h2>
            <p className="text-gray-400 font-light mb-8 max-w-2xl mx-auto">
              Join us for more innovation, inspiration, and impact.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3 border border-[#9d927d] text-[#9d927d] hover:bg-[#9d927d]/5 transition-all duration-300 rounded-sm font-light text-sm"
            >
              <span
                onClick={() => router.push("/registration")}
                className="cursor-pointer hover:underline"
              >
                Register Now
              </span>
              <ChevronRight size={16} />
            </motion.button>
          </motion.section>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}

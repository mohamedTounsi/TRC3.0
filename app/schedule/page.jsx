"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRef, useEffect } from "react";

export default function ProgramPage() {
  const schedule = [
    { time: "1:30 pm", event: "Check-in", full: "1:30 pm – 3:00 pm" },
    { time: "3:00 pm", event: "Opening ceremony", full: "3:00 pm – 4:00 pm" },
    { time: "4:00 pm", event: "Panel discussion", full: "4:00 pm – 5:30 pm" },
    { time: "5:30 pm", event: "Hackathon launch", full: "5:30 pm – 6:30 pm" },
    { time: "6:30 pm", event: "Iftar", full: "6:30 pm – 7:30 pm" },
    {
      time: "8:00 pm",
      event: "Round tables & workshop",
      full: "8:00 pm – 9:30 pm",
    },
    {
      time: "9:30 pm",
      event: "Coffee + musical break",
      full: "9:30 pm – 10:00 pm",
    },
    { time: "10:00 pm", event: "TRC game night", full: "10:00 pm – 11:30 pm" },
    { time: "11:30 pm", event: "Coffee break", full: "11:30 pm – 12:00 am" },
    {
      time: "12:00 am",
      event: "Surprise activity",
      full: "12:00 am – 1:00 am",
    },
    {
      time: "1:00 am",
      event: "Entertainment activities",
      full: "1:00 am – 4:30 am",
    },
    { time: "4:30 am", event: "Suhoor", full: "4:30 am – 5:00 am" },
    {
      time: "5:30 am",
      event: "Final hackathon part",
      full: "5:30 am – 8:00 am",
    },
    {
      time: "8:00 am",
      event: "Project submissions",
      full: "8:00 am – 10:00 am",
    },
    {
      time: "10:00 am",
      event: "Pitching session",
      full: "10:00 am – 12:30 pm",
    },
    { time: "12:30 pm", event: "Jury discussion", full: "12:30 pm – 1:00 pm" },
    { time: "1:00 pm", event: "Closing ceremony", full: "1:00 pm – 2:00 pm" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pg-slot-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    const slots = document.querySelectorAll(".pg-slot");
    slots.forEach((slot) => observer.observe(slot));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        .pg-root {
          min-height: 100vh;
          background: #0a0d11;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Animated background grid */
        .pg-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(157,146,125,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(157,146,125,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 0;
          animation: gridPulse 8s ease infinite;
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Floating orbs */
        .pg-orb {
          position: fixed;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(157,146,125,0.1), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .pg-orb-1 {
          width: 400px;
          height: 400px;
          top: -100px;
          right: -100px;
          animation: float 20s ease-in-out infinite;
        }

        .pg-orb-2 {
          width: 300px;
          height: 300px;
          bottom: -50px;
          left: -50px;
          animation: float 15s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.05); }
        }

        .pg-content {
          flex: 1;
          position: relative;
          z-index: 2;
          padding: 120px 16px 80px;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }

        /* Header with glass effect */
        .pg-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }

        .pg-header-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(157,146,125,0.15), transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(40px);
          z-index: -1;
          animation: glowPulse 4s ease infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }

        .pg-eyebrow {
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(157,146,125,0.6);
          margin: 0 0 12px;
          position: relative;
          display: inline-block;
        }

        .pg-eyebrow::before,
        .pg-eyebrow::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 30px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(157,146,125,0.4), transparent);
        }

        .pg-eyebrow::before {
          right: calc(100% + 12px);
        }

        .pg-eyebrow::after {
          left: calc(100% + 12px);
        }

        .pg-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          font-weight: 300;
          color: #f0ece4;
          margin: 0;
          letter-spacing: 0.02em;
          line-height: 1.1;
          position: relative;
        }

        .pg-title em {
          font-style: italic;
          color: #c8bfb0;
          position: relative;
          display: inline-block;
        }

        .pg-title em::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(157,146,125,0.5), transparent);
        }

        .pg-desc {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.15em;
          line-height: 1.8;
          max-width: 400px;
          margin: 16px auto 0;
          text-transform: uppercase;
        }

        /* Timeline container */
        .pg-timeline-container {
          position: relative;
          margin: 40px 0 30px;
        }

        /* Central line - ALWAYS VISIBLE */
        .pg-timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, 
            transparent, 
            rgba(157,146,125,0.2) 10%, 
            rgba(157,146,125,0.4) 50%, 
            rgba(157,146,125,0.2) 90%, 
            transparent
          );
          transform: translateX(-50%);
          z-index: 1;
        }

        .pg-timeline-line::before {
          content: '';
          position: absolute;
          left: -2px;
          top: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(157,146,125,0.8);
          box-shadow: 0 0 20px rgba(157,146,125,0.8);
          animation: moveDot 20s linear infinite;
        }

        @keyframes moveDot {
          0% { top: 0; opacity: 1; }
          50% { top: 100%; opacity: 0.3; }
          51% { opacity: 0; }
          100% { opacity: 0; }
        }

        /* Timeline slots */
        .pg-slot {
          position: relative;
          z-index: 2;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pg-slot-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pg-slot-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          min-height: 70px;
        }

        .pg-slot-left {
          flex: 1;
          text-align: right;
          padding-right: 30px;
        }

        .pg-slot-right {
          flex: 1;
          padding-left: 30px;
        }

        .pg-slot-center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          z-index: 3;
        }

        /* Timeline nodes */
        .pg-node {
          width: 12px;
          height: 12px;
          background: transparent;
          border: 1.5px solid rgba(157,146,125,0.5);
          border-radius: 50%;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .pg-node::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1px solid rgba(157,146,125,0.2);
          animation: pulseNode 2s ease infinite;
        }

        .pg-node::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 3px;
          height: 3px;
          background: rgba(157,146,125,0.8);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .pg-slot:hover .pg-node {
          border-color: rgba(200,191,176,0.8);
          transform: scale(1.1);
        }

        .pg-slot:hover .pg-node::after {
          background: #c8bfb0;
          box-shadow: 0 0 15px rgba(200,191,176,0.5);
        }

        @keyframes pulseNode {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }

        /* Time card */
        .pg-time-card {
          background: rgba(10, 13, 17, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(157,146,125,0.15);
          padding: 10px 16px;
          display: inline-block;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .pg-time-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, rgba(157,146,125,0.5), transparent);
        }

        .pg-time {
          font-size: 14px;
          font-weight: 400;
          color: #c8bfb0;
          letter-spacing: 0.1em;
          font-family: 'DM Mono', monospace;
          position: relative;
          white-space: nowrap;
        }

        .pg-time-full {
          font-size: 8px;
          color: rgba(157,146,125,0.5);
          margin-top: 2px;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        /* Event card */
        .pg-event-card {
          background: rgba(157,146,125,0.03);
          border: 1px solid rgba(157,146,125,0.1);
          padding: 12px 18px;
          border-radius: 2px;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .pg-event-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at top right, rgba(157,146,125,0.1), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pg-slot:hover .pg-event-card {
          border-color: rgba(157,146,125,0.25);
          background: rgba(157,146,125,0.05);
        }

        .pg-slot:hover .pg-event-card::before {
          opacity: 1;
        }

        .pg-event {
          font-size: 14px;
          color: #f0ece4;
          letter-spacing: 0.02em;
          font-weight: 300;
          font-family: 'Cormorant Garamond', serif;
          line-height: 1.3;
          white-space: nowrap;
        }

        .pg-event-desc {
          font-size: 8px;
          color: rgba(157,146,125,0.5);
          margin-top: 2px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* Stats / milestone */
        .pg-milestone {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin: 50px 0 30px;
          padding: 20px;
          background: rgba(157,146,125,0.02);
          border: 1px solid rgba(157,146,125,0.1);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .pg-milestone::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(157,146,125,0.3), transparent);
        }

        .pg-milestone-item {
          text-align: center;
        }

        .pg-milestone-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          color: #c8bfb0;
          line-height: 1;
          margin-bottom: 4px;
        }

        .pg-milestone-label {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(157,146,125,0.5);
          text-transform: uppercase;
        }

        /* Action buttons */
        .pg-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 40px;
          position: relative;
        }

        .pg-btn {
          padding: 12px 30px;
          border-radius: 2px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
          border: none;
          background: transparent;
        }

        .pg-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(157,146,125,0.1), transparent);
          transition: left 0.5s ease;
        }

        .pg-btn:hover::before {
          left: 100%;
        }

        .pg-btn-primary {
          border: 1px solid rgba(157,146,125,0.4);
          color: #c8bfb0;
        }

        .pg-btn-primary:hover {
          border-color: rgba(157,146,125,0.7);
          background: rgba(157,146,125,0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -10px rgba(157,146,125,0.3);
        }

        .pg-btn-ghost {
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.3);
        }

        .pg-btn-ghost:hover {
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.4);
          transform: translateY(-2px);
        }

        /* Mobile - EXACT SAME STRUCTURE */
        @media (max-width: 768px) {
          .pg-content {
            padding: 100px 8px 60px;
          }

          .pg-timeline-line {
            display: block !important;
            left: 50%;
          }

          .pg-slot-wrapper {
            flex-direction: row;
            gap: 4px;
            min-height: 60px;
          }

          .pg-slot-left {
            flex: 1;
            text-align: right;
            padding-right: 20px;
          }

          .pg-slot-right {
            flex: 1;
            padding-left: 20px;
          }

          .pg-slot-center {
            display: block;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .pg-time-card {
            padding: 6px 8px;
            background: rgba(10, 13, 17, 0.8);
            backdrop-filter: blur(5px);
            max-width: 100%;
          }

          .pg-time {
            font-size: 11px;
            white-space: normal;
            word-break: keep-all;
          }

          .pg-time-full {
            font-size: 7px;
            white-space: normal;
          }

          .pg-event-card {
            padding: 6px 8px;
            background: rgba(157,146,125,0.05);
            max-width: 100%;
          }

          .pg-event {
            font-size: 11px;
            white-space: normal;
            word-break: keep-all;
          }

          .pg-event-desc {
            font-size: 7px;
            white-space: normal;
          }

          .pg-node {
            width: 8px;
            height: 8px;
            border-width: 1px;
          }

          .pg-node::before {
            inset: -2px;
          }

          .pg-node::after {
            width: 2px;
            height: 2px;
          }

          .pg-eyebrow::before,
          .pg-eyebrow::after {
            display: none;
          }

          .pg-title {
            font-size: 40px;
          }

          .pg-milestone {
            gap: 20px;
            padding: 12px;
          }

          .pg-milestone-number {
            font-size: 28px;
          }

          .pg-actions {
            flex-direction: column;
            gap: 8px;
          }

          .pg-btn {
            width: 100%;
            padding: 10px 16px;
            font-size: 9px;
          }
        }

        /* Small phones */
        @media (max-width: 480px) {
          .pg-title {
            font-size: 32px;
          }

          .pg-slot-wrapper {
            gap: 2px;
          }

          .pg-slot-left {
            padding-right: 16px;
          }

          .pg-slot-right {
            padding-left: 16px;
          }

          .pg-time {
            font-size: 10px;
          }

          .pg-event {
            font-size: 10px;
          }

          .pg-time-full {
            font-size: 6px;
          }

          .pg-event-desc {
            font-size: 6px;
          }
        }
      `}</style>

      <div className="pg-root">
        <div className="pg-grid" />
        <div className="pg-orb pg-orb-1" />
        <div className="pg-orb pg-orb-2" />

        <Navbar />

        <div className="pg-content">
          <div className="pg-header">
            <div className="pg-header-glow" />
            <p className="pg-eyebrow">The Timeline</p>
            <h1 className="pg-title">
              <em>Journey</em> Through
              <br />
              The Night
            </h1>
            <p className="pg-desc">24 hours · 17 moments · 1 experience</p>
          </div>

          <div className="pg-timeline-container">
            <div className="pg-timeline-line" />

            {schedule.map((item, idx) => (
              <div key={idx} className="pg-slot">
                <div className="pg-slot-wrapper">
                  <div className="pg-slot-left">
                    {idx % 2 === 0 ? (
                      <div className="pg-time-card">
                        <div className="pg-time">{item.time}</div>
                        <div className="pg-time-full">{item.full}</div>
                      </div>
                    ) : (
                      <div className="pg-event-card">
                        <div className="pg-event">{item.event}</div>
                        <div className="pg-event-desc">Moment {idx + 1}</div>
                      </div>
                    )}
                  </div>

                  <div className="pg-slot-center">
                    <div className="pg-node" />
                  </div>

                  <div className="pg-slot-right">
                    {idx % 2 === 0 ? (
                      <div className="pg-event-card">
                        <div className="pg-event">{item.event}</div>
                        <div className="pg-event-desc">Moment {idx + 1}</div>
                      </div>
                    ) : (
                      <div className="pg-time-card">
                        <div className="pg-time">{item.time}</div>
                        <div className="pg-time-full">{item.full}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pg-milestone">
            <div className="pg-milestone-item">
              <div className="pg-milestone-number">17</div>
              <div className="pg-milestone-label">Unique Moments</div>
            </div>
            <div className="pg-milestone-item">
              <div className="pg-milestone-number">24h</div>
              <div className="pg-milestone-label">Non-Stop</div>
            </div>
            <div className="pg-milestone-item">
              <div className="pg-milestone-number">∞</div>
              <div className="pg-milestone-label">Memories</div>
            </div>
          </div>

          <div className="pg-actions">
            <Link href="/registration" className="pg-btn pg-btn-primary">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Secure Your Spot
            </Link>
            <Link href="/" className="pg-btn pg-btn-ghost">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Return Home
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

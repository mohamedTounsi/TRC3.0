"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ThankYouPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        .ty-root {
          min-height: 100vh;
          background: #0a0d11;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .ty-root::before {
          content: '';
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(157,146,125,0.05) 0%, transparent 65%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          pointer-events: none;
        }

        .ty-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 112px 24px 64px;
          position: relative;
          z-index: 1;
        }

        .ty-card {
          width: 100%;
          max-width: 480px;
          text-align: center;
        }

        /* ── Icon ring ── */
        .ty-icon-wrap {
          width: 80px;
          height: 80px;
          margin: 0 auto 32px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ty-icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(157,146,125,0.25);
          animation: ringPulse 3s ease-in-out infinite;
        }

        .ty-icon-ring-2 {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1px solid rgba(157,146,125,0.1);
          animation: ringPulse 3s ease-in-out infinite 0.5s;
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        .ty-icon-inner {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(157,146,125,0.06);
          border: 1px solid rgba(157,146,125,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        /* ── Text ── */
        .ty-eyebrow {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(157,146,125,0.5);
          margin: 0 0 12px;
        }

        .ty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 46px;
          font-weight: 300;
          color: #f0ece4;
          margin: 0 0 6px;
          letter-spacing: 0.02em;
          line-height: 1.1;
        }

        .ty-title em {
          font-style: italic;
          color: #c8bfb0;
        }

        .ty-desc {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.08em;
          line-height: 1.8;
          margin: 16px 0 0;
        }

        /* ── Divider ── */
        .ty-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(157,146,125,0.2), transparent);
          margin: 36px 0;
        }

        /* ── Buttons ── */
        .ty-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .ty-btn {
          padding: 14px 20px;
          border-radius: 2px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .ty-btn-primary {
          background: transparent;
          border: 1px solid rgba(157,146,125,0.4);
          color: #c8bfb0;
        }

        .ty-btn-primary:hover {
          border-color: rgba(157,146,125,0.75);
          background: rgba(157,146,125,0.06);
          color: #d8d0c4;
        }

        .ty-btn-ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.25);
        }

        .ty-btn-ghost:hover {
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.45);
        }

        /* ── Confirm box ── */
        .ty-confirm-box {
          background: rgba(157,146,125,0.04);
          border: 1px solid rgba(157,146,125,0.12);
          border-radius: 2px;
          padding: 16px 20px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ty-confirm-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(157,146,125,0.5);
          flex-shrink: 0;
        }

        .ty-confirm-text {
          font-size: 10px;
          color: rgba(157,146,125,0.5);
          letter-spacing: 0.1em;
          line-height: 1.6;
          text-align: left;
        }

        /* Entry animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ty-card {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>

      <div className="ty-root">
        <Navbar />

        <div className="ty-content">
          <div className="ty-card">
            {/* Icon */}
            <div className="ty-icon-wrap">
              <div className="ty-icon-ring" />
              <div className="ty-icon-ring-2" />
              <div className="ty-icon-inner">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(157,146,125,0.8)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            {/* Text */}
            <p className="ty-eyebrow">Registration Complete</p>
            <h1 className="ty-title">
              Thank <em>You</em>
            </h1>
            <p className="ty-desc">
              Your registration has been received and is being processed.
              <br />
              We will be in touch with further details shortly.
            </p>

            {/* Confirmation note */}
            <div className="ty-confirm-box">
              <div className="ty-confirm-dot" />
              <p className="ty-confirm-text">
                Please keep an eye on your inbox — a confirmation may be sent to
                the email address you provided.
              </p>
            </div>

            <div className="ty-divider" />

            {/* Actions */}
            <div className="ty-actions">
              <Link href="/registration" className="ty-btn ty-btn-primary">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Submission
              </Link>
              <Link href="/" className="ty-btn ty-btn-ghost">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Phone,
  Users,
  Loader2,
  ChevronDown,
  Award,
  BookOpen,
  Hash,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    isIEEEMember: null,
    ieeeSB: "",
    ieeeId: "",
    universityName: "",
    isChallenger: null,
    teamName: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setForm({ ...form, [name]: value === "true" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        router.push("/thank-you");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        .reg-root {
          min-height: 100vh;
          background: #0a0d11;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated background */
        .reg-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(239,176,115,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239,176,115,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
          animation: gridPulse 8s ease infinite;
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Floating orbs */
        .reg-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .reg-orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle at 30% 30%, rgba(239,176,115,0.05), transparent 70%);
          top: -200px;
          right: -200px;
          animation: float 25s ease-in-out infinite;
        }

        .reg-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle at 70% 70%, rgba(157,146,125,0.05), transparent 70%);
          bottom: -150px;
          left: -150px;
          animation: float 20s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -40px) scale(1.05); }
        }

        .reg-content {
          padding: 120px 24px 80px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .reg-card {
          width: 100%;
          max-width: 600px;
          position: relative;
        }

        /* Decorative elements */
        .reg-card::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle at 30% 30%, rgba(239,176,115,0.03), transparent 70%);
          filter: blur(30px);
          z-index: -1;
          animation: glowPulse 6s ease infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Logo Banner - Enhanced */
        .logo-banner {
          width: 100%;
          height: 240px;
          border: 1px solid rgba(239,176,115,0.2);
          border-bottom: none;
          border-radius: 12px 12px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(239,176,115,0.05) 0%, transparent 100%);
        }

        .logo-banner-bg {
          position: absolute;
          inset: 0;
          background-image: url('/whatis3.png');
          background-size: cover;
          background-position: center;
          filter: blur(2px) brightness(0.8);
          transform: scale(1.1);
          transition: transform 10s ease;
          animation: slowZoom 30s ease infinite alternate;
        }

        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }

        .logo-banner-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(10,13,17,0.8) 100%);
        }

        .logo-banner-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        .logo-placeholder {
          width: 200px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          filter: drop-shadow(0 8px 30px rgba(0,0,0,0.6));
          position: relative;
        }

        .logo-placeholder::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(239,176,115,0.2), transparent 70%);
          opacity: 0.5;
          animation: logoGlow 4s ease infinite;
        }

        @keyframes logoGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .logo-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: relative;
          z-index: 1;
        }

        .banner-tag {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(239,176,115,0.6);
          background: rgba(10,13,17,0.6);
          backdrop-filter: blur(10px);
          padding: 8px 20px;
          border-radius: 30px;
          border: 1px solid rgba(239,176,115,0.2);
        }

        /* Form Panel - Enhanced */
        .form-panel {
          background: rgba(20, 25, 30, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(239,176,115,0.15);
          border-radius: 0 0 12px 12px;
          padding: 48px 48px 52px;
          position: relative;
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.8);
        }

        .form-panel::after {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239,176,115,0.4), transparent);
        }

        .form-header {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 300;
          color: #f0ece4;
          margin: 0 0 8px;
          letter-spacing: 0.02em;
          line-height: 1.1;
        }

        .form-title span {
          color: #efb073;
          font-style: italic;
        }

        .form-subtitle {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .form-subtitle-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239,176,115,0.3), transparent);
        }

        /* Section styling */
        .form-section {
          margin-bottom: 32px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .section-icon {
          width: 28px;
          height: 28px;
          border: 1px solid rgba(239,176,115,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #efb073;
        }

        .section-title {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(239,176,115,0.7);
          font-weight: 400;
        }

        .section-divider {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(239,176,115,0.2), transparent);
        }

        /* Inputs - Enhanced */
        .input-grid {
          display: grid;
          gap: 12px;
        }

        .input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(239,176,115,0.15);
          border-radius: 6px;
          padding: 0 16px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
          .closed-btn {
  background: rgba(120,120,120,0.1) !important;
  border: 1px solid rgba(150,150,150,0.4) !important;
  color: rgba(200,200,200,0.6) !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
}

.closed-btn:hover {
  transform: none !important;
  background: rgba(120,120,120,0.1) !important;
  border-color: rgba(150,150,150,0.4) !important;
}

.closed-btn::before {
  display: none;
}

        .input-wrap::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(239,176,115,0.05), transparent);
          transition: left 0.5s ease;
        }

        .input-wrap:focus-within {
          border-color: rgba(239,176,115,0.5);
          background: rgba(239,176,115,0.03);
          box-shadow: 0 0 0 2px rgba(239,176,115,0.1);
        }

        .input-wrap:focus-within::before {
          left: 100%;
        }

        .input-icon {
          color: rgba(239,176,115,0.5);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .input-wrap:focus-within .input-icon {
          color: #efb073;
          transform: scale(1.1);
        }

        .input-wrap input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f0ece4;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.04em;
          padding: 16px 0;
        }

        .input-wrap input::placeholder {
          color: rgba(255,255,255,0.2);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Radio Toggle - Enhanced */
        .radio-question {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .radio-question-dot {
          width: 4px;
          height: 4px;
          background: #efb073;
          border-radius: 50%;
        }

        .radio-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .radio-option {
          position: relative;
          cursor: pointer;
        }

        .radio-option input[type="radio"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .radio-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          border: 1px solid rgba(239,176,115,0.15);
          border-radius: 6px;
          color: rgba(255,255,255,0.4);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }

        .radio-label::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(239,176,115,0.2), transparent);
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
        }

        .radio-label:hover {
          border-color: rgba(239,176,115,0.4);
          color: rgba(255,255,255,0.7);
        }

        .radio-option input[type="radio"]:checked + .radio-label {
          border-color: #efb073;
          background: rgba(239,176,115,0.1);
          color: #efb073;
          box-shadow: 0 0 20px rgba(239,176,115,0.2);
        }

        .radio-option input[type="radio"]:checked + .radio-label::before {
          width: 200px;
          height: 200px;
        }

        .radio-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          position: relative;
          z-index: 1;
        }

        /* Animated section */
        .animated-section {
          overflow: hidden;
        }

        .nested-input {
          margin-top: 8px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Divider */
        .form-divider {
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(239,176,115,0.2), 
            rgba(239,176,115,0.3), 
            rgba(239,176,115,0.2), 
            transparent
          );
          margin: 32px 0;
        }

        /* Submit Button - Enhanced */
        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, rgba(239,176,115,0.1), rgba(239,176,115,0.02));
          border: 1px solid rgba(239,176,115,0.4);
          border-radius: 6px;
          color: #efb073;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(239,176,115,0.2), transparent);
          transition: left 0.6s ease;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover {
          border-color: #efb073;
          background: rgba(239,176,115,0.1);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -10px rgba(239,176,115,0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        /* Loading spinner */
        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .form-panel {
            padding: 32px 24px;
          }

          .logo-banner {
            height: 180px;
          }

          .logo-placeholder {
            width: 150px;
            height: 70px;
          }

          .form-title {
            font-size: 32px;
          }

          .radio-group {
            gap: 8px;
          }

          .radio-label {
            padding: 12px;
            font-size: 10px;
          }
        }

        @media (max-width: 480px) {
          .reg-content {
            padding: 100px 16px 60px;
          }

          .form-panel {
            padding: 24px 16px;
          }

          .input-wrap {
            padding: 0 12px;
          }

          .input-wrap input {
            font-size: 12px;
            padding: 14px 0;
          }

          .section-header {
            margin-bottom: 16px;
          }
        }
      `}</style>

      <main className="reg-root">
        <div className="reg-grid" />
        <div className="reg-orb reg-orb-1" />
        <div className="reg-orb reg-orb-2" />

        <Navbar />

        <div className="reg-content">
          <div className="reg-card">
            {/* Logo Banner */}
            <div className="logo-banner">
              <div className="logo-banner-bg" />
              <div className="logo-banner-overlay" />
              <div className="logo-banner-inner">
                <div className="logo-placeholder">
                  <img src="/trc3logo.png" alt="TRC Logo" />
                </div>
                <div className="banner-tag">Register Now</div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="form-panel">
              <div className="form-header">
                <h1 className="form-title">
                  Secure Your <span>Spot</span>
                </h1>
                <div className="form-subtitle">
                  <span className="form-subtitle-line" />
                  Join the Experience
                  <span className="form-subtitle-line" />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <User size={14} />
                    </div>
                    <span className="section-title">Personal Information</span>
                    <div className="section-divider" />
                  </div>

                  <div className="input-grid">
                    <div className="input-wrap">
                      <User size={16} className="input-icon" />
                      <input
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="input-wrap">
                      <Mail size={16} className="input-icon" />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="input-wrap">
                      <Phone size={16} className="input-icon" />
                      <input
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-divider" />

                {/* IEEE Membership Section */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <Award size={14} />
                    </div>
                    <span className="section-title">IEEE Membership</span>
                    <div className="section-divider" />
                  </div>

                  <div className="radio-question">
                    <span className="radio-question-dot" />
                    Are you an IEEE Member?
                  </div>

                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="isIEEEMember"
                        value="true"
                        checked={form.isIEEEMember === true}
                        onChange={handleChange}
                        required
                      />
                      <span className="radio-label">
                        <span className="radio-dot" />
                        Yes
                      </span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="isIEEEMember"
                        value="false"
                        checked={form.isIEEEMember === false}
                        onChange={handleChange}
                        required
                      />
                      <span className="radio-label">
                        <span className="radio-dot" />
                        No
                      </span>
                    </label>
                  </div>

                  <AnimatePresence>
                    {form.isIEEEMember === true && (
                      <motion.div
                        key="ieee-yes"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="animated-section"
                      >
                        <div className="input-wrap nested-input">
                          <BookOpen size={16} className="input-icon" />
                          <input
                            name="ieeeSB"
                            placeholder="IEEE Student Branch"
                            value={form.ieeeSB}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div
                          className="input-wrap"
                          style={{ marginTop: "8px" }}
                        >
                          <Hash size={16} className="input-icon" />
                          <input
                            name="ieeeId"
                            placeholder="IEEE Member ID"
                            value={form.ieeeId}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {form.isIEEEMember === false && (
                      <motion.div
                        key="ieee-no"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="animated-section"
                      >
                        <div className="input-wrap nested-input">
                          <BookOpen size={16} className="input-icon" />
                          <input
                            name="universityName"
                            placeholder="University Name"
                            value={form.universityName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="form-divider" />

                {/* Participation Section */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <Users size={14} />
                    </div>
                    <span className="section-title">Participation</span>
                    <div className="section-divider" />
                  </div>

                  <div className="radio-question">
                    <span className="radio-question-dot" />
                    Are you a Challenger?
                  </div>

                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="isChallenger"
                        value="true"
                        checked={form.isChallenger === true}
                        onChange={handleChange}
                        required
                      />
                      <span className="radio-label">
                        <span className="radio-dot" />
                        Yes
                      </span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="isChallenger"
                        value="false"
                        checked={form.isChallenger === false}
                        onChange={handleChange}
                        required
                      />
                      <span className="radio-label">
                        <span className="radio-dot" />
                        No
                      </span>
                    </label>
                  </div>

                  <AnimatePresence>
                    {form.isChallenger === true && (
                      <motion.div
                        key="challenger-yes"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="animated-section"
                      >
                        <div className="input-wrap nested-input">
                          <Users size={16} className="input-icon" />
                          <input
                            name="teamName"
                            placeholder="Team Name"
                            value={form.teamName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                {/* Submit Button */}
                <button
                  type="button"
                  disabled
                  className="submit-btn closed-btn"
                >
                  Registration Closed
                </button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

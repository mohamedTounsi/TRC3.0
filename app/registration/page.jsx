"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, Phone, Users, Loader2, ChevronDown } from "lucide-react";
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
          overflow: hidden;
        }

        .reg-root::before {
          content: '';
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239,176,115,0.04) 0%, transparent 65%);
          top: -200px;
          right: -200px;
          pointer-events: none;
        }

        .reg-root::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(157,146,125,0.03) 0%, transparent 65%);
          bottom: -100px;
          left: -100px;
          pointer-events: none;
        }

        .reg-content {
          padding: 112px 24px 64px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .reg-card {
          width: 100%;
          max-width: 560px;
        }

        /* ── Logo Banner ── */
        .logo-banner {
          width: 100%;
          height: 200px;
          border: 1px solid rgba(239,176,115,0.15);
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .logo-banner-bg {
          position: absolute;
          inset: 0;
          background-image: url('/whatis1.jpg');
          background-size: cover;
          background-position: center;
          filter: blur(1px) brightness(0.95);
          transform: scale(1.08);
        }

        .logo-banner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .logo-banner-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .logo-placeholder {
          width: 180px;
          height: 88px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          filter: drop-shadow(0 4px 20px rgba(0,0,0,0.5));
        }

        .logo-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* ── Form Panel ── */
        .form-panel {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(239,176,115,0.15);
          border-radius: 0 0 4px 4px;
          padding: 40px 40px 44px;
          position: relative;
        }

        .form-panel::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239,176,115,0.3), transparent);
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 300;
          color: #f0ece4;
          margin: 0 0 4px;
          letter-spacing: 0.04em;
          text-align: center;
        }

        .form-subtitle {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          text-align: center;
          margin: 0 0 36px;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239,176,115,0.15), transparent);
          margin: 28px 0;
        }

        .section-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(239,176,115,0.5);
          margin: 0 0 16px;
        }

        /* ── Inputs ── */
        .input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(239,176,115,0.12);
          border-radius: 2px;
          padding: 0 16px;
          transition: border-color 0.2s;
          margin-bottom: 14px;
        }

        .input-wrap:focus-within {
          border-color: rgba(239,176,115,0.4);
          background: rgba(255,255,255,0.04);
        }

        .input-icon {
          color: rgba(239,176,115,0.4);
          flex-shrink: 0;
        }

        .input-wrap input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f0ece4;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          padding: 14px 0;
        }

        .input-wrap input::placeholder {
          color: rgba(255,255,255,0.18);
          font-size: 11px;
          letter-spacing: 0.1em;
        }

        /* ── Radio Toggle ── */
        .radio-question {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          margin: 0 0 12px;
        }

        .radio-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 14px;
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
          gap: 8px;
          padding: 12px;
          border: 1px solid rgba(239,176,115,0.12);
          border-radius: 2px;
          color: rgba(255,255,255,0.3);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.02);
          user-select: none;
        }

        .radio-label:hover {
          border-color: rgba(239,176,115,0.3);
          color: rgba(255,255,255,0.6);
        }

        .radio-option input[type="radio"]:checked + .radio-label {
          border-color: rgba(239,176,115,0.55);
          background: rgba(239,176,115,0.07);
          color: #efb073;
        }

        .radio-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.6;
        }

        /* ── Animated section ── */
        .animated-section {
          overflow: hidden;
        }

        /* ── Submit ── */
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: transparent;
          border: 1px solid rgba(239,176,115,0.5);
          border-radius: 2px;
          color: #efb073;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 28px;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(239,176,115,0.08), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .submit-btn:hover::before {
          opacity: 1;
        }

        .submit-btn:hover {
          border-color: #efb073;
          box-shadow: 0 0 24px rgba(239,176,115,0.1);
        }

        .submit-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>

      <main className="reg-root">
        <Navbar />

        <div className="reg-content">
          <div className="reg-card">
            {/* Logo Banner */}
            <div className="logo-banner">
              <div className="logo-banner-bg" />
              <div className="logo-banner-overlay" />
              <div className="logo-banner-inner">
                <div className="logo-placeholder">
                  <img src="/trc3logo.png" alt="Logo" />
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="form-panel">
              <h1 className="form-title">Event Registration</h1>
              <p className="form-subtitle">Complete all fields to register</p>

              <form onSubmit={handleSubmit}>
                {/* Personal Info */}
                <p className="section-label">Personal Information</p>

                <div className="input-wrap">
                  <User size={15} className="input-icon" />
                  <input
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-wrap">
                  <Mail size={15} className="input-icon" />
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
                  <Phone size={15} className="input-icon" />
                  <input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="divider" />

                {/* IEEE */}
                <p className="section-label">Membership</p>
                <p className="radio-question">Are you an IEEE Member?</p>
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="animated-section"
                    >
                      <div className="input-wrap" style={{ marginTop: "4px" }}>
                        <Users size={15} className="input-icon" />
                        <input
                          name="ieeeSB"
                          placeholder="IEEE Student Branch"
                          value={form.ieeeSB}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="input-wrap">
                        <input
                          name="ieeeId"
                          placeholder="IEEE Member ID"
                          value={form.ieeeId}
                          onChange={handleChange}
                          required
                          style={{ paddingLeft: "0" }}
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="animated-section"
                    >
                      <div className="input-wrap" style={{ marginTop: "4px" }}>
                        <input
                          name="universityName"
                          placeholder="University Name"
                          value={form.universityName}
                          onChange={handleChange}
                          required
                          style={{ paddingLeft: "0" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="divider" />

                {/* Challenger */}
                <p className="section-label">Participation</p>
                <p className="radio-question">Are you a Challenger?</p>
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="animated-section"
                    >
                      <div className="input-wrap" style={{ marginTop: "4px" }}>
                        <Users size={15} className="input-icon" />
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

                {/* Submit */}
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        style={{ animation: "spin 1s linear infinite" }}
                      />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

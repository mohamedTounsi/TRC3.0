"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import {
  Loader2,
  LogOut,
  Users,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Trash2,
  Download,
  Filter,
  User,
  Users2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function DashboardPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all', 'challenger', 'visitor'
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' (newest first) or 'asc' (oldest first)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const session = sessionStorage.getItem("dashboard_auth");
    if (session === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
      sessionStorage.setItem("dashboard_auth", "true");
      setAuthenticated(true);
      toast.success("Welcome back!");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dashboard_auth");
    setAuthenticated(false);
    setRegistrations([]);
    setPasswordInput("");
    toast.success("Logged out successfully");
  };

  const togglePaid = async (id) => {
    try {
      const res = await fetch(`/api/registration/${id}`, {
        method: "PATCH",
        headers: {
          "x-dashboard-password": process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD,
        },
      });

      if (!res.ok) throw new Error("Failed");

      const updated = await res.json();
      toast.success("Payment status updated ✓");

      setRegistrations((prev) =>
        prev.map((reg) => (reg._id === id ? updated.data : reg))
      );
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const deleteUser = async () => {
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    try {
      const res = await fetch(`/api/registration/${id}`, {
        method: "DELETE",
        headers: {
          "x-dashboard-password": process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD,
        },
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Registration deleted");
      setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const exportToCSV = async () => {
    setExportLoading(true);
    try {
      const response = await fetch(`/api/export?type=${filterType}`, {
        headers: {
          "x-dashboard-password": process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD,
        },
      });

      if (!response.ok) throw new Error("Export failed");

      const contentDisposition = response.headers.get("Content-Disposition");
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : `registrations-${filterType}-${
            new Date().toISOString().split("T")[0]
          }.csv`;

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success(`Exported ${filterType} registrations successfully!`);
    } catch (err) {
      toast.error("Failed to export data");
      console.error(err);
    } finally {
      setExportLoading(false);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  useEffect(() => {
    if (!authenticated) return;

    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/registration", {
          headers: {
            "x-dashboard-password": process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD,
          },
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setRegistrations(data.registrations);
      } catch (err) {
        toast.error("Failed to fetch registrations");
      }
      setLoading(false);
    };

    fetchRegistrations();
  }, [authenticated]);

  // Apply filters and sorting
  const processedRegistrations = registrations
    // First filter by type
    .filter((reg) => {
      if (filterType === "challenger") return reg.isChallenger === true;
      if (filterType === "visitor") return reg.isChallenger === false;
      return true;
    })
    // Then filter by search
    .filter((reg) =>
      `${reg.fullName} ${reg.email} ${reg.phoneNumber} ${reg.universityName} ${reg.teamName} ${reg.ieeeSB} ${reg.ieeeId}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    // Then sort by createdAt
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const paidCount = processedRegistrations.filter((r) => r.paid).length;
  const unpaidCount = processedRegistrations.length - paidCount;
  const challengerCount = processedRegistrations.filter(
    (r) => r.isChallenger
  ).length;
  const visitorCount = processedRegistrations.filter(
    (r) => !r.isChallenger
  ).length;

  const getSortIcon = () => {
    if (sortOrder === "desc") {
      return <ArrowDown size={14} />;
    } else {
      return <ArrowUp size={14} />;
    }
  };

  const getSortText = () => {
    return sortOrder === "desc" ? "Newest First" : "Oldest First";
  };

  if (!authenticated) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

          .login-root {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0d11;
            padding: 24px;
            font-family: 'DM Mono', monospace;
            position: relative;
            overflow: hidden;
          }

          .login-root::before {
            content: '';
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(239,176,115,0.06) 0%, transparent 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }

          .login-card {
            width: 100%;
            max-width: 400px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(239,176,115,0.15);
            border-radius: 4px;
            padding: 48px 40px;
            backdrop-filter: blur(20px);
            position: relative;
          }

          @media (max-width: 480px) {
            .login-card {
              padding: 36px 24px;
            }
          }

          .login-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(239,176,115,0.5), transparent);
          }

          .login-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(239,176,115,0.3);
            border-radius: 4px;
            color: #efb073;
          }

          .login-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 28px;
            font-weight: 300;
            color: #f0ece4;
            text-align: center;
            margin: 0 0 8px;
            letter-spacing: 0.05em;
          }

          .login-sub {
            font-size: 11px;
            color: rgba(255,255,255,0.3);
            text-align: center;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin: 0 0 36px;
          }

          .login-input {
            width: 100%;
            padding: 14px 16px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(239,176,115,0.15);
            border-radius: 2px;
            color: #f0ece4;
            font-family: 'DM Mono', monospace;
            font-size: 13px;
            letter-spacing: 0.08em;
            outline: none;
            transition: border-color 0.2s;
            box-sizing: border-box;
            margin-bottom: 16px;
          }

          .login-input:focus {
            border-color: rgba(239,176,115,0.45);
          }

          .login-input::placeholder {
            color: rgba(255,255,255,0.2);
            letter-spacing: 0.1em;
            font-size: 11px;
          }

          .login-btn {
            width: 100%;
            padding: 14px;
            background: transparent;
            border: 1px solid rgba(239,176,115,0.5);
            border-radius: 2px;
            color: #efb073;
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.2s;
          }

          .login-btn:hover {
            background: rgba(239,176,115,0.08);
            border-color: #efb073;
          }
        `}</style>
        <div className="login-root">
          <div className="login-card">
            <div className="login-icon">
              <ShieldCheck size={22} />
            </div>
            <h1 className="login-title">Dashboard</h1>
            <p className="login-sub">Restricted Access</p>
            <input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="login-input"
            />
            <button onClick={handleLogin} className="login-btn">
              Authenticate
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .dash-root {
          min-height: 100vh;
          background: #0a0d11;
          font-family: 'DM Mono', monospace;
        }

        .dash-header-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 60px;
          background: rgba(10,13,17,0.95);
          border-bottom: 1px solid rgba(239,176,115,0.1);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          z-index: 100;
        }

        @media (max-width: 480px) {
          .dash-header-bar {
            padding: 0 16px;
          }
        }

        .dash-header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          color: #f0ece4;
          letter-spacing: 0.08em;
        }

        .dash-header-badge {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #efb073;
          padding: 4px 10px;
          border: 1px solid rgba(239,176,115,0.3);
          border-radius: 2px;
        }

        @media (max-width: 380px) {
          .dash-header-badge {
            display: none;
          }
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 8px 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          border-color: rgba(239,176,115,0.4);
          color: #efb073;
        }

        .logout-label {
          display: inline;
        }

        @media (max-width: 480px) {
          .logout-label {
            display: none;
          }
          .logout-btn {
            padding: 8px 10px;
          }
        }

        .dash-content {
          padding: 88px 32px 48px;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .dash-content {
            padding: 80px 16px 48px;
          }
        }

        .dash-page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: #f0ece4;
          margin: 0 0 4px;
          letter-spacing: 0.03em;
        }

        @media (max-width: 480px) {
          .dash-page-title {
            font-size: 28px;
          }
        }

        .dash-page-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 28px;
        }

        /* Filter Bar */
        .filter-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }

        .filter-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: transparent;
          border: 1px solid rgba(239,176,115,0.2);
          border-radius: 4px;
          color: rgba(255,255,255,0.5);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn.active {
          border-color: #efb073;
          color: #efb073;
          background: rgba(239,176,115,0.08);
        }

        .filter-btn:hover {
          border-color: rgba(239,176,115,0.5);
          color: #efb073;
        }

        .sort-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: transparent;
          border: 1px solid rgba(239,176,115,0.2);
          border-radius: 4px;
          color: #efb073;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sort-btn:hover {
          border-color: rgba(239,176,115,0.5);
          background: rgba(239,176,115,0.04);
        }

        .sort-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 4px;
        }

        .export-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: rgba(239,176,115,0.1);
          border: 1px solid rgba(239,176,115,0.3);
          border-radius: 4px;
          color: #efb073;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .export-btn:hover:not(:disabled) {
          background: rgba(239,176,115,0.2);
          border-color: #efb073;
        }

        .export-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .search-wrap {
          position: relative;
          margin-bottom: 28px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 42px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(239,176,115,0.15);
          border-radius: 4px;
          color: #f0ece4;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: rgba(239,176,115,0.45);
        }

        .search-input::placeholder {
          color: rgba(255,255,255,0.2);
          font-size: 11px;
          letter-spacing: 0.08em;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.3;
          pointer-events: none;
        }

        .search-count {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(239,176,115,0.4);
          font-size: 11px;
          letter-spacing: 0.1em;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        @media (max-width: 768px) {
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(239,176,115,0.1);
          border-radius: 4px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 600px) {
          .stat-card {
            padding: 14px 12px;
            gap: 10px;
          }
        }

        .stat-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #efb073, rgba(239,176,115,0.2));
        }

        .stat-icon {
          color: #efb073;
          opacity: 0.7;
          flex-shrink: 0;
        }

        .stat-label {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin: 0 0 4px;
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 300;
          color: #f0ece4;
          line-height: 1;
        }

        @media (max-width: 600px) {
          .stat-value {
            font-size: 22px;
          }
        }

        /* Table styles */
        .table-wrap {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(239,176,115,0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .dash-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        .dash-table thead tr {
          border-bottom: 1px solid rgba(239,176,115,0.15);
          background: rgba(239,176,115,0.04);
        }

        .dash-table th {
          padding: 14px 16px;
          color: rgba(239,176,115,0.7);
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 10px;
          text-align: left;
          white-space: nowrap;
        }

        .dash-table th.sortable {
          cursor: pointer;
          transition: color 0.2s;
        }

        .dash-table th.sortable:hover {
          color: #efb073;
        }

        .dash-table th .sort-indicator {
          display: inline-flex;
          align-items: center;
          margin-left: 6px;
          opacity: 0.7;
        }

        .dash-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }

        .dash-table tbody tr:last-child {
          border-bottom: none;
        }

        .dash-table tbody tr:hover {
          background: rgba(239,176,115,0.04);
        }

        .dash-table td {
          padding: 14px 16px;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
        }

        .dash-table td.dim {
          color: rgba(255,255,255,0.35);
        }

        .index-cell {
          color: rgba(239,176,115,0.4);
          font-size: 11px;
        }

        .type-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 2px;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .type-badge.challenger {
          background: rgba(239,176,115,0.15);
          color: #efb073;
          border: 1px solid rgba(239,176,115,0.3);
        }

        .type-badge.visitor {
          background: rgba(100,116,139,0.15);
          color: #94a3b8;
          border: 1px solid rgba(148,163,184,0.3);
        }

        /* Mobile cards */
        .mobile-cards {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-table-scroll {
            display: none;
          }
          .mobile-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 16px;
          }
        }

        .reg-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(239,176,115,0.12);
          border-radius: 6px;
          padding: 18px 16px 14px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .reg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #efb073, rgba(239,176,115,0.15));
        }

        .reg-card:hover {
          border-color: rgba(239,176,115,0.25);
        }

        .reg-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 10px;
        }

        .reg-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 400;
          color: #f0ece4;
          line-height: 1.2;
          flex: 1;
        }

        .reg-card-index {
          font-size: 10px;
          color: rgba(239,176,115,0.4);
          letter-spacing: 0.1em;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .reg-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
          margin-bottom: 14px;
        }

        .reg-card-field {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .reg-card-field.full-width {
          grid-column: 1 / -1;
        }

        .reg-field-label {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(239,176,115,0.5);
        }

        .reg-field-value {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.03em;
          word-break: break-all;
        }

        .reg-field-value.dim {
          color: rgba(255,255,255,0.35);
        }

        .reg-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.05);
          gap: 10px;
          flex-wrap: wrap;
        }

        .reg-card-date {
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.06em;
        }

        .reg-card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .badge-paid {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 2px;
          color: #4ade80;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .badge-paid:hover {
          background: rgba(34,197,94,0.06);
          border-color: rgba(34,197,94,0.5);
        }

        .btn-unpaid {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          background: transparent;
          border: 1px solid rgba(239,68,68,0.35);
          border-radius: 2px;
          color: #f87171;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-unpaid:hover {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.6);
        }

        .btn-delete {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 8px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          color: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-delete:hover {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.4);
          color: #f87171;
        }

        .loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          gap: 16px;
          color: rgba(239,176,115,0.5);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .empty-state {
          text-align: center;
          padding: 80px 0;
          color: rgba(255,255,255,0.2);
          font-size: 12px;
          letter-spacing: 0.1em;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.15s ease;
          padding: 16px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-card {
          width: 100%;
          max-width: 380px;
          background: #0f1318;
          border: 1px solid rgba(239,176,115,0.2);
          border-radius: 4px;
          padding: 36px 32px;
          position: relative;
          animation: slideUp 0.2s ease;
        }

        @media (max-width: 480px) {
          .modal-card {
            padding: 28px 20px;
          }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent);
        }

        .modal-icon {
          width: 44px;
          height: 44px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 4px;
          color: #f87171;
        }

        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          color: #f0ece4;
          text-align: center;
          margin: 0 0 8px;
          letter-spacing: 0.04em;
        }

        .modal-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-align: center;
          letter-spacing: 0.08em;
          margin: 0 0 28px;
          line-height: 1.6;
        }

        .modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .modal-btn-cancel {
          padding: 12px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-btn-cancel:hover {
          border-color: rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.7);
        }

        .modal-btn-delete {
          padding: 12px;
          background: transparent;
          border: 1px solid rgba(239,68,68,0.4);
          border-radius: 2px;
          color: #f87171;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-btn-delete:hover {
          background: rgba(239,68,68,0.1);
          border-color: #f87171;
        }

        .ieee-yes {
          color: #efb073;
          font-size: 10px;
          letter-spacing: 0.1em;
        }
        .ieee-no {
          color: rgba(255,255,255,0.25);
          font-size: 10px;
        }
      `}</style>

      <div className="dash-root">
        <div className="dash-header-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span className="dash-header-title">Admin Dashboard</span>
            <span className="dash-header-badge">Live</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={13} />
            <span className="logout-label">Logout</span>
          </button>
        </div>

        <div className="dash-content">
          <h1 className="dash-page-title">Registrations</h1>
          <p className="dash-page-sub">All participant records</p>

          {/* Filter Bar with Sort */}
          <div className="filter-bar">
            <div className="filter-group">
              <button
                className={`filter-btn ${filterType === "all" ? "active" : ""}`}
                onClick={() => setFilterType("all")}
              >
                <Users2 size={14} />
                All
              </button>
              <button
                className={`filter-btn ${
                  filterType === "challenger" ? "active" : ""
                }`}
                onClick={() => setFilterType("challenger")}
              >
                <User size={14} />
                Challengers
              </button>
              <button
                className={`filter-btn ${
                  filterType === "visitor" ? "active" : ""
                }`}
                onClick={() => setFilterType("visitor")}
              >
                <Users size={14} />
                Visitors
              </button>

              {/* Sort Button */}
              <button
                className="sort-btn"
                onClick={toggleSortOrder}
                title={getSortText()}
              >
                <ArrowUpDown size={14} />
                Sort
                <span className="sort-indicator">{getSortIcon()}</span>
              </button>
            </div>

            <button
              className="export-btn"
              onClick={exportToCSV}
              disabled={exportLoading || processedRegistrations.length === 0}
            >
              {exportLoading ? (
                <Loader2
                  size={14}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <Download size={14} />
              )}
              Export {filterType !== "all" ? filterType : ""} CSV
            </button>
          </div>

          {/* Search */}
          <div className="search-wrap">
            <svg
              className="search-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#efb073"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, phone, university, team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <span className="search-count">
                {processedRegistrations.length} result
                {processedRegistrations.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Stats */}
          {!loading && (
            <div className="stats-row">
              <div className="stat-card">
                <Users2 size={20} className="stat-icon" />
                <div>
                  <p className="stat-label">Total</p>
                  <p className="stat-value">{processedRegistrations.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <User size={20} className="stat-icon" />
                <div>
                  <p className="stat-label">Challengers</p>
                  <p className="stat-value">{challengerCount}</p>
                </div>
              </div>
              <div className="stat-card">
                <Users size={20} className="stat-icon" />
                <div>
                  <p className="stat-label">Visitors</p>
                  <p className="stat-value">{visitorCount}</p>
                </div>
              </div>
              <div className="stat-card">
                <CheckCircle size={20} className="stat-icon" />
                <div>
                  <p className="stat-label">Paid</p>
                  <p className="stat-value">{paidCount}</p>
                </div>
              </div>
              <div className="stat-card">
                <XCircle size={20} className="stat-icon" />
                <div>
                  <p className="stat-label">Unpaid</p>
                  <p className="stat-value">{unpaidCount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Sort Info Bar */}
          {!loading && processedRegistrations.length > 0 && (
            <div
              style={{
                marginBottom: "16px",
                fontSize: "11px",
                color: "rgba(239,176,115,0.5)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Sorted by:</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "#efb073",
                }}
              >
                Registration Date
                {getSortIcon()}
              </span>
              <span>({getSortText()})</span>
            </div>
          )}

          {/* Content */}
          <div className="table-wrap">
            {loading ? (
              <div className="loader-wrap">
                <Loader2
                  size={24}
                  style={{
                    animation: "spin 1s linear infinite",
                    color: "#efb073",
                  }}
                />
                <span>Loading records...</span>
              </div>
            ) : processedRegistrations.length === 0 ? (
              <div className="empty-state">
                {search
                  ? `No results for "${search}"`
                  : `No ${
                      filterType !== "all" ? filterType : ""
                    } registrations found`}
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div
                  className="desktop-table-scroll"
                  style={{ overflowX: "auto" }}
                >
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>IEEE</th>
                        <th>SB / ID / University</th>
                        <th>Team</th>
                        <th>Payment</th>
                        <th>Delete</th>
                        <th className="sortable" onClick={toggleSortOrder}>
                          Registered At
                          <span className="sort-indicator">
                            {getSortIcon()}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedRegistrations.map((reg, index) => (
                        <tr key={reg._id}>
                          <td className="index-cell dim">
                            {String(index + 1).padStart(2, "0")}
                          </td>
                          <td>
                            <span
                              className={`type-badge ${
                                reg.isChallenger ? "challenger" : "visitor"
                              }`}
                            >
                              {reg.isChallenger ? "CHALLENGER" : "VISITOR"}
                            </span>
                          </td>
                          <td style={{ color: "#f0ece4", fontWeight: 400 }}>
                            {reg.fullName}
                          </td>
                          <td className="dim">{reg.email}</td>
                          <td className="dim">{reg.phoneNumber}</td>
                          <td>
                            {reg.isIEEEMember ? (
                              <span className="ieee-yes">YES</span>
                            ) : (
                              <span className="ieee-no">NO</span>
                            )}
                          </td>
                          <td className="dim">
                            {reg.isIEEEMember
                              ? `${reg.ieeeSB || ""} ${
                                  reg.ieeeId ? "/ " + reg.ieeeId : ""
                                }`
                              : reg.universityName || "—"}
                          </td>
                          <td className="dim">
                            {reg.isChallenger ? reg.teamName || "—" : "—"}
                          </td>
                          <td>
                            {reg.paid ? (
                              <button
                                onClick={() => togglePaid(reg._id)}
                                className="badge-paid"
                                title="Click to mark as unpaid"
                              >
                                <CheckCircle size={10} /> Paid
                              </button>
                            ) : (
                              <button
                                onClick={() => togglePaid(reg._id)}
                                className="btn-unpaid"
                                title="Click to mark as paid"
                              >
                                <XCircle size={10} /> Unpaid
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => confirmDelete(reg._id)}
                              className="btn-delete"
                              title="Delete registration"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                          <td className="dim" style={{ fontSize: "11px" }}>
                            {new Date(reg.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="mobile-cards">
                  {processedRegistrations.map((reg, index) => (
                    <div className="reg-card" key={reg._id}>
                      <div className="reg-card-header">
                        <span className="reg-card-name">{reg.fullName}</span>
                        <span className="reg-card-index">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="reg-card-grid">
                        <div className="reg-card-field full-width">
                          <span className="reg-field-label">Type</span>
                          <span
                            className={`type-badge ${
                              reg.isChallenger ? "challenger" : "visitor"
                            }`}
                          >
                            {reg.isChallenger ? "CHALLENGER" : "VISITOR"}
                          </span>
                        </div>

                        <div className="reg-card-field full-width">
                          <span className="reg-field-label">Email</span>
                          <span className="reg-field-value dim">
                            {reg.email}
                          </span>
                        </div>

                        <div className="reg-card-field">
                          <span className="reg-field-label">Phone</span>
                          <span className="reg-field-value dim">
                            {reg.phoneNumber}
                          </span>
                        </div>

                        <div className="reg-card-field">
                          <span className="reg-field-label">IEEE Member</span>
                          <span
                            className={
                              reg.isIEEEMember ? "ieee-yes" : "ieee-no"
                            }
                          >
                            {reg.isIEEEMember ? "Yes" : "No"}
                          </span>
                        </div>

                        {reg.isIEEEMember ? (
                          <>
                            <div className="reg-card-field">
                              <span className="reg-field-label">IEEE SB</span>
                              <span className="reg-field-value dim">
                                {reg.ieeeSB || "—"}
                              </span>
                            </div>
                            <div className="reg-card-field">
                              <span className="reg-field-label">IEEE ID</span>
                              <span className="reg-field-value dim">
                                {reg.ieeeId || "—"}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="reg-card-field full-width">
                            <span className="reg-field-label">University</span>
                            <span className="reg-field-value dim">
                              {reg.universityName || "—"}
                            </span>
                          </div>
                        )}

                        {reg.isChallenger && (
                          <div className="reg-card-field full-width">
                            <span className="reg-field-label">Team</span>
                            <span className="reg-field-value">
                              {reg.teamName || "—"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="reg-card-footer">
                        <span className="reg-card-date">
                          {new Date(reg.createdAt).toLocaleString()}
                        </span>
                        <div className="reg-card-actions">
                          {reg.paid ? (
                            <button
                              onClick={() => togglePaid(reg._id)}
                              className="badge-paid"
                              title="Click to mark as unpaid"
                            >
                              <CheckCircle size={10} /> Paid
                            </button>
                          ) : (
                            <button
                              onClick={() => togglePaid(reg._id)}
                              className="btn-unpaid"
                              title="Click to mark as paid"
                            >
                              <XCircle size={10} /> Unpaid
                            </button>
                          )}
                          <button
                            onClick={() => confirmDelete(reg._id)}
                            className="btn-delete"
                            title="Delete registration"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />

        {/* Delete Confirmation Modal */}
        {confirmDeleteId && (
          <div
            className="modal-overlay"
            onClick={() => setConfirmDeleteId(null)}
          >
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">
                <Trash2 size={20} />
              </div>
              <h2 className="modal-title">Delete Registration</h2>
              <p className="modal-sub">
                This action is permanent and cannot be undone.
                <br />
                Are you sure you want to proceed?
              </p>
              <div className="modal-actions">
                <button
                  className="modal-btn-cancel"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>
                <button className="modal-btn-delete" onClick={deleteUser}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

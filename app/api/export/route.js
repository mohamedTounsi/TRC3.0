import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function GET(request) {
  try {
    // Authorization check
    const password = request.headers.get("x-dashboard-password");

    if (password !== process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();

    // Get query params
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const search = searchParams.get("search") || "";

    let query = {};

    // 🎯 FILTERING
    if (type === "challenger") {
      query.isChallenger = true;
    } else if (type === "visitor") {
      query.isChallenger = false;
    } else if (type === "paid") {
      query.paid = true;
    } else if (type === "unpaid") {
      query.paid = false;
    } else if (type === "ieee") {
      query.isIEEEMember = true;
    } else if (type === "nonieee") {
      query.isIEEEMember = false;
    }

    let registrations = await Registration.find(query);

    // 🔎 SEARCH FILTER
    if (search) {
      const s = search.toLowerCase();

      registrations = registrations.filter((r) =>
        `${r.fullName} ${r.email} ${r.phoneNumber} ${r.universityName} ${r.teamName} ${r.ieeeSB} ${r.ieeeId}`
          .toLowerCase()
          .includes(s)
      );
    }

    // Calculate team numbers for challengers
    let teamCounter = 1;
    const teamMap = new Map();
    
    // First, sort by team name for challengers to assign team numbers
    if (type === "challenger") {
      registrations.sort((a, b) => {
        const teamA = (a.teamName || "").toLowerCase();
        const teamB = (b.teamName || "").toLowerCase();

        if (teamA < teamB) return -1;
        if (teamA > teamB) return 1;

        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      // Assign team numbers
      registrations.forEach(reg => {
        if (reg.isChallenger && reg.teamName) {
          const teamName = reg.teamName.trim().toLowerCase();
          if (!teamMap.has(teamName)) {
            teamMap.set(teamName, teamCounter++);
          }
        }
      });
    } else {
      registrations.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    // 📄 CSV HEADERS - Add Team Number column for challengers
    let headers = [
      "Full Name",
      "Email",
      "Phone Number",
      "Registration Type",
      "IEEE Member",
      "IEEE SB",
      "IEEE ID",
      "University Name",
      "Team Name",
      "Team Number",
      "Team Lead",
      "Team Member Count",
      "Payment Status",
      "Registered At",
    ];

    // 📄 CSV ROWS
    const rows = registrations.map((reg) => {
      let teamNumber = "";
      let isTeamLead = "";
      let teamMemberCount = "";
      
      if (reg.isChallenger && reg.teamName) {
        const teamName = reg.teamName.trim().toLowerCase();
        teamNumber = teamMap.get(teamName) || "";
        
        // Count members in this team
        const teamMembers = registrations.filter(
          r => r.isChallenger && r.teamName && r.teamName.trim().toLowerCase() === teamName
        );
        teamMemberCount = teamMembers.length;
        
        // First member of the team (by registration date) is considered team lead
        const sortedTeamMembers = [...teamMembers].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        isTeamLead = sortedTeamMembers[0]?._id === reg._id ? "Yes" : "No";
      }

      return [
        `"${reg.fullName || ""}"`,
        `"${reg.email || ""}"`,
        `"${reg.phoneNumber || ""}"`,
        reg.isChallenger ? "Challenger" : "Visitor",
        reg.isIEEEMember ? "Yes" : "No",
        `"${reg.ieeeSB || ""}"`,
        `"${reg.ieeeId || ""}"`,
        `"${reg.universityName || ""}"`,
        `"${reg.teamName || ""}"`,
        teamNumber,
        isTeamLead,
        teamMemberCount,
        reg.paid ? "Paid" : "Unpaid",
        new Date(reg.createdAt).toLocaleString(),
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create filename with filter type and date
    const dateStr = new Date().toISOString().split("T")[0];
    const filterSuffix = type !== "all" ? `-${type}` : "";
    const searchSuffix = search ? `-search` : "";
    
    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=registrations${filterSuffix}${searchSuffix}-${dateStr}.csv`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);

    return new Response(JSON.stringify({ error: "Failed to export data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
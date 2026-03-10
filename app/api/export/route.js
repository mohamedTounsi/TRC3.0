import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function GET(request) {
  try {
    // Check authorization
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
    const type = searchParams.get("type"); // all | challenger | visitor
    const search = searchParams.get("search") || "";

    let query = {};

    if (type === "challenger") {
      query.isChallenger = true;
    } else if (type === "visitor") {
      query.isChallenger = false;
    }

    let registrations = await Registration.find(query);

    // 🔎 Apply search filter (ISIMS example)
    if (search) {
      const s = search.toLowerCase();

      registrations = registrations.filter((r) =>
        `${r.fullName} ${r.email} ${r.phoneNumber} ${r.universityName} ${r.teamName} ${r.ieeeSB} ${r.ieeeId}`
          .toLowerCase()
          .includes(s)
      );
    }

    // 📊 Sorting
    if (type === "challenger") {
      // Sort by team name
      registrations.sort((a, b) => {
        const teamA = (a.teamName || "").toLowerCase();
        const teamB = (b.teamName || "").toLowerCase();

        if (teamA < teamB) return -1;
        if (teamA > teamB) return 1;

        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    } else {
      // Normal sort by newest
      registrations.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    // CSV headers
    const headers = [
      "Full Name",
      "Email",
      "Phone Number",
      "Registration Type",
      "IEEE Member",
      "IEEE SB",
      "IEEE ID",
      "University Name",
      "Team Name",
      "Payment Status",
      "Registered At",
    ];

    const rows = registrations.map((reg) => [
      `"${reg.fullName || ""}"`,
      `"${reg.email || ""}"`,
      `"${reg.phoneNumber || ""}"`,
      reg.isChallenger ? "Challenger" : "Visitor",
      reg.isIEEEMember ? "Yes" : "No",
      `"${reg.ieeeSB || ""}"`,
      `"${reg.ieeeId || ""}"`,
      `"${reg.universityName || ""}"`,
      `"${reg.teamName || ""}"`,
      reg.paid ? "Paid" : "Unpaid",
      new Date(reg.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join(
      "\n"
    );

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=registrations-${type}-${new Date()
          .toISOString()
          .split("T")[0]}.csv`,
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
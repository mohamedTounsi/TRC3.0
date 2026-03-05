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
    
    // Get filter from query params
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'all', 'challenger', 'visitor'
    
    let query = {};
    if (type === 'challenger') {
      query.isChallenger = true;
    } else if (type === 'visitor') {
      query.isChallenger = false;
    }
    
    const registrations = await Registration.find(query).sort({ createdAt: -1 });

    // Define CSV headers
    const headers = [
      'Full Name',
      'Email',
      'Phone Number',
      'Registration Type',
      'IEEE Member',
      'IEEE SB',
      'IEEE ID',
      'University Name',
      'Team Name',
      'Payment Status',
      'Registered At'
    ];

    // Convert data to CSV rows
    const rows = registrations.map(reg => [
      `"${reg.fullName || ''}"`,
      `"${reg.email || ''}"`,
      `"${reg.phoneNumber || ''}"`,
      reg.isChallenger ? 'Challenger' : 'Visitor',
      reg.isIEEEMember ? 'Yes' : 'No',
      `"${reg.ieeeSB || ''}"`,
      `"${reg.ieeeId || ''}"`,
      `"${reg.universityName || ''}"`,
      `"${reg.teamName || ''}"`,
      reg.paid ? 'Paid' : 'Unpaid',
      new Date(reg.createdAt).toLocaleString()
    ]);

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Return CSV file
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=registrations-${type}-${new Date().toISOString().split('T')[0]}.csv`,
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return new Response(JSON.stringify({ error: "Failed to export data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
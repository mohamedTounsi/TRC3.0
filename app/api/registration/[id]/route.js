import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function PATCH(req, { params }) {
  const { id } = await params;

  const password = req.headers.get("x-dashboard-password");
  if (!password || password !== process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const registration = await Registration.findById(id);

    if (!registration) {
      return NextResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    // ✅ TOGGLE instead of forcing true
    registration.paid = !registration.paid;
    await registration.save();

    return NextResponse.json({
      message: "Paid status toggled",
      data: registration,
    });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ✅ DELETE API
export async function DELETE(req, { params }) {
  const { id } = await params;

  const password = req.headers.get("x-dashboard-password");
  if (!password || password !== process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const deleted = await Registration.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
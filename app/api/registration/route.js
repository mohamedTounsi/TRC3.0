import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function GET(req) {
  const password = req.headers.get("x-dashboard-password");

  if (!password || password !== process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return NextResponse.json({ registrations });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      fullName,
      email,
      phoneNumber,
      isIEEEMember,
      ieeeSB,
      ieeeId,
      universityName,
      isChallenger,
      teamName,
    } = body;

    // =============================
    // 🔎 BASIC VALIDATION
    // =============================

    if (!fullName || !email || !phoneNumber) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (isIEEEMember === undefined || isIEEEMember === null) {
      return NextResponse.json(
        { message: "Please specify IEEE membership" },
        { status: 400 }
      );
    }

    if (isChallenger === undefined || isChallenger === null) {
      return NextResponse.json(
        { message: "Please specify Challenger status" },
        { status: 400 }
      );
    }

    // =============================
    // 🎓 CONDITIONAL VALIDATION
    // =============================

    if (isIEEEMember) {
      if (!ieeeSB || !ieeeId) {
        return NextResponse.json(
          { message: "IEEE SB and IEEE ID are required" },
          { status: 400 }
        );
      }
    } else {
      if (!universityName) {
        return NextResponse.json(
          { message: "University name is required" },
          { status: 400 }
        );
      }
    }

    if (isChallenger && !teamName) {
      return NextResponse.json(
        { message: "Team name is required for challengers" },
        { status: 400 }
      );
    }

    // =============================
    // 🚫 PREVENT DUPLICATE EMAIL
    // =============================

    const existing = await Registration.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { message: "This email is already registered" },
        { status: 409 }
      );
    }

    // =============================
    // 💾 CREATE REGISTRATION
    // =============================

    const newRegistration = await Registration.create({
      fullName,
      email,
      phoneNumber,
      isIEEEMember,
      ieeeSB: isIEEEMember ? ieeeSB : null,
      ieeeId: isIEEEMember ? ieeeId : null,
      universityName: !isIEEEMember ? universityName : null,
      isChallenger,
      teamName: isChallenger ? teamName : null,
      // paid automatically false by default
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        data: newRegistration,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const clerk = await clerkClient();

    const usersResponse = await clerk.users.getUserList();

    const users = usersResponse.data;

    const characters = users.map((user) => {
      const userMetadata = user.publicMetadata || {};
      return userMetadata.character || null;
    });

    return NextResponse.json({ characters: characters });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

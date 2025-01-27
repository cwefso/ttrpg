import { NextResponse } from "next/server";
import { Character } from "@/app/types";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // Initialize Clerk client
    const clerk = await clerkClient();

    // Fetch all users from Clerk
    const usersResponse = await clerk.users.getUserList();

    // Access the `data` property to get the array of users
    const users = usersResponse.data;

    // Extract characters from each user's public metadata
    const characters = users.map((user: any) => {
      const userMetadata = user.publicMetadata || {};
      return userMetadata.character || null;
    });

    // Filter out null values (users without characters)
    const validCharacters = characters.filter(
      (character: Character): character is Character => character !== null
    );

    return NextResponse.json({ characters: validCharacters });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

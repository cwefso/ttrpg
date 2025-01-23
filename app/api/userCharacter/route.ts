import { NextResponse } from "next/server";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { Character } from "@/app/types";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { error: "You are not authorized" },
      { status: 401 }
    );
  }

  try {
    // Fetch the current user's metadata
    const userMetadata = await user.publicMetadata;

    // Retrieve the character from the metadata
    const character: unknown | Character | null =
      userMetadata?.character || null;

    return NextResponse.json({ character });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { error: "You are not authorized" },
      { status: 401 }
    );
  }

  try {
    // Parse the request body to get the character object
    const { character }: { character: Character } = await request.json();

    // if (!character || !character.name) {
    //   return NextResponse.json(
    //     { error: "Character data with a valid name is required" },
    //     { status: 400 }
    //   );
    // }
    const clerk = await clerkClient();
    // Update the user's public metadata with the character object
    await clerk.users.updateUserMetadata(user.id!, {
      publicMetadata: {
        character,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

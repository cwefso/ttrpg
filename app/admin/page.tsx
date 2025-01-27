"use client";

import { useEffect } from "react";
import CharacterSheet from "../components/CharacterSheet";
import { useCharacters } from "../hooks/useCharacters"; // Import the new hook
import { useRouter } from "next/navigation";

export default function Home() {
  const { characters, loading, error } = useCharacters(); // Use the new hook
  const router = useRouter();

  // Redirect to the new character page if no characters are found
  useEffect(() => {
    if (!loading && characters.length === 0) {
      router.push("/new-character");
    }
  }, [characters, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Character Sheets</h1>
      <div className="grid grid-cols-2 gap-8">
        {characters.map((character, index) => (
          <CharacterSheet key={index} character={character} />
        ))}
      </div>
    </div>
  );
}

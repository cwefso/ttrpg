"use client";

import { useEffect } from "react";
import CharacterSheet from "../components/CharacterSheet";
import { useCharacters } from "../hooks/useCharacters";
import { useRouter } from "next/navigation";

export default function Home() {
  const { characters, loading, error } = useCharacters();
  const router = useRouter();

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

  // Remove duplicates based on name (if name is unique)
  const uniqueCharacters = Array.from(
    new Map(characters.map((char) => [char.name, char])).values()
  );

  return (
    <div>
      <h1>Character Sheets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {uniqueCharacters.map((character, index) => (
          <CharacterSheet key={index} character={character} />
        ))}
      </div>
    </div>
  );
}

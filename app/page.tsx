"use client";

import { useEffect, useState } from "react";
import CharacterSheet from "./components/CharacterSheet";
import CharacterForm from "./components/CharacterForm";
import { Character } from "./types";

export default function Home() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch("/api/userCharacter");
        if (!response.ok) {
          throw new Error(`Failed to fetch character: ${response.statusText}`);
        }
        const data = await response.json();
        setCharacter(data.character);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <div>{character && <CharacterSheet character={character} />}</div>;
}

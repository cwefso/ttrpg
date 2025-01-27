import { useEffect, useState } from "react";
import { Character } from "@/app/types";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("/api/characters");
        if (!response.ok) {
          throw new Error(`Failed to fetch characters: ${response.statusText}`);
        }
        const data = await response.json();
        setCharacters(data.characters);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
};

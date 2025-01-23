"use client";

import { useState } from "react";
import { Character } from "../types";

interface UseUpdateCharacterReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  updateCharacter: (character: Character) => Promise<void>;
}

export function useUpdateCharacter(): UseUpdateCharacterReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateCharacter = async (character: Character): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/userCharacter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ character }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update character: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        throw new Error(data.error || "Unknown error occurred");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    updateCharacter,
  };
}

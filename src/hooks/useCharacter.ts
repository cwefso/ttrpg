import { useUser } from '@clerk/clerk-react';
import { useLocalStorage } from './useLocalStorage';
import { Character } from '../types';

export function useCharacter() {
  const { user } = useUser();
  const userId = user?.id || 'anonymous';
  const [character, setCharacter] = useLocalStorage<Character | null>(`character-${userId}`, null);

  const updateCharacter = (updatedCharacter: Character) => {
    setCharacter(updatedCharacter);
  };

  const clearCharacter = () => {
    setCharacter(null);
  };

  return {
    character,
    updateCharacter,
    clearCharacter,
  };
}
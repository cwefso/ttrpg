import { Character } from "../types";

interface StatusProps {
  displayCharacter: Character;
  setDisplayCharacter: React.Dispatch<React.SetStateAction<Character>>;
  updateCharacter: (character: Character) => void;
}

const Status = ({ displayCharacter, setDisplayCharacter, updateCharacter }: StatusProps) => {
  const handleStatusChange = (field: 'wounds' | 'fatigue' | 'bennies', delta: number) => {
    setDisplayCharacter((prev) => {
      const newValue = Math.max(0, prev[field] + delta);
      const updatedCharacter = { ...prev, [field]: newValue };
      updateCharacter(updatedCharacter);
      return updatedCharacter;
    });
  };

  return (
    <section className="mb-6 text-gray-800 dark:text-gray-100">
      <div className="flex w-full justify-between items-center mb-2">
        <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-semibold mb-2">
          Status
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 my-4 text-center">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="font-bold">Wounds</p>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-red-800 px-2 sm:px-4 md:px-6 py-1 rounded w-full"
              onClick={() => handleStatusChange('wounds', -1)}
            >
              -
            </button>
            <p className="text-xl mx-4">{displayCharacter.wounds}</p>
            <button
              className="bg-green-800 px-2 sm:px-4 md:px-6 py-1 rounded w-full"
              onClick={() => handleStatusChange('wounds', 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="font-bold">Fatigue</p>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-red-800 px-2 sm:px-4 md:px-6 py-1 rounded w-full"
              onClick={() => handleStatusChange('fatigue', -1)}
            >
              -
            </button>
            <p className="text-xl mx-4">{displayCharacter.fatigue}</p>
            <button
              className="bg-green-800 px-2 sm:px-4 md:px-6 py-1 rounded w-full"
              onClick={() => handleStatusChange('fatigue', 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="font-bold">Bennies</p>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-red-800 px-2 sm:px-4 md:px-6 py-1 rounded w-full"
              onClick={() => handleStatusChange('bennies', -1)}
            >
              -
            </button>
            <p className="text-xl mx-4">{displayCharacter.bennies}</p>
            <button
              className="bg-green-800 px-2 sm:px-4 md:px-6 py-1 rounded w-full"
              onClick={() => handleStatusChange('bennies', 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Status;
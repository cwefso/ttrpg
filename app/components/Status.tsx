import { Character } from "../types";

interface StatusProps {
  displayCharacter: Character;
  setDisplayCharacter: React.Dispatch<React.SetStateAction<Character>>;
}

const Status = ({ displayCharacter, setDisplayCharacter }: StatusProps) => {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Status</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-800 rounded">
          <p className="font-bold">Wounds</p>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-red-800 px-2 sm:px-4 md:px-6 py-1 rounded"
              onClick={() =>
                setDisplayCharacter((prev) => ({
                  ...prev,
                  wounds: Math.max(0, prev.wounds - 1),
                }))
              }
            >
              -
            </button>
            <p className="text-xl mx-4">{displayCharacter.wounds}</p>
            <button
              className="bg-green-800 px-2 sm:px-4 md:px-6 py-1 rounded"
              onClick={() =>
                setDisplayCharacter((prev) => ({
                  ...prev,
                  wounds: prev.wounds + 1,
                }))
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <p className="font-bold">Fatigue</p>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-red-800 px-2 sm:px-4 md:px-6 py-1 rounded"
              onClick={() =>
                setDisplayCharacter((prev) => ({
                  ...prev,
                  fatigue: Math.max(0, prev.fatigue - 1),
                }))
              }
            >
              -
            </button>
            <p className="text-xl mx-4">{displayCharacter.fatigue}</p>
            <button
              className="bg-green-800 px-2 sm:px-4 md:px-6 py-1 rounded"
              onClick={() =>
                setDisplayCharacter((prev) => ({
                  ...prev,
                  fatigue: prev.fatigue + 1,
                }))
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <p className="font-bold">Bennies</p>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-red-800 px-2 sm:px-4 md:px-6 py-1 rounded"
              onClick={() =>
                setDisplayCharacter((prev) => ({
                  ...prev,
                  bennies: Math.max(0, prev.bennies - 1),
                }))
              }
            >
              -
            </button>
            <p className="text-xl mx-4">{displayCharacter.bennies}</p>
            <button
              className="bg-green-800 px-2 sm:px-4 md:px-6 py-1 rounded"
              onClick={() =>
                setDisplayCharacter((prev) => ({
                  ...prev,
                  bennies: prev.bennies + 1,
                }))
              }
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

import React, { useState } from "react";

interface DieProps {
  value: number;
  onClick: () => void;
}

const Die = ({ value, onClick }: DieProps) => {
  return (
    <button
      onClick={onClick}
      className="text-white text-shadow text-xl rounded-lg w-16 h-16 m-1 border-0 bg-green-500 shadow-md hover:shadow-lg hover:bg-green-600 transition-all duration-300 cursor-pointer"
    >
      d{value}
    </button>
  );
};

interface ResultProps {
  result: number;
}

const Result = ({ result }: ResultProps) => {
  return (
    <div className="w-24 h-24 mx-auto text-center leading-[6rem] text-5xl rounded-lg shadow-md bg-white text-gray-800">
      {result}
    </div>
  );
};

const DiceRoller = () => {
  const [result, setResult] = useState<number>(0);
  const dice: number[] = [4, 6, 8, 10, 12, 20];

  const calculateTotal = (value: number) => {
    const random = () => Math.floor(Math.random() * value) + 1;
    setResult(random());
  };

  return (
    <div className="h-auto flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="flex flex-wrap justify-center">
            {dice.map((dieValue) => (
              <Die
                key={dieValue}
                value={dieValue}
                onClick={() => calculateTotal(dieValue)}
              />
            ))}
          </div>
        </div>
        <div className="text-center">
          <Result result={result} />
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;
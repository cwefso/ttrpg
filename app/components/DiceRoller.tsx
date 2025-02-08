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

// interface MultiplierProps {
//   value: number;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const Multiplier = ({ value, onChange }: MultiplierProps) => {
//   return (
//     <input
//       type="number"
//       pattern="[0-9]*"
//       min="1"
//       max="10"
//       placeholder="1"
//       value={value}
//       onChange={onChange}
//       className="w-24 text-center text-xl p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-none bg-white text-gray-800"
//     />
//   );
// };

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

const Container = () => {
  const [multiplier, setMultiplier] = useState<number>(1);
  const [result, setResult] = useState<number>(0);
  const dice: number[] = [4, 6, 8, 10, 12, 20];

  const calculateTotal = (value: number) => {
    let total = 0;
    const random = () => Math.floor(Math.random() * value) + 1;

    for (let i = 0; i < multiplier; i++) {
      total += random();
    }

    setResult(total);
  };

  const handleMultiplierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMultiplier(Number(event.target.value));
  };

  return (
    <div className="h-auto flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* <div className="text-center pb-6">
          <p className="m-4">Number of Dice</p>
          <Multiplier value={multiplier} onChange={handleMultiplierChange} />
        </div> */}
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

export default Container;

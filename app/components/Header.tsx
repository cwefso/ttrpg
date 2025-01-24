interface HeaderProps {
  name: string;
  background: string;
  year: string;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header = ({
  name,
  background,
  year,
  handleSubmit,
}: HeaderProps) => {
  return (
    <header className="border-b border-gray-700 pb-4 mb-6">
      <h1 className="text-4xl font-bold">{name}</h1>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-lg text-gray-400">
          {background} | Year: {year}
        </p>
        <button
          type="button"
          className="border border-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </header>
  );
};

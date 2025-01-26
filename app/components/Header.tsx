interface HeaderProps {
  name: string;
  background: string;
  year: string;
}

export const Header = ({ name, background, year }: HeaderProps) => {
  return (
    <header className="border-b border-gray-700 pb-4 mb-6">
      <h1 className="text-4xl font-bold">{name}</h1>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-lg text-gray-400">
          {background} | Year: {year}
        </p>
      </div>
    </header>
  );
};

interface HeaderProps {
  name: string;
  background: string;
  year: string;
  parry?: number;
  toughness?: number;
}

export const Header = ({ name, background, year, parry, toughness }: HeaderProps) => {
  return (
    <header className="border-b border-gray-700 pb-4 mb-6">
      <h1 className="text-4xl font-bold">{name}</h1>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-lg text-gray-400">
          {background} | Year: {year}
        </p>
        {(parry !== undefined || toughness !== undefined) && (
          <div className="flex gap-4 text-sm text-gray-300">
            {parry !== undefined && <span>Parry: {parry}</span>}
            {toughness !== undefined && <span>Toughness: {toughness}</span>}
          </div>
        )}
      </div>
    </header>
  );
};
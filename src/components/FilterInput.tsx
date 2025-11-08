const FilterInput: React.FC<{
  filter: string;
  onFilterChange: (v: string) => void;
}> = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        id="filter"
        placeholder="Filter Coins By Name Or Symbol"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;

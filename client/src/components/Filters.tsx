import { useState } from 'react';
import { FilterOptions } from '../types';

interface FiltersProps {
  onChange: (_: FilterOptions) => void
}

const Filters= ({ onChange }: FiltersProps) => {
  const [search, setSearch] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [minBeds, setMinBeds] = useState<number>();
  const [maxBeds, setMaxBeds] = useState<number>();
  const [minBaths, setMinBaths] = useState<number>();
  const [maxBaths, setMaxBaths] = useState<number>();

  const handleChange = () => {
    onChange({ search, minPrice, maxPrice, minBeds, maxBeds, minBaths, maxBaths })
  }

  const handleReset = () => {
    setSearch('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinBeds(undefined);
    setMaxBeds(undefined);
    setMinBaths(undefined);
    setMaxBaths(undefined);
    onChange({});
  }

  return (
    <form className="filters-form">
      <div className="search">
        <label>Search by Type, Address, and BrokerTitle</label>
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        <label>Min Price</label>
        <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
      </div>
      <div>
        <label>Max Price</label>
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
      </div>
      <div>
        <label>Min Beds</label>
        <input type="number" placeholder="Min Beds" value={minBeds} onChange={(e) => setMinBeds(Number(e.target.value))} />
      </div>
      <div>
        <label>Max Beds</label>
        <input type="number" placeholder="Max Beds" value={maxBeds} onChange={(e) => setMaxBeds(Number(e.target.value))} />
      </div>
      <div>
        <label>Min Baths</label>
        <input type="number" placeholder="Min Baths" value={minBaths} onChange={(e) => setMinBaths(Number(e.target.value))} />
      </div>
      <div>
        <label>Max Baths</label>
        <input type="number" placeholder="Max Baths" value={maxBaths} onChange={(e) => setMaxBaths(Number(e.target.value))} />
      </div>
      <button className="save" type="button" onClick={handleChange}>Filter</button>
      <button className="cancel" type="reset" onClick={handleReset}>Reset</button>
    </form>
  );
};

export default Filters;

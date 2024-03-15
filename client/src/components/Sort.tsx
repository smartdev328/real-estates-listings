import { ChangeEvent } from 'react';
import { SortOption } from '../types';

interface SortProps {
  onChange: (_: SortOption) => void
}

const SORT_OPTIONS = [
  { field: 'id', direction: 'asc', label: 'ID ascending'},
  { field: 'id', direction: 'desc', label: 'ID descending'},
  { field: 'price', direction: 'asc', label: 'Price ascending'},
  { field: 'price', direction: 'desc', label: 'Price descending'},
  { field: 'beds', direction: 'asc', label: 'Beds ascending'},
  { field: 'beds', direction: 'desc', label: 'Beds descending'},
  { field: 'bath', direction: 'asc', label: 'Baths ascending'},
  { field: 'bath', direction: 'desc', label: 'Baths descending'},
]

const Sort = ({ onChange }: SortProps) => {
  const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    const option = SORT_OPTIONS.find(option => option.label === value);
    if (option) {
      onChange({ field: option.field, dir: option.direction })
    }
  }

  return (
    <div className='sort-form'>
      <label>Sort by</label>
      <select onChange={handleChange}>
        <option value='' disabled>Select an option</option>
        {SORT_OPTIONS.map(option => (
          <option key={option.label} value={option.label}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Sort;

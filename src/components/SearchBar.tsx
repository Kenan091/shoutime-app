import { useState, useEffect, FC, ChangeEvent, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SearchBarProps {
  onSearch: (query: string, mediaType: string) => void;
  searchTerm: string;
  type: string;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, searchTerm, type }) => {
  const [query, setQuery] = useState<string>('');
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setQuery(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (newQuery.length >= 3) {
      typingTimeoutRef.current = window.setTimeout(() => {
        onSearch(newQuery, type);
        localStorage.setItem('searchTerm', newQuery);
      }, 1000);
    } else if (newQuery.length < 3 && newQuery.length > 0) {
      onSearch(newQuery, type);
      localStorage.setItem('searchTerm', newQuery);
    } else if (newQuery.length === 0) {
      onSearch(newQuery, type);
      localStorage.removeItem('searchTerm');
    }
  };

  const handleClick = () => {
    if (query.length < 3) {
      toast.warn('Please enter at least 3 characters for search');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.length < 3) {
      toast.warn('Please enter at least 3 characters for search');
    }
  };
  return (
    <div className='searchBar'>
      <div
        className='searchIcon'
        onClick={handleClick}>
        <FaSearch size={20} />
      </div>
      <input
        type='text'
        placeholder='search'
        className='searchInput'
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <ToastContainer />'
    </div>
  );
};

export default SearchBar;

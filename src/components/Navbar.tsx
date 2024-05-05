import { FC } from 'react';

interface NavbarProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

interface ListItem {
  type: string;
  label: string;
}

const Navbar: FC<NavbarProps> = ({ activeType, onTypeChange }) => {
  const listItems: ListItem[] = [
    { type: 'movie', label: 'Movies' },
    { type: 'tv', label: 'TV series' },
  ];

  const handleClick = (type: string) => {
    onTypeChange(type);
  };

  return (
    <header>
      <ul className='navButtons'>
        {listItems.map(listItem => (
          <li
            key={listItem.type}
            className={`${
              listItem.type === activeType ? 'navButton active' : 'navButton'
            }`}
            onClick={() => handleClick(listItem.type)}>
            {listItem.label}
          </li>
        ))}
      </ul>
      <div className='logo'>
        <span className='whitePart'>SHOU</span>TIME
      </div>
    </header>
  );
};

export default Navbar;

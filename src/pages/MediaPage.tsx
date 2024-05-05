import { FC } from 'react';
import MediaList from '../components/MediaList';
import Navbar from '../components/Navbar';

interface MediaPageProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

const MediaPage: FC<MediaPageProps> = ({ activeType, onTypeChange }) => {
  return (
    <div className='container'>
      <Navbar
        activeType={activeType}
        onTypeChange={onTypeChange}
      />
      <MediaList type={activeType} />
    </div>
  );
};

export default MediaPage;

import { FC, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MediaPage from './pages/MediaPage';
import DetailsPage from './pages/DetailsPage';

const App: FC = () => {
  const [activeType, setActiveType] = useState<string>('tv');

  const handleTypeChange = (type: string) => {
    setActiveType(type);
  };
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <MediaPage
                activeType={activeType}
                onTypeChange={handleTypeChange}
              />
            }
          />
          <Route
            path='/details/:id'
            element={<DetailsPage type={activeType} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

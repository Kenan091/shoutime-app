import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

interface MediaDetails {
  title: string;
  overview: string;
  poster_path: string;
}

interface MediaListProps {
  type: string;
}

const MediaList: FC<MediaListProps> = ({ type }) => {
  const [mediaToShow, setMediaToShow] = useState<MediaDetails[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    const isSearchTermEntered =
      storedSearchTerm && storedSearchTerm.trim().length > 0;

    if (isSearchTermEntered) {
      setSearchTerm(storedSearchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/top_rated`,
        params: { language: 'en-US', page: '1', page_size: 10 },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGZjYWQxMGIxMWExMDVmNzQ4NTE2NjdlYTE3MzlhMSIsInN1YiI6IjY2MzM1NmRmNjY1NjVhMDEyMzEzY2UxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y-9tg77ZeMUFcz1S7ZbllUIzJ8O1k8UZW7dAD_8zfhg',
        },
      };

      try {
        const response = await axios.request(options);
        setMediaToShow(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const handleSearch = useCallback(
    async (query: string, mediaType: string) => {
      setSearchTerm(query);
      if (query.length >= 3) {
        setLoading(true);

        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/${mediaType}?query=${query}`,
            {
              headers: {
                accept: 'application/json',
                Authorization:
                  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGZjYWQxMGIxMWExMDVmNzQ4NTE2NjdlYTE3MzlhMSIsInN1YiI6IjY2MzM1NmRmNjY1NjVhMDEyMzEzY2UxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y-9tg77ZeMUFcz1S7ZbllUIzJ8O1k8UZW7dAD_8zfhg',
              },
            }
          );
          setSearchResults(response.data.results);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    },
    [type, searchTerm]
  );

  useEffect(() => {
    if (searchTerm.length >= 3 && type) {
      handleSearch(searchTerm, type);
    }
  }, [handleSearch, searchTerm, type]);

  const renderMovies = useMemo(() => {
    if (loading) {
      return (
        <div className='centered'>
          <Spinner
            width={60}
            height={60}
          />
        </div>
      );
    }

    const data =
      searchResults.length > 0
        ? searchResults.slice(0, 10)
        : mediaToShow.slice(0, 10);

    return data.map(media => (
      <div
        key={media.id}
        className='card'>
        <Link to={`/details/${media.id}`}>
          <div className='cardImgContainer'>
            {media.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                alt={media.title || media.name}
                className='cardImg'
              />
            ) : (
              <img
                src='/placeholder.jpg'
                alt='Placeholder'
                className='cardImg'
              />
            )}
          </div>
          <div className='cardTitleContainer'>
            <h3 className='cardTitle'>{media.title || media.name}</h3>
          </div>
        </Link>
      </div>
    ));
  }, [loading, searchResults, mediaToShow]);

  return (
    <>
      <SearchBar
        onSearch={(query: string) => handleSearch(query, type)}
        searchTerm={searchTerm}
        type={type}
      />
      <div className='cardsContainer'>{renderMovies}</div>
    </>
  );
};

export default MediaList;

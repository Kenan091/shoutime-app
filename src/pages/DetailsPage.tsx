import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
import Spinner from '../components/Spinner';
import YouTubeIframe from '../components/YouTubeIframe';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface DetailsParams {
  [key: string]: string | undefined;
}

interface DetailsPageProps {
  type: string;
}

const DetailsPage: FC<DetailsPageProps> = ({ type }) => {
  const { id } = useParams<DetailsParams>();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const placeholderText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim. Tortor id aliquet lectus proin nibh nisl condimentum. Semper risus in hendrerit gravida rutrum. Nunc congue nisi vitae suscipit. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Viverra vitae congue eu consequat ac felis donec et. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Aliquam id diam maecenas ultricies mi eget. Lorem ipsum dolor sit amet consectetur adipiscing.';

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (type: string) => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setContent(response.data);

        if (type === 'movie' || type === 'tv') {
          const videosResponse = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}/videos`,
            {
              params: {
                api_key: API_KEY,
              },
            }
          );
          setContent((prevContent: any) => ({
            ...prevContent,
            videos: videosResponse?.data?.results,
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(type);
  }, [id, type]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='container'>
      {content && (
        <>
          <div
            className='backButton'
            onClick={handleBack}>
            <IoIosArrowBack size={20} />
            <p className='backButtonText'>Back</p>
          </div>
          {loading ? (
            <div>
              <Spinner
                width={60}
                height={60}
              />
            </div>
          ) : (
            <div className='detailsContainer'>
              {content.videos && content.videos.length > 0 ? (
                <YouTubeIframe videoId={content.videos[0].key} />
              ) : content.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`}
                  alt={content.title || content.name}
                  className='detailsImg'
                />
              ) : (
                <img
                  src='/placeholder.jpg'
                  alt='Placeholder'
                  className='detailsImg'
                />
              )}
              <h2 className='detailsTitle'>{content.title || content.name}</h2>
              <p className='detailsOverview'>
                {content.overview ? content.overview : placeholderText}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsPage;

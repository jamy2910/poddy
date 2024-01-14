import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import FiltersDropdown from '../components/FiltersDropdown'
import { customFetch } from '../utils/customFetch'
import PodcastLoadingSpinner from '../components/PodcastLoadingSpinner'
import Podcasts from '../components/Podcasts'


const Explore = () => {

  // Hooks
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ sort: "", category: "", duration: "", page: 1 });

  useEffect(() => {
    const getPodcasts = async () => {
      setLoading(true);
      try {
        const { data } = await customFetch.get(`/podcast?sort=trending`);
        setPodcasts(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    getPodcasts();
  }, []);

  // Functions
  const filterPodcasts = async () => {
    const params = `?sort=${filters.sort}&category=${filters.category}&duration=${filters.duration}`;
    try {
      const { data } = await customFetch.get('/podcasts' + params);
      setPodcasts(data);
    } catch (error) {
      console.log(error)
    }
  }

  // JSX
  return (
    <>
      <SearchBar />

      <FiltersDropdown filterFunction={filterPodcasts} />

      {loading && <PodcastLoadingSpinner />}
      {!loading && <Podcasts podcastList={podcasts} />}
    </>



  )
}

export default Explore
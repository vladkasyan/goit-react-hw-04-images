import { Container } from './App.module';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsApiService from './api';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const postApiService = new PostsApiService();

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [, setTotalHits] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchGalleryItems = (searchQuery, galleryPage) => {
      setLoading(true);
      setError(false);

      postApiService
        .fetchPost(searchQuery, galleryPage)
        .then(data => {
          if (!data.totalHits) {
            setLoading(false);
            setError(true);
            return toast.warn(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }

          const newData = data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );

          setGalleryItems(prevGalleryItems => [
            ...prevGalleryItems,
            ...newData,
          ]);
          setTotalHits(data.totalHits);
          setIsButtonShow(galleryPage <= Math.ceil(data.totalHits / 12));
        })
        .finally(setLoading(false));
    };
    fetchGalleryItems(searchQuery, galleryPage);
  }, [searchQuery, galleryPage]);

  const formSubmit = searchQuery => {
    setSearchQuery('');
    setGalleryItems([]);
    setTotalHits(0);
    setGalleryPage(1);
    setError(false);
    setSearchQuery(searchQuery);
  };

  const onLoadMore = () => {
    setGalleryPage(prevGalleryPage => prevGalleryPage + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={formSubmit} />

      {error && <h2>Please, enter search word!</h2>}
      {galleryItems.length > 0 && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {isButtonShow && <Button onClick={onLoadMore} />}
      <ToastContainer autoClose={3000} theme="dark" />
    </Container>
  );
};

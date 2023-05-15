import { useState, useEffect } from 'react';
import { fetchImg } from './API/API.js';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Notify } from 'notiflix';
import style from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputVal, setInputval] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  // submitting form func
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.input.value;

    if (input.trim() === inputVal?.trim()) {
      setPage(1);
    } else {
      setImages([]);
      setSearch(input);
      setPage(1);
      setInputval(input);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetch = await fetchImg(search, page, 12);
        const updatedImages = fetch.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        setImages(prevImages =>
          page === 1 ? updatedImages : [...prevImages, ...updatedImages]
        );
      } catch (error) {
        Notify.failure(`Error occurred ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, search]);

  // enlarging image on click func
  const handleEnlargeImage = id => {
    const element = images.filter(image => {
      return image.id === id;
    });
    const click = element[0];
    setLargeImg(click);
    setModalOpen(true);
  };

  // load more button func
  const loadMore = () => {
    setIsLoading(true);
    try {
      setPage(page + 1);
    } catch (error) {
      Notify.failure(`Error occurred ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // closing modal window func
  const closeModal = e => {
    if (e.target.tagName !== 'IMG') {
      setModalOpen(false);
    }
  };

  return (
    <div className={style.wrapper}>
      {isModalOpen ? (
        <Modal clickImage={largeImg} handleClose={closeModal} />
      ) : null}
      <Searchbar handleSubmit={handleSubmit} />
      {isLoading && page <= 1 ? <Loader /> : null}
      {page > 1 || search ? (
        <ImageGallery>
          <ImageGalleryItem
            images={images}
            onClick={handleEnlargeImage}
            loading={isLoading}
          />
        </ImageGallery>
      ) : null}
      {isLoading && page > 2 ? <Loader /> : null}
      {images.length === 0 || !search ? null : (
        <Button handleClick={loadMore} />
      )}
    </div>
  );
};

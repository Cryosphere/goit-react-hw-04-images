import { Component } from 'react';
import { fetchImg } from './API/API.js';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Loader } from './Loader/Loader.jsx';
import Modal from './Modal/Modal.jsx';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Notify } from 'notiflix';
import style from './App.module.css';

const INITIAL_STATE = {
  images: [],
  search: '',
  page: 1,
  largeImage: '',
  isLoading: false,
  isModalOpen: false,
  error: null,
  inputVal: null,
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  // submitting form func
  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.input.value;

    if (input.trim() === this.state.inputVal?.trim()) {
      this.setState({ page: 1 });
    } else {
      this.setState({ images: [], search: input, page: 1, inputVal: input });
    }
  };

  // pressEsc = e => {
  //   if (e.key === 'Escape') {
  //     this.closeModal(e);
  //   }
  // };

  // updating component + fetch images from API
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.setState({ isLoading: true });
      try {
        const fetch = await fetchImg(this.state.search, this.state.page, 12);
        const updatedImages = fetch.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        this.setState(prevState => ({
          images:
            prevState.page === 1
              ? updatedImages
              : [...prevState.images, ...updatedImages],
        }));
      } catch (error) {
        Notify.failure(`Error occurred ${error}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  // enlarging image on click func
  handleEnlargeImage = id => {
    const element = this.state.images.filter(image => {
      return image.id === id;
    });
    const click = element[0];
    this.setState({ isModalOpen: true, largeImage: click });
    // document.addEventListener('keyup', this.pressEsc);
  };

  // load more button func
  loadMore = () => {
    this.setState({ isLoading: true });
    try {
      this.setState(({ page }) => ({ page: page + 1 }));
    } catch (error) {
      Notify.failure(`Error occurred ${error}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // closing modal window func
  closeModal = e => {
    if (e.target.tagName !== 'IMG') {
      // document.removeEventListener('keyup', this.pressEsc);
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const { images, page, largeImage, isModalOpen, isLoading } = this.state;
    return (
      <div className={style.wrapper}>
        {isModalOpen ? (
          <Modal clickImage={largeImage} handleClose={this.closeModal} />
        ) : null}
        <Searchbar handleSubmit={this.handleSubmit} />
        {isLoading && page <= 1 ? <Loader /> : null}
        <ImageGallery>
          <ImageGalleryItem
            images={images}
            onClick={this.handleEnlargeImage}
            loading={isLoading}
          />
        </ImageGallery>
        {isLoading && page > 2 ? <Loader /> : null}
        {images.length === 0 ? null : <Button handleClick={this.loadMore} />}
      </div>
    );
  }
}

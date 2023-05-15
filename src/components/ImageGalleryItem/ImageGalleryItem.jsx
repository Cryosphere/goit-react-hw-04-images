import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(image => (
    <li
      onClick={() => onClick(image.id)}
      key={image.id}
      className={style.ImageGalleryItem}
    >
      <img className={style.image} src={image.webformatURL} alt={image.tags} />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

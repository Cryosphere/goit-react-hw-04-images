import PropTypes from 'prop-types';
import style from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ clickImage, handleClose }) => {
  useEffect(() => {
    const pressEsc = e => {
      if (e.key === 'Escape') {
        handleClose(e);
      }
    };

    window.addEventListener('keyup', pressEsc);
    return () => {
      window.removeEventListener('keyup', pressEsc);
    };
  }, [handleClose]);

  return (
    <div onClick={e => handleClose(e)} className={style.Overlay}>
      <div className={style.Modal}>
        <img src={clickImage.largeImageURL} alt={clickImage.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  clickImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),

  handleClose: PropTypes.func.isRequired,
};

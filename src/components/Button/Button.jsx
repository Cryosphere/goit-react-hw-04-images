import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Button = ({ handleClick }) => {
  return (
    <button
      type="button"
      className={style.Button}
      onClick={() => handleClick()}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

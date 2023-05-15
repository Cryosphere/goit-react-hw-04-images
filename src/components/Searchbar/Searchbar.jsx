import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

export const Searchbar = ({ handleSubmit }) => {
  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.Button}>
          <span className={style.Button_label}>Search</span>
        </button>
        <input
          className={style.input}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus={true}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import style from './Modal.module.css';
import { Component } from 'react';

export default class Modal extends Component {
  pressEsc = e => {
    if (e.key === 'Escape') {
      this.props.handleClose(e);
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.pressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.pressEsc);
  }

  render() {
    return (
      <div onClick={e => this.props.handleClose(e)} className={style.Overlay}>
        <div className={style.Modal}>
          <img
            src={this.props.clickImage.largeImageURL}
            alt={this.props.clickImage.tags}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  clickImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),

  handleClose: PropTypes.func.isRequired,
};

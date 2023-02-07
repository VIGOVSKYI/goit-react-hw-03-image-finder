import PropTypes from 'prop-types';

import styles from './large-image.module.css';

const LargeImageForModal = ({ largeImage }) => {
  console.log(typeof largeImage);
  return (
    <div className={styles.largeImage}>
      <img className={styles.ItemImage} src={largeImage} alt="largeImage" />
    </div>
  );
};

export default LargeImageForModal;

LargeImageForModal.propTypes = {
  largeImage: PropTypes.string.isRequired,
};

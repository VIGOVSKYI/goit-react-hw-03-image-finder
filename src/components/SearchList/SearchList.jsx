import PropTypes from 'prop-types';

import styles from './search-list.module.css';

const SearchList = ({ items, showlargeImage }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL }) => (
    <li
      onClick={() => showlargeImage({ largeImageURL })}
      key={id}
      className={styles.galleryitem}
    >
      <img className={styles.img} src={webformatURL} alt="img" />
    </li>
  ));
  return <ul className={styles.gallery}>{elements}</ul>;
};

export default SearchList;

SearchList.propTypes = {
  showlargeImage: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

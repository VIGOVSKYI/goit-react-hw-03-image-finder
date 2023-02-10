import { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';

import { getImj } from '../shared/servises/img-api';
import SearchForm from '../SearchForm/SearchForm';
import SearchList from '../SearchList/SearchList';
import Modal from '../Modal/Modal';
import LargeImageForModal from '../largeImageForModal/largeImageForModal';

import styles from './img-search.module.css';

class ImgSearch extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImage: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImj();
    }
  }

  async fetchImj() {
    try {
      const { search, page } = this.state;
      this.setState({ loading: true });
      const data = await getImj(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImg = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  LoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showlargeImage = ({ largeImageURL }) => {
    this.setState({
      largeImage: largeImageURL,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImage: null,
    });
  };

  render() {
    const { items, loading, error, showModal, largeImage, totalHits } =
      this.state;
    const { searchImg, LoadMore, showlargeImage, closeModal } = this;
    let totalPages = Math.ceil(totalHits / items.length) || null;

    return (
      <>
        <SearchForm onSubmit={searchImg} />
        <SearchList items={items} showlargeImage={showlargeImage} />
        {error && <p>{error}</p>}
        {loading && (
          <div className={styles.spiner}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}

        {totalPages > 1 && (
          <button className={styles.button} onClick={LoadMore}>
            Load More
          </button>
        )}
        {showModal && (
          <Modal close={closeModal}>
            <LargeImageForModal largeImage={largeImage} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImgSearch;

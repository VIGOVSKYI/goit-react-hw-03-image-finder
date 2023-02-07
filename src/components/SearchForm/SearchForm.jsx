import {Component} from "react";
import PropTypes from "prop-types";

import styles from "./search-form.module.css";

class SearchForm extends Component {

  state = {
    search: "",
  };

  handlChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  };

  handlSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props
    onSubmit({ ...this.state })
    this.reset()
  };

    reset() {
        this.setState({search: "",})
  };

render() {
    const { search } = this.state;
    const { handlChange, handlSubmit } = this;
    
        return (
            <>
        <header className={styles.searchBar}>
          <form onSubmit={handlSubmit} className={styles.form}>
            <button type="submit" className={styles.button}>
              <span className={styles.buttonLabel}>Search</span>
            </button>

            <input
            value={search}
              name="search"
              className={styles.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={handlChange}
              required
            />
          </form>
        </header>
      </>

)}
};

export default SearchForm;

SearchForm.PropTopse = {
  onSubmit: PropTypes.func.isRequired,
};




     
     
     
     
     
     
     
     
     
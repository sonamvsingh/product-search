import { useState } from "react";
import { removeError, showError } from "../../utilities/error";

function ProductSearch(props) {
  const [titleToSearch, setTitleToSearch] = useState('');
  const { handleSearchProducts } = props;

  const prepareSearchParams = () => {
    // We customize the logic here in case of multiple params.
    return 'title=' + titleToSearch;
  }

  // Validate user input and throw error before we start the search.
  const validateUserInput = () => {
    removeError('title-error');

    // Basic empty check for now. We can add more required validations here.
    if (titleToSearch === '') {
      showError('title-error', 'Please fill in this field.');
      return;
    }
    // Invoke search handler with user provided search string.
    handleSearchProducts(prepareSearchParams());
  }

  return (
    <div className='product-search-wrapper'>
      <div className="row">
        <div className="search-field col-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text title" id="inputGroup-sizing-default">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={titleToSearch}
              onChange={e => setTitleToSearch(e.target.value)}
            />
          </div>
          <span id='title-error'/>
        </div>

        <div className='search-button-wrapper col-4'>
          <button onClick={e => validateUserInput(e)} className="btn btn-secondary search-btn">Search</button>
          <span id="inline-loader"/>
        </div>
      </div>
    </div>
  );
}

export default ProductSearch;


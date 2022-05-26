import './App.css';
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import ProductSearch from './components/product-search';
import { inlineLoader } from './utilities/inlineLoader';
import FullScreenLoader from './utilities/fullScreenLoader';
import ProductList from './components/product-list';

function App() {
  // Initialize all state variables.
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [pageOffset, setPageOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Function to invoke product API and set states.
  const getProductsFromApi = useCallback(() => {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
      searchBtn.disabled = true;
    }

    inlineLoader('#inline-loader', 'show');

    // Invoke API.
    axios.get('https://global.atdtravel.com/api/products?geo=en&' + query + '&offset=' + pageOffset)
      .then(function (result) {
        // Handle success.
        const { data, meta } = result.data;
        setItems(data);
        setError(null);
        setPageCount(Math.ceil(meta.total_count/meta.limit));
      })
      .catch(function (error) {
        // Handle error.
        setError(error);
        setItems([]);
      })
      .then(function () {
        // Always executed.
        setIsLoaded(true);
        inlineLoader('#inline-loader', 'hide');
        if (searchBtn) {
          searchBtn.disabled = false;
        }
      });
  }, [query, pageOffset]);

  useEffect(() => {
    // Fetch products once on page load.
    getProductsFromApi();
  }, [getProductsFromApi]);

  // Handler callback for pager page change.
  const handlePageChange = (event) => {
    const newOffset = event.selected * 10;
    setPageOffset(newOffset);
	};

  // Handler callback for search button.
  const handleSearchProducts = (searchParam) => {
    setQuery(searchParam);
    // Invoke products with new query param.
    getProductsFromApi();
  }

  // Show loader till we fetch intial products to display.
  if (!isLoaded) {
    return <FullScreenLoader/>;
  }

  return (
    <div className='product-listing-wrapper'>
      <h1 className='product-listing-title text-center'>Product Search</h1>
      <ProductSearch handleSearchProducts={handleSearchProducts}/>
      <ProductList
        items={items}
        error={error}
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        pageOffset={pageOffset}
      />
    </div>
  );
}

export default App;

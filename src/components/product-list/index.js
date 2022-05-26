import ReactPaginate from "react-paginate";

function ProductList(props) {
  const { items, error, pageCount, handlePageChange } = props;

  // Prepare error message from API data.
  const getErrorMessage = () => {
    const error_message = (error.response.data.err_desc !== undefined)
      ? error.response.data.err_desc
      : error.message;
    return error_message;
  }

  return (
    <>
      <div className='product-list container bg-white rounded box-shadow'>
        <div className="row bg-secondary product-list-header">
          <span className='image col-md-2 text-light'> Image </span>
          <div className="col-md-9 row">
            <span className='title col-md-9 text-light'> Title </span>
            <span className='destination col-md-3 text-light'> Destination </span>
          </div>
        </div>
        {error &&
          <div className="product-list-error">{getErrorMessage()}</div>
        }
        {items && items.map(item => (
          <div key={item.id} className="row text-muted pt-3">
            <div className='image col-md-2'>
              <img src={item.img_sml} alt='product'width="100" height="auto"/>
            </div>
            <div className="product-details col-md-9 row border-bottom border-gray">
              <div className='title col-md-9'> {item.title} </div>
              <div className='destination col-md-3'> {item.dest} </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pager">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination justify-content-center"
          activeClassName="active"
        />
      </div>
    </>
  );
}

export default ProductList;

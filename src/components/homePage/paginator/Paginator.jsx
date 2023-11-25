import ReactPaginate from "react-paginate";
import styles from "./Paginator.module.scss";

const Paginator = ({ currentPage, onPageChange, totalPages }) => {
  const maxDisplayedPages = 10;

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    onPageChange(newPage);
  };

  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={maxDisplayedPages}
      onPageChange={handlePageClick}
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      activeClassName={styles.active}
      breakClassName={styles.break}
    />
  );
};

export default Paginator;

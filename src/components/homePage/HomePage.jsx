import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PostList from "./postList/PostList";
import { useGetPosts } from "@/hooks/usePosts";
import style from "./home.module.scss";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";

const HomePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [searchText, setSearchText] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("searchText") || ""
      : ""
  );
  const { posts, getPosts, currentPage, postsPerPage } = useGetPosts();
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getPosts(currentPage, searchText).then((response) => {
      const totalPosts = response.headers["x-total-count"];
      setPageCount(Math.ceil(totalPosts / postsPerPage));
    });
  }, [currentPage, searchText]);

  const handlePageClick = ({ selected }) => {
    getPosts(selected + 1, searchText);
  };

  return (
    <div className={style.homepage}>
      <h1 className={style.homepage__title}>
        Добро подаловать на страницу новостей!
      </h1>
      <form onSubmit={handleSubmit(() => getPosts(currentPage, searchText))}>
        <div className={style.homepage__input}>
          <input
            className={style.homepage__input__item}
            type="text"
            placeholder="Введите тему новости"
            value={
              typeof localStorage !== "undefined"
                ? localStorage.getItem("searchText") || ""
                : ""
            }
            {...register("searchText", {
              maxLength: {
                value: 20,
                message: "Максимум 20 символов",
              },
            })}
            onChange={(e) => {
              setSearchText(e.target.value);
              setValue("searchText", e.target.value);
              localStorage.setItem("searchText", e.target.value);
              setPageCount(0);
            }}
          />
          <span className={style.homepage__input__icon}>
            <BsSearch />
          </span>
        </div>
      </form>
      {errors.searchText && <div>{errors.searchText.message}</div>}

      <PostList posts={posts} />
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={10}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName={style.pagination}
        pageClassName={style.page}
        activeClassName={style.active}
        breakClassName={style.break}
      />
    </div>
  );
};

export default HomePage;

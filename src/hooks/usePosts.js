import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "./INTERFACE";
import { useGetProfileById } from "./useProfile";

export function useGetPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("currentPage") || 1
      : 1
  );
  const postsPerPage = 10;

  const getPosts = async (page = 1, searchText = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/posts`, {
        params: { _page: page, _limit: postsPerPage, title_like: searchText },
      });
      setPosts(response.data);
      setCurrentPage(page);
      return response;
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      if (searchText) {
        setCurrentPage(1);
      }
      localStorage.setItem("currentPage", currentPage);
    }
  };

  return { getPosts, posts, isLoading, isError, currentPage, postsPerPage };
}

export function useGetPostById() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [post, setPost] = useState();
  const { getProfileById, setProfile, profile } = useGetProfileById();

  const getPostById = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`);
      const user = await getProfileById(response.data.userId);
      setProfile(user);
      setPost(response.data);
      return response;
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { getPostById, post, isLoading, isError, profile };
}

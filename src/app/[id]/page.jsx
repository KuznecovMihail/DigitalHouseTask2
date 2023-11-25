"use client";

import { useGetPostById } from "@/hooks/usePosts";
import React, { useEffect } from "react";
import AboutPage from "@/components/aboutPage/AboutPage";

export default function page({ params }) {
  const { getPostById, post, isLoading, isError, profile } = useGetPostById();

  useEffect(() => {
    const fetchData = async () => {
      await getPostById(params.id);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }
  return <AboutPage post={post} profile={profile} />;
}

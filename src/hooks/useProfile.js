import { useState } from "react";
import { BASE_URL } from "./INTERFACE";
import axios from "axios";

export function useGetProfileById() {
  const [profile, setProfile] = useState();

  const getProfileById = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      setProfile(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching profile data:", err);
      throw err;
    }
  };

  return { profile, getProfileById, setProfile };
}

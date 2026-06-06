import axios from "axios";

const API_URL =
  "http://localhost:5000/api/ratings";

// Get all ratings
export const getRatings = async () => {
  const response = await axios.get(
    API_URL
  );

  return response.data;
};

// Add rating
export const addRating = async (
  user_id,
  store_id,
  rating
) => {
  const response = await axios.post(
    API_URL,
    {
      user_id,
      store_id,
      rating,
    }
  );

  return response.data;
};

// Update rating
export const updateRating = async (
  user_id,
  store_id,
  rating
) => {
  const response = await axios.put(
    API_URL,
    {
      user_id,
      store_id,
      rating,
    }
  );

  return response.data;
};
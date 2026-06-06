import axios from "axios";

const API_URL =
  "http://localhost:5000/api/users";

// Get Users
export const getUsers = async () => {
  const response = await axios.get(
    API_URL
  );

  return response.data;
};

// Change Password
export const changePassword =
  async (data) => {
    const response =
      await axios.put(
        `${API_URL}/change-password`,
        data
      );

    return response.data;
  };
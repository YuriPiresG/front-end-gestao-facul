import axios from "axios";

export const getUserInfo = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users/me");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

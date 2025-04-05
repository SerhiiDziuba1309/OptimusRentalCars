import axios from "axios";

export const getBrands = async () => {
  try {
    const response = await axios.get(
      "https://car-rental-api.goit.global/brands"
    );
    return response.data;
  } catch (error) {
    console.error("Error while receiving:", error);
    throw new Error("Failed to get list");
  }
};

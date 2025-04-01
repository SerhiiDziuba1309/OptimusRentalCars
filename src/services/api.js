import axios from "axios";

export const getBrands = async () => {
  try {
    const response = await axios.get(
      "https://car-rental-api.goit.global/brands"
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
    throw new Error("Не удалось получить список брендов.");
  }
};

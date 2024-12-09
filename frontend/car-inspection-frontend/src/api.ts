import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL; // Adjust the URL as needed
console.log("BASE_URL", BASE_URL);

export const getCars = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cars`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

export const updateCarStatus = async (carId: number, criteria: any) => {
  try {
    await axios.put(`${BASE_URL}/criteriaValue/${carId}`, { criteria });
    alert("Car inspection updated!");
  } catch (error) {
    console.error("Error updating car status:", error);
  }
};

export async function fetchWithErrorHandling<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Unknown error occurred");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import ErrorLine from "./ErrorLine";
import { getCars } from "../api";

interface Car {
  id: number;
  name: string;
  status: number;
}

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await getCars();
        setCars(response);
      } catch (error: any) {
        setError(error.message);
      }
    }
    fetchCars();
  }, []);

  return error ? (
    <div className="mb-6">
      <ErrorLine message={error}/>
    </div>
  ) : (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
  
};

export default CarList;

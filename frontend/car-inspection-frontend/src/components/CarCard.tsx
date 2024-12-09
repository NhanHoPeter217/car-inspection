import React from "react";
import { Link } from "react-router-dom";

// import image
import image from "../images/Lambor.jpg";

interface Car {
  id: number;
  name: string;
  status: number;
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const getStatusLabel = (status: number): string => {
    switch (status) {
      case 0:
        return "Not Inspected";
      case 1:
        return "Inspecting";
      case 2:
        return "Inspected";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: number): string => {
    switch (status) {
      case 0:
        return "red-500";
      case 1:
        return "yellow-500";
      case 2:
        return "blue-900";
      default:
        return "gray-500";
    }
  }

  return (
<div className="m-auto overflow-hidden rounded-xl shadow-lg cursor-pointer h-auto w-72 md:w-80 mb-8 transition-all transform hover:scale-105">
  <div className="block w-full h-full">
    <img
      alt="Car image"
      src={image}
      className="object-cover w-full h-56 md:h-64 transition-transform duration-300 ease-in-out transform hover:scale-110"
    />
    <div className="w-full p-6 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center text-sm font-medium">
        <div className={`text-${getStatusColor(car.status)} uppercase tracking-wider`}>
          {getStatusLabel(car.status)}
        </div>
        <div className="flex items-center space-x-2">
          <span className="block p-1 border-2 border-white rounded-full transition duration-200 ease-in hover:border-gray-500">
            <div className={`block w-4 h-4 bg-${getStatusColor(car.status)} rounded-full`} />
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-6 items-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white hover:text-gray-600 transition-colors duration-200">
          {car.name}
        </h1>
        <Link to={`/${car.id}`}>
          <button className="px-4 py-2 text-xs font-semibold text-white uppercase bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all duration-200">
            Inspect
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default CarCard;

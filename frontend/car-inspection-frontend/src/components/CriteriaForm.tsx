import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { fetchWithErrorHandling, updateCarStatus } from "../api";

interface Criteria {
  id: number;
  name: string;
  is_good: boolean;
  note?: string;
}

interface CarInfoCriteria {
  carName: string;
  criterias: Criteria[];
}

const CriteriaForm: React.FC = () => {
  const { carId } = useParams<{ carId: string }>() as { carId: string };
  const navigate = useNavigate(); // Initialize useNavigate
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [carBrand, setCarBrand] = useState<string>("");

  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const validationErrors: string[] = [];
    criteria.forEach((criterion) => {
      if (criterion.is_good === null) {
        validationErrors.push(`Please inspect ${criterion.name} criteria`);
      }
      if (criterion.is_good === false && !criterion.note?.trim()) {
        validationErrors.push(`Please provide a note for ${criterion.name}`);
      }
    });
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await updateCarStatus(parseInt(carId), criteria);
    }
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
    setCriteria(updatedCriteria);
  };

  useEffect(() => {
    const fetchInspectionData = async () => {
      try {
        const { carName, criterias } = await fetchWithErrorHandling<CarInfoCriteria>(`/criteriaValue/${carId}`);
        setCriteria(criterias);
        setCarBrand(carName);
      }
      catch (error) {
        console.error("Error fetching inspection data:", error);
      }
    }

    fetchInspectionData();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl relative">
      {/* Go Back Button */}
      <button
        className="absolute top-4 left-4 px-3 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-400 transition-all"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h3 className="text-2xl font-semibold text-center mb-6 text-blue-600">{carBrand} Inspection</h3>

      {criteria.map((criterion, index) => (
        <div key={index} className="mb-6 p-6 border rounded-lg shadow-sm bg-gray-50 hover:shadow-lg transition-all">
          {/* Icon before criterion name */}
          <div className="flex items-center mb-4">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-3 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
            </svg> */}
            <label className="text-xl font-semibold">{criterion.name}</label>
          </div>

          {/* Checkbox for Good Inspection */}
          <label className="flex items-center mb-4 space-x-3">
            <input
              type="checkbox"
              name="checked-demo"
              className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
              checked={criterion.is_good}
              onChange={(e) => handleChange(index, "is_good", e.target.checked)}
            />
            <span className="font-normal text-gray-700">Good</span>
          </label>

          {/* Notes section for bad inspection */}
          {!criterion.is_good && (
            <div>
              <label className={criterion.note ? "hidden" : "text-sm text-red-500"}>* Write some notes</label>
              <textarea
                className="mt-2 w-full p-2 border rounded-md bg-white"
                placeholder="Enter a note"
                value={criterion.note}
                onChange={(e) => handleChange(index, "note", e.target.value)}
              />
            </div>
          )}
        </div>
      ))}

      {/* Display errors if any */}
      {errors.length > 0 && (
        <ul className="mt-4 mb-6">
          {errors.map((error, index) => (
            <li key={index} className="flex items-center mb-2">
              <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-red-500 bg-red-100 rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </span>
              <span className="ml-4 text-base font-medium text-red-500">{error}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          className="px-8 py-3 bg-indigo-600 rounded-md font-semibold text-white hover:bg-indigo-700 transition-all duration-200"
          onClick={handleSubmit}
        >
          Submit Inspection
        </button>
      </div>
    </div>
  );
};

export default CriteriaForm;
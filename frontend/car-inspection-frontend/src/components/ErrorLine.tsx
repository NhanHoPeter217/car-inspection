import React from "react";

interface ErrorLineProps {
    message: string;
}

const ErrorLine: React.FC<ErrorLineProps> = ({ message }) => {
  return (
    <div className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4" role="alert">
        <p className="font-bold">
            Error
        </p>
        <p>
            {message}
        </p>
    </div>
  );

};

export default ErrorLine;

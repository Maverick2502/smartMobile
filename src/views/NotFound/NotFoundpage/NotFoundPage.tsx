import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // RENDER
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] space-y-5">
      <p className="text-5xl">404</p>
      <p className="text-5xl">Страница не найдена</p>
      <button
        onClick={handleGoBack}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Назад
      </button>
    </div>
  );
}

import React from 'react';
import { useTypedSelector } from '@hooks';
import { useNavigate } from 'react-router-dom';

export function RepositoriesHeader() {
  const organizationName = useTypedSelector(({ github }) => github.organizationName);
  const search = useTypedSelector(({ github }) => github.search);
  const navigate = useNavigate();
  const handleGoHome = () => navigate('/');

  // RENDER
  return (
    <div className="mb-10 flex justify-between">
      <p className="text-5xl ">{organizationName || search}</p>
      <button onClick={handleGoHome} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Главная
      </button>
    </div>
  );
}

import React, { FormEvent } from 'react';
import { useTypedDispatch, useTypedSelector } from '@hooks';
import { githubActions } from '@store';
import { WindowSpinner } from '@components';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
const { changeSearch, searchSubmit } = githubActions;

export default function HomePage() {
  const dispatch = useTypedDispatch();
  const search = useTypedSelector(({ github }) => github.search);
  const isLoading = useTypedSelector(({ github }) => github.isLoading);
  const errorMessage = useTypedSelector(({ github }) => github.errorMessage);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && !errorMessage && search) {
      dispatch(searchSubmit(search, navigate));
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    dispatch(changeSearch(e.currentTarget.value));
  };

  // RENDER
  return (
    <>
      <div className="flex justify-center pt-20">
        <div className="w-[400px]">
          <form onSubmit={handleSubmit}>
            <label htmlFor="org-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
              Search
            </label>
            <div className="relative">
              <input
                value={search}
                onChange={handleChange}
                type="search"
                id="org-search"
                className={clsx(
                  'block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300',
                  errorMessage && 'border-red-500 text-red-600 dark:text-red-500 outline-red-500'
                )}
                placeholder="Введите название организации"
                disabled={isLoading}
                required
              />

              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Поиск
              </button>
            </div>
          </form>

          {errorMessage && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{errorMessage}</p>}
        </div>
      </div>
      <WindowSpinner open={isLoading} />
    </>
  );
}

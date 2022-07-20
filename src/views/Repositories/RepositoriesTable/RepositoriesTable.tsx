import { useTypedSelector } from '@hooks';
import React from 'react';
import { useMemo } from 'react';

export function RepositoriesTable() {
  const repositories = useTypedSelector(({ github }) => github.repositories);

  // prettier-ignore
  const tableParser = useMemo(() => repositories.map((rep) => (
        <tr key={rep.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td className="py-4 px-6">
            <a href={rep.svn_url} target="_blank" className='no-underline hover:underline'>{rep.name}</a>
          </td>
          <td className="py-4 px-6">{rep.description}</td>
          <td className="py-4 px-6">{rep.language}</td>
          <td className="py-4 px-6">{rep.stargazers_count}</td>
        </tr>
      )),
    [repositories]
  );

  // RENDER
  return (
    <div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Language
              </th>
              <th scope="col" className="py-3 px-6">
                Stars
              </th>
            </tr>
          </thead>
          <tbody>{tableParser}</tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { WindowSpinner } from '@components';
import { useTypedDispatch, useTypedSelector } from '@hooks';
import { RepositoriesTable } from '../RepositoriesTable/RepositoriesTable';
import { RepositoriesHeader } from '../RepositoriesHeader/RepositoriesHeader';
import { githubActions } from '@store';
const { getRepositories, resetState } = githubActions;

export default function RepositoriesPage() {
  const dispatch = useTypedDispatch();
  const search = useTypedSelector(({ github }) => github.search);
  const isLoading = useTypedSelector(({ github }) => github.isLoading);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getRepositories(search, controller.signal));
    return () => {
      dispatch(resetState());
      controller.abort();
    };
  }, []);

  // RENDER
  return (
    <div className="container mx-auto py-20">
      <RepositoriesHeader />
      <RepositoriesTable />
      <WindowSpinner open={isLoading} />
    </div>
  );
}

import React, { lazy, Suspense } from 'react';
import { WindowSpinner } from '@components';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@components';

const HomePage = lazy(() => import('@views/Home'));
const RepositoriesPage = lazy(() => import('@views/Repositories'));
const NotFoundpage = lazy(() => import('@views/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<WindowSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repositpries" element={<PrivateRoute />}>
          <Route path="/repositpries" element={<RepositoriesPage />} />
        </Route>
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </Suspense>
  );
}

import { useTypedSelector } from '@hooks';
import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteMemorized = () => {
  const hasRepository = useTypedSelector(({ github }) => github.hasRepository);
  return hasRepository ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateRoute = memo(PrivateRouteMemorized);

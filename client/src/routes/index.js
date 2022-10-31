import { useRoutes } from 'react-router-dom';

import publicRoutes from './publicRoutes';

export default function ThemeRoutes() {
  return useRoutes([...publicRoutes]);
}
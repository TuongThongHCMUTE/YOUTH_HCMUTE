import { useRoutes } from 'react-router-dom';

import publicRoutes from './publicRoutes';
import adminRoutes from './adminRoutes';

export default function ThemeRoutes() {
  return useRoutes([...publicRoutes, adminRoutes]);
}

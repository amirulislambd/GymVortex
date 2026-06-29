import { RequireRole } from '@/lib/core/session';


const AdminLayout = async({children}) => {
  await RequireRole("admin");
  return children;
};

export default AdminLayout;
import { RequireRole } from '@/lib/core/session';

const TrainerLayout = async ({ children }) => {
await RequireRole("trainer");
    return children
};

export default TrainerLayout;
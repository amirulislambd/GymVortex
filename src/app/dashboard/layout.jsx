import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Dashboard — GymVortex",
  description: "Manage your fitness journey on GymVortex.",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}

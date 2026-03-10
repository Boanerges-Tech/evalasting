import Navbar from "../components/layout/Navbar";
import DashboardShell from "../components/dashboard/dashboardShell";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0d0f14]">
      <main className="py-6">
        <DashboardShell />
      </main>
    </div>
  );
}
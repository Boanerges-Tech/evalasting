import AdminDashboardShell from "../components/admin/AdminDashboardShell";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#111217]">
      <main className="py-4 sm:py-6">
        <AdminDashboardShell />
      </main>
    </div>
  );
}
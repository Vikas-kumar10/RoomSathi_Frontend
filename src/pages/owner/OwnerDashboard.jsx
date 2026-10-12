import DashboardHeader from "../../components/ownerComponent/dashboard/DashboardHeader";
import DashboardStats from "../../components/ownerComponent/dashboard/DashboardStats";
import QuickActions from "../../components/ownerComponent/dashboard/QuickActions";
import MyRooms from "../../components/ownerComponent/dashboard/MyRooms";
import UpcomingVisits from "../../components/ownerComponent/dashboard/UpcomingVisits";
import RecentRequests from "../../components/ownerComponent/dashboard/RecentRequests";
import DashboardCTA from "../../components/ownerComponent/dashboard/DashboardCTA";

function OwnerDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        {/* <DashboardStats /> */}

        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-3">
          <MyRooms />
          <UpcomingVisits />
        </div>

        <RecentRequests />

        <DashboardCTA />
      </div>
    </main>
  );
}

export default OwnerDashboard;

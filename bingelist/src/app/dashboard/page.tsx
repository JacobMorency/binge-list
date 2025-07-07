import ClientLayout from "@/app/components/clientlayout";
import WatchListTabs from "@/app/components/dashboard/watchlisttabs";

export default function DashboardPage() {
  return (
    <ClientLayout header="BingeList">
      <WatchListTabs />
    </ClientLayout>
  );
}

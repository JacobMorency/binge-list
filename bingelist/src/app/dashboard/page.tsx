import ClientLayout from "@/app/components/clientlayout";
import WatchListTabs from "@/app/components/dashboard/watchlisttabs";

export default function DashboardPage() {
  return (
    <ClientLayout header="BingeList">
      <WatchListTabs />
      <main className="flex flex-col items-center justify-center flex-1 p-4"></main>
    </ClientLayout>
  );
}

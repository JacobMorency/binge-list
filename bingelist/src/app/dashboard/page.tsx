import ClientLayout from "@/app/components/clientlayout";

export default function DashboardPage() {
  return (
    <ClientLayout header="BingeList">
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <p>Welcome to your dashboard!</p>
      </main>
    </ClientLayout>
  );
}

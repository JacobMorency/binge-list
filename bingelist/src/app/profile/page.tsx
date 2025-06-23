import ClientLayout from "@/app/components/clientlayout";

export default function ProfilePage() {
  return (
    <ClientLayout header="Profile">
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <p>Welcome to your profile!</p>
      </main>
    </ClientLayout>
  );
}

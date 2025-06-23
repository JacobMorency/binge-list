import ClientLayout from "@/app/components/clientlayout";

export default function MovieDetailsPage() {
  return (
    <ClientLayout>
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h1 className="text-2xl font-bold">Movie Details</h1>
        <p className="mt-2">This page will display movie details.</p>
      </main>
    </ClientLayout>
  );
}

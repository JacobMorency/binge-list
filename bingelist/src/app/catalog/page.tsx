import ClientLayout from "@/app/components/clientlayout";

export default function CatalogPage() {
  return (
    <ClientLayout header="Catalog">
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <p className="text-primary-content">Welcome to your catalog!</p>
      </main>
    </ClientLayout>
  );
}

import Input from "@/app/components/ui/input";

export default function SearchInput() {
  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search for movies or shows..."
        className="input input-bordered input-primary w-full"
      />
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/button";
import { IoClose } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="primary"
      className="flex items-center gap-2"
      onClick={() => router.back()}
    >
      <IoClose size={20} />
      Back
    </Button>
  );
}

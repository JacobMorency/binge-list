import { House } from "lucide-react";
import {
  IoHomeOutline,
  IoHome,
  IoPerson,
  IoPersonOutline,
  IoSearch,
  IoSearchOutline,
  IoFilmOutline,
  IoFilm,
} from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname === path;
  return (
    <footer className="p-4 bg-base-200 text-primary-content fixed bottom-0 left-0 right-0 pb-6">
      <div className="flex justify-around items-center">
        <button onClick={() => router.push("/dashboard")}>
          {isActive("/dashboard") ? (
            <IoFilm size={24} />
          ) : (
            <IoFilmOutline size={24} />
          )}
        </button>
        <button onClick={() => router.push("/catalog")}>
          {isActive("/catalog") ? (
            <IoSearch size={24} />
          ) : (
            <IoSearchOutline size={24} />
          )}
        </button>
        <button onClick={() => router.push("/profile")}>
          {isActive("/profile") ? (
            <IoPerson size={24} />
          ) : (
            <IoPersonOutline size={24} />
          )}
        </button>
      </div>
    </footer>
  );
}

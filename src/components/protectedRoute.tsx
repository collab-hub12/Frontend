import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";
import { ComponentType } from "react";

export function ProtectedRoute<T>(Component: ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuth } = useAuth();
    console.log(isAuth);

    if (!isAuth && pathname.startsWith("/orgs")) {
      router.push("/");
      return;
    }
    return (
      <>
        <Component {...props!} />
      </>
    );
  };
}

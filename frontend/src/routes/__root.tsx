import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  ),
  beforeLoad: async ({ location }) => {
    console.log("Before loading the root route");
    if (location.pathname === "/") {
      throw redirect({
        to: "/home",
        search: undefined,
      });
    }
  },
});

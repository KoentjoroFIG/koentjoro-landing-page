import Navbar from "@/components/molecules/Navbar/Navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__app")({
  component: AppComponent,
});

function AppComponent() {
  return (
    <>
      <Navbar>
        <Outlet />
      </Navbar>
    </>
  );
}

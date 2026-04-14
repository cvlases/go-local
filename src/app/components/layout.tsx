import { Outlet } from "react-router";
import { Navigation } from "./navigation";
import { Footer } from "./footer";
import { AnnouncementBanner } from "./announcement-banner";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <AnnouncementBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

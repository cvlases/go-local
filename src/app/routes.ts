import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { ErrorBoundary } from "./components/error-boundary";
import { LandingPage } from "./pages/landing";
import { DirectoryPage } from "./pages/directory";
import { MapPage } from "./pages/map";
import { SubmitPage } from "./pages/submit";
import { EventsPage } from "./pages/events";
import { PartnersPage } from "./pages/partners";
import { NotFoundPage } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, Component: LandingPage, ErrorBoundary },
      { path: "directory", Component: DirectoryPage, ErrorBoundary },
      { path: "map", Component: MapPage, ErrorBoundary },
      { path: "submit", Component: SubmitPage, ErrorBoundary },
      { path: "extras", Component: EventsPage, ErrorBoundary },
      { path: "partners", Component: PartnersPage, ErrorBoundary },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
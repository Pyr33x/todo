type Route = Readonly<{
  title: string;
  path: string;
}>;

export const routes = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
  },
] satisfies Route[];

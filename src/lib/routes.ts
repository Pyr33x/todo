type Route = Readonly<{
  title: string;
  path: string;
}>;

export const routes = [
  {
    title: "Home",
    path: "/",
  },
] satisfies Route[];

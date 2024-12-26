import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, Outlet, useLocation } from "react-router";

const NavigationPath = [
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Project",
    path: "/project",
  },
  {
    name: "Experience",
    path: "/experience",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Skill",
    path: "/skill",
  },
  {
    name: "Social",
    path: "/social",
  },
];

const MainLayout = () => {
  const location = useLocation();
  const rootPath = location.pathname.split("/");
  const currentPath = rootPath[rootPath.length - 1];

  return (
    <div>
      <div className="border-b border-border">
        <Header />
      </div>
      <div className="flex min-h-[90vh] border-b border-border">
        <div className="border-r border-border w-[300px] hidden lg:block">
          <ScrollArea className="h-[90vh] w-full">
            <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 px-3">
              <nav className="grid gap-2 px-2">
                {NavigationPath?.map((nav) => (
                  <React.Fragment key={nav?.path}>
                    <Link to={nav.path}>
                      <Button
                        variant={
                          `/${currentPath}` === nav.path
                            ? "default"
                            : "secondary"
                        }
                        className="w-full"
                      >
                        {nav.name}
                      </Button>
                    </Link>
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </ScrollArea>
        </div>
        <div className="flex-1">
          <ScrollArea className="h-[90vh] w-full p-3">
            <Outlet />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

import { Button } from "@/components/ui/button";
import { TSidebarItem, TUserPath } from "@/types/user.types";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (
  items: TUserPath[],
  role: string,
  currentPath?: string
) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink to={`/${role}/${item.path}`}>
            <Button
              variant={currentPath === item.path ? "default" : "secondary"}
              className="w-full"
            >
              {item.name}
            </Button>
          </NavLink>
        ),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};

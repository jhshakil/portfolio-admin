import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <div className="border-b border-border">
        <Header />
      </div>
      <div className="flex min-h-[90vh] border-b border-border">
        <div className="border-r border-border w-[300px] hidden lg:block">
          <ScrollArea className="h-[90vh] w-full">
            {/* <Sidebar /> */}
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

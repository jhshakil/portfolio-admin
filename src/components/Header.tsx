import { cn } from "@/lib/utils";
import { verifyToken } from "@/lib/verifyToken";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";
import { Link } from "react-router";
import { Button, buttonVariants } from "./ui/button";

const Header = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user = null;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="px-11 py-4 flex justify-between items-center gap-6 lg:gap-11">
      {/* logo  */}
      <div>
        <h1 className="text-2xl font-medium">Jahid Hasan</h1>
      </div>

      {/* action button  */}
      <div className="flex gap-4 items-center">
        {user?.email ? (
          <div className="flex items-center gap-4">
            <Button onClick={handleLogout}>Log Out</Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className={cn(buttonVariants())}>
              Login
            </Link>
            <Link
              to="/registration"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hidden lg:block"
              )}
            >
              Registration
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

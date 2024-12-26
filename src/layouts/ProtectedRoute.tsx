import { verifyToken } from "@/lib/verifyToken";
import ForbiddenError from "@/pages/ForbiddenError";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router";

type TProtectedRoute = {
  children: ReactNode;
  role?: string | undefined;
};

const ProtectedRoute = ({ children, role = "ADMIN" }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  let user;

  if (token) {
    user = verifyToken(token);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <ForbiddenError />;
  }

  return children;
};

export default ProtectedRoute;

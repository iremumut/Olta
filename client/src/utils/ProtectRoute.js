import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";

function ProtectRoute() {
  let location = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectRoute;

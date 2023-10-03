import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    const token = Cookie.get("token");

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }

      if (token) {
        navigate("/");
      }
    }, [navigate, token]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);

  return (
    <div className="text-center flex justify-center items-center min-h-screen">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-7xl font-bold">404</h1>
          <p className="font-semibold tracking-wider">Page not found</p>
        </div>
        <Link to="/" className="text-sm underline text-blue-600">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

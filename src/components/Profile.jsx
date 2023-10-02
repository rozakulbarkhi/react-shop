import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/auth/authSlice";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="absolute my-1 space-y-1 right-0 bg-white rounded-md shadow-lg p-4">
      <div className="text-slate-600 py-2 px-12">
        <div className="whitespace-nowrap">
          Hello, <span className="font-semibold">{user}</span>
        </div>
      </div>
      <button
        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md w-full"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

Profile.propTypes = {
  user: propTypes.string.isRequired,
};

export default Profile;

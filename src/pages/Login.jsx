import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/actions/auth";
import Spinner from "../components/Spinner";
import Cookies from "js-cookie";

const Login = () => {
  const [data, setData] = useState({
    username: "johnd",
    password: "m38rmF$",
  });
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/products");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(data));

    setData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen border flex bg-slate-100 overflow-hidden">
      <div className="flex-1 flex justify-center items-center w-full md:mx-0 mx-4">
        <div className="flex flex-col space-y-6 bg-white md:px-20 px-8 md:py-12 py-6 rounded-lg shadow-md">
          <div className="tracking-wider">
            <h1 className="text-blue-800 font-bold text-3xl">Login</h1>
            <p className="font-medium text-sm">
              Log in to your account to continue.
            </p>
          </div>
          <form className="space-y-4 text-sm w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1">
              <label htmlFor="username" className="capitalize">
                username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleChange}
                autoFocus
                placeholder="tlacobtla"
                className="px-2 py-1 rounded-md outline outline-slate-200 placeholder:text-xs"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="capitalize">
                password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                placeholder="*****"
                className="px-2 py-1 rounded-md outline outline-slate-200 placeholder:text-xs"
              />
            </div>
            <div>
              <button
                disabled={data.username === "" || data.password === ""}
                className="bg-blue-800 hover:bg-blue-900 px-2 py-1 capitalize rounded-md w-full text-white my-1 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                login
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-blue-600 hover:text-blue-800 underline">
            <Link
              to="https://fakestoreapi.com/users"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check credentials
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 md:flex hidden justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80"
          alt="background login"
          className="h-screen w-full object-cover"
        />
      </div>

      {loading && <Spinner />}
    </div>
  );
};

export default Login;

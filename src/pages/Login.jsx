import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
        {
          method: "POST",
          data,
        }
      );

      console.log(response.data);

      setData({
        username: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.log(error.message);
      setData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="min-h-screen border flex bg-slate-100 overflow-hidden">
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="flex flex-col space-y-6 bg-white p-20 rounded-lg shadow-md">
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
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80"
          alt="background login"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

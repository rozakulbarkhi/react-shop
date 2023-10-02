import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { removeCart } from "../store/features/cart/cartSlice";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const cartRef = useRef(null);
  const profileRef = useRef(null);

  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const { user } = jwtDecode(token);
      setUser(user);
    }
  }, [navigate, token]);

  useEffect(() => {
    const handleOutsideCart = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
    };

    const handleOutsideProfile = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideCart);
    document.addEventListener("mousedown", handleOutsideProfile);

    return () => {
      document.removeEventListener("mousedown", handleOutsideCart);
      document.removeEventListener("mousedown", handleOutsideProfile);
    };
  }, []);

  const handleProfile = () => {
    setOpenProfile((prev) => !prev);
  };

  const handleCart = () => {
    setOpenCart((prev) => !prev);
  };

  const handleRemoveCart = (id) => {
    return () => dispatch(removeCart(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 py-3 px-12 bg-blue-800 flex justify-between items-center text-white border-b-2 border-slate-200 shadow-lg">
      <div>
        <Link to={"/"} className="text-xl font-bold uppercase tracking-widest">
          React Shop
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        <div className="relative" ref={cartRef}>
          <div onClick={handleCart} className="cursor-pointer">
            <AiOutlineShoppingCart className="text-2xl" />

            {cart?.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex justify-center items-center text-white text-xs">
                {cart?.length}
              </div>
            )}
          </div>

          {openCart && (
            <div className="absolute right-0 my-1 text-slate-600">
              <div className="bg-white rounded-md shadow-lg flex flex-col w-[480px] justify-between items-center bg-red p-4">
                <h1 className="font-semibold tracking-wider text-lg underline mb-4">
                  Shopping Cart
                </h1>
                <div className="h-[320px] overflow-auto w-full space-y-4">
                  {cart?.length > 0 ? (
                    cart?.map((item) => (
                      <div key={item.id} className="flex justify-between gap-4">
                        <div className="w-2/12">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-contain border p-2 rounded-md"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between text-sm">
                          <div className="font-medium">{item.title}</div>
                          <div>qty: {item.quantity}</div>
                        </div>
                        <div className="w-2/12 flex flex-col justify-center gap-2 text-sm">
                          <div>${item.price}</div>
                          <div>
                            <BsFillTrashFill
                              onClick={handleRemoveCart(item.id)}
                              className="text-base text-red-600 hover:text-red-700 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center w-full h-full">
                      <div className="text-sm tracking-wider">
                        Cart is empty... :(
                      </div>
                    </div>
                  )}
                </div>
                <div className="my-2 flex justify-between w-full">
                  <div>Subtotal:</div>
                  <div className="font-semibold">${totalPrice.toFixed(2)}</div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <button className="bg-blue-600 hover:bg-blue-700 w-full text-white px-2 py-1 rounded-md capitalize">
                    checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="cursor-pointer relative"
          onClick={handleProfile}
          ref={profileRef}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${user}`}
            alt="profile image"
            className="rounded-full h-10 w-10 object-cover"
          />

          {openProfile && (
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

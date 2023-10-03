import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { getUser } from "../store/features/auth/authSlice";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const cartRef = useRef(null);
  const profileRef = useRef(null);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

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

  return (
    <nav className="sticky top-0 z-50 py-3 md:px-12 px-6 bg-blue-800 flex justify-between items-center text-white border-b-2 border-slate-200 shadow-lg">
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

          {openCart && <Cart onClose={() => setOpenCart((prev) => !prev)} />}
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

          {openProfile && <Profile user={user} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

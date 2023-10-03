import propTypes from "prop-types";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../store/features/cart/cartSlice";
import toast from "react-hot-toast";

const Cart = ({ onClose }) => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveCart = (id) => {
    return () => {
      dispatch(removeCart(id));
      toast.error("Item removed from cart", {
        style: {
          fontSize: "12px",
        },
      });
    };
  };

  const handleCheckout = () => {
    toast.error("Sorry, this feature is not available yet :(", {
      style: {
        fontSize: "12px",
      },
    });
  };

  const handleOnClose = (e) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black backdrop-blur-sm bg-opacity-30 my-1 text-slate-600 px-1"
      id="container"
      onClick={handleOnClose}
    >
      <div className="bg-white rounded-md shadow-lg flex flex-col md:w-[480px] w-[360px] justify-between items-center bg-red p-4">
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
                    className="w-20 h-20 object-contain border p-1 rounded-md"
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
              <div className="text-sm tracking-wider">Cart is empty... :(</div>
            </div>
          )}
        </div>
        {totalPrice > 0 && (
          <div className="my-2 flex justify-between w-full">
            <div>Subtotal:</div>
            <div className="font-semibold">${totalPrice.toFixed(2)}</div>
          </div>
        )}
        <div
          onClick={handleCheckout}
          className="flex justify-center items-center w-full"
        >
          <button
            disabled={cart.length === 0}
            className="bg-blue-600 hover:bg-blue-700 w-full text-white px-2 py-1 rounded-md capitalize disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  onClose: propTypes.func.isRequired,
};

export default Cart;

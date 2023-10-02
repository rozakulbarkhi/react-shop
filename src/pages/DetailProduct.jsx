import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import NotFound from "../components/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProduct } from "../store/actions/product";
import { addToCart, totalPrice } from "../store/features/cart/cartSlice";

const DetailProduct = () => {
  const { id } = useParams();
  const [quantity, setquantity] = useState(1);
  const { product, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!product) return <NotFound />;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    dispatch(totalPrice());
  };

  const handleQuantity = (e) => {
    if (e.target.id === "plus") {
      setquantity((prev) => prev + 1);
    }

    if (e.target.id === "minus") {
      if (quantity === 1) return;
      setquantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex mx-auto h-[50vh] w-[50vw] bg-white border border-slate-200 rounded-xl shadow-lg">
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product?.image}
          alt={product.title}
          className="h-2/3 w-2/3 object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center px-16 space-y-8">
        <div>
          <h1 className="font-bold">{product.title}</h1>
          <div className="flex items-center space-x-1">
            {Array(product.rating)
              .fill()
              .map((_, i) => (
                <AiFillStar key={i} className="text-yellow-300 text-lg" />
              ))}

            <p className="">{product.rating?.rate}</p>
          </div>
        </div>
        <p className="text-xs tracking-wider">
          {product?.description?.substring(0, 250)}...
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className="text-base cursor-pointer px-2 rounded-md bg-slate-100 hover:bg-slate-200 border"
              onClick={handleQuantity}
              id="minus"
            >
              -
            </div>
            <div>{quantity}</div>
            <div
              className="text-base cursor-pointer px-2 rounded-md bg-slate-100 hover:bg-slate-200 border"
              onClick={handleQuantity}
              id="plus"
            >
              +
            </div>
          </div>
          <p className="">${product.price}</p>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleAddToCart}
            className="w-1/2 bg-blue-800 hover:bg-blue-900 capitalize text-sm rounded-md text-white px-2 py-1"
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/actions/products";

const Products = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-12 px-12">
      <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
        {products?.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product?.id}
            className="md:h-[320px] h-[240px] border border-slate-200 rounded-xl shadow-md hover:brightness-50 transition-all duration-300 ease-in-out"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-3/4 w-full object-cover rounded-t-xl"
            />
            <div className="bg-blue-800 h-1/4 rounded-b-lg text-white p-4 flex justify-between items-center shadow-md border-t-2 border-slate-200">
              <h3 className="truncate w-2/3">{product.title}</h3>
              <h3>${product.price}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;

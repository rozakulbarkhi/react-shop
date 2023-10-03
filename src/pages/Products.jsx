import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/products";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Products = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleClickCard = () => {
    window.scrollTo(0, 0);
  };

  if (loading) return <CardSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="md:py-12 py-6 md:px-12 px-6">
      <div
        className="grid md:grid-cols-4 grid-cols-1 gap-8"
        onClick={handleClickCard}
      >
        {products?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

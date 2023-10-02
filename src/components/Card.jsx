import propTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <Link
      to={`/products/${product?.id}`}
      className="md:h-[320px] h-[240px] border border-slate-200 rounded-xl shadow-md hover:brightness-50 transition-all duration-300 ease-in-out"
    >
      <img
        src={product?.image}
        alt={product?.name}
        className="h-3/4 w-full object-cover rounded-t-xl"
      />
      <div className="bg-blue-800 h-1/4 rounded-b-lg text-white p-4 flex justify-between items-center shadow-md border-t-2 border-slate-200">
        <h3 className="truncate w-2/3">{product?.title}</h3>
        <h3>${product?.price}</h3>
      </div>
    </Link>
  );
};

Card.propTypes = {
  product: propTypes.object.isRequired,
};

export default Card;

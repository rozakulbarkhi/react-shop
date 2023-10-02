import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-6 flex justify-center items-center">
      <div className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} React Store. Assets from{" "}
        <Link
          to={"https://unsplash.com/"}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          unsplash
        </Link>
        , API from{" "}
        <Link
          to={"https://fakestoreapi.com/"}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          fakestore
        </Link>
        .
      </div>
    </div>
  );
};

export default Footer;

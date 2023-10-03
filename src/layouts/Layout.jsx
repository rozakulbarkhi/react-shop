import propTypes from "prop-types";
import { Navbar, Footer } from "../components";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-slate-100">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
};

export default Layout;

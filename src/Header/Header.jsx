import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart, BookOpen } from "lucide-react";
import CartContext from "../context/CartContext";


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useContext(CartContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/products" },
    { name: "Blog", path: "/blogs" },
  ];

  // useEffect(() => {
  //   const updateCartCount = () => {
  //     const cart = getCart();

  //     const total = cart.reduce(
  //       (sum, item) => sum + item.quantity,
  //       0
  //     );

  //     setCartCount(total);
  //   };

  //   updateCartCount();

  //   window.addEventListener("storage", updateCartCount);

  //   return () => {
  //     window.removeEventListener("storage", updateCartCount);
  //   };
  // }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1C33] py-5 shadow-lg font-poppins">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between">

        {/* ✅ Logo */}
        <Link to="/" className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-[#C8A45A]" />
          <span className="text-xl font-bold text-white">
            IAS<span className="text-[#C8A45A]">Veda</span>
          </span>
        </Link>

        {/* ✅ Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="text-white/80 hover:text-[#C8A45A] transition"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* ✅ Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between text-white hover:text-[#C8A45A] transition"
          >
            <span>Cart</span>

            {totalItems > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-[#C8A45A] text-[#0B1C33] px-5 py-2 rounded-lg font-semibold hover:bg-[#b08f20] transition"
          >
            Login
          </Link>
        </div>

        {/* ✅ Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B1C33] border-t border-white/10 p-6 flex flex-col gap-4">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="text-white hover:text-[#C8A45A] transition"
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className="text-white hover:text-[#C8A45A] transition"
          >
            Cart
          </Link>

          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="bg-[#C8A45A] text-[#0B1C33] px-5 py-2 rounded-lg font-semibold text-center hover:bg-[#b08f20] transition"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
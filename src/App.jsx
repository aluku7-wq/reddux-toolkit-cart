import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";

const App = () => {
    const globalstate = useSelector((state) => state.cartState);
    const cartTotal = globalstate.reduce((acc, currentvalue) => {
        return acc + currentvalue.quantity;
    }, 0);
    return (
        <Router>
            <div className="flex bg-gray-100 justify-center items-center p-6 text-gray-700">
                <div className="flex max-w-[1200px] justify-between text-2xl font-bold w-full">
                    <Link to="/">Homepage</Link>
                    <Link to="/cart" className="flex">
                        <IoMdCart className="text-3xl mt-4" />
                        <div className="flex bg-orange-700 h-6 w-6 rounded-full justify-center items-center">
                            <p className="text-white text-[12px]">
                                {cartTotal}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
};

export default App;

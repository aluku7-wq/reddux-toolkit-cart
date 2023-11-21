import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../state/cartSlice";
import { CiSquareRemove } from "react-icons/ci";

const Cart = () => {
    //
    const dispatch = useDispatch();
    const globalstate = useSelector((state) => state.cartState);
    const { remove, increase, decrease, clear } = cartSlice.actions;
    console.log(globalstate);

    // cart total
    const cartTotal = globalstate.reduce((acc, currentvalue) => {
        return acc + currentvalue.price * currentvalue.quantity;
    }, 0);
    return (
        <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center mt-8 gap-[1px]">
            {globalstate.length < 1 && <h1>cart is empty</h1>}
            {globalstate.length > 0 && (
                <>
                    <div className="flex w-full bg-orange-600 text-white p-4 justify-between">
                        <div className="flex w-[30%]">title</div>
                        <div className="flex w-[20%]">price</div>
                        <div className="flex w-[20%]">quantity</div>
                        <div className="flex w-[20%]">subtotal</div>
                        <div className="flex w-[10%]"></div>
                    </div>
                    {globalstate.map((product) => {
                        return (
                            <div
                                className="flex w-full bg-gray-100 text-white p-4 justify-between"
                                key={product.id}
                            >
                                <div className="flex items-center w-[30%]">
                                    <div className="flex h-8 w-8 items-center justify-center">
                                        <img
                                            src={product.image}
                                            alt=""
                                            className="w-[60%] h-auto"
                                        />
                                    </div>
                                    <p className="text-[12px] max-w-[200px] text-gray-700">
                                        {product.title}
                                    </p>
                                </div>
                                <div className="flex w-[20%] text-gray-700">
                                    ksh. {product.price}
                                </div>
                                <div className="flex w-[20%] text-gray-700 items-center">
                                    <button
                                        className="p-2 bg-gray-800 text-white h-10 w-16 "
                                        onClick={() => {
                                            if (product.quantity > 1) {
                                                dispatch(decrease(product));
                                            } else {
                                                dispatch(remove(product));
                                            }
                                        }}
                                    >
                                        -
                                    </button>{" "}
                                    <p className="text-3xl">
                                        {product.quantity}
                                    </p>
                                    <button
                                        className="p-2 bg-gray-800 text-white h-10 w-16 "
                                        onClick={() =>
                                            dispatch(increase(product))
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="flex w-[20%] text-gray-700">
                                    ksh.{" "}
                                    {(product.price * product.quantity).toFixed(
                                        2
                                    )}
                                </div>
                                <div
                                    className="flex w-[10%] text-gray-700"
                                    onClick={() => dispatch(remove(product))}
                                >
                                    <CiSquareRemove className="text-5xl" />
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex flex-col w-[300px] float-right mt-8 bg-white p-1">
                        <div className="flex bg-orange-700 text-white w-full p-4">
                            Total
                        </div>
                        <div className="flex w-full p-4 py-8">
                            {cartTotal.toFixed(2)}
                        </div>

                        <div
                            className="flex w-full p-4 bg-purple-700 text-white"
                            onClick={() => dispatch(clear())}
                        >
                            clear cart
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;

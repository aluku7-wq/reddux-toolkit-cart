import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../state/cartSlice";

const Homepage = () => {
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(false);
    const handleFetch = async () => {
        try {
            setloading(true);
            const res = await axios.get("https://fakestoreapi.com/products");
            setproducts(res.data);
            setloading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleFetch();
    }, []);

    //
    const dispatch = useDispatch();
    const globalstate = useSelector((state) => state.cartState);
    const { add } = cartSlice.actions;
    console.log(globalstate);
    return (
        <div className="flex mx-auto max-w-[1200px] flex-col pt-6">
            <div className="grid grid-cols-3 gap-y-6 gap-x-4  ">
                {loading && <h1 className="text-3xl font-bold">loading</h1>}
                {products.map((product) => {
                    return (
                        <div
                            className="flex flex-col gap-2   justify-between"
                            key={product.id}
                        >
                            <div className="flex items-center h-[400px] bg-white justify-center rounded-lg">
                                <img
                                    src={product.image}
                                    alt=""
                                    className="w-[60%] h-auto max-h-[320px]"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-500">
                                {product.title}
                            </h2>
                            <p>ksh. {product.price}</p>
                            <button
                                className="bg-purple-900 text-white p-4"
                                onClick={() =>
                                    dispatch(add({ ...product, quantity: 1 }))
                                }
                            >
                                add to cart
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;

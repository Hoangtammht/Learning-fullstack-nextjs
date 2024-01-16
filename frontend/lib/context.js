import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  //Add out data for the state
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const increateQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreateQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  //Add product to cart
  const onAdd = (product, quantity) => {
    setTotalPrice(prevTotal => prevTotal + product.price * quantity);
    //Increate total quantity
    setTotalQuantity(prevTotal => prevTotal + quantity);
    //Check if the product has already been added to the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  const onRemove = (product) => {
    setTotalPrice(prevTotal => prevTotal - product.price);
    //Decrease
    setTotalQuantity(prevTotal => prevTotal - 1);
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
      console.log();
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increateQty,
        decreateQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantity,
        totalPrice,
        setQty
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);

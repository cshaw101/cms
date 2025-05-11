import { useEffect, useState } from "react";

const useDummyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error("Error fetching dummy products:", err));
  }, []);

  return products;
};

export default useDummyProducts;
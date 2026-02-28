import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductId } from "../store/slices/productSlice";

const Products = () => {
  const { productId } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setProductId(null));
    };
  }, [dispatch]);

  return (
    <div className="products-container">
      <h2>Products Page {productId}</h2>
    </div>
  );
};
export default Products;

import { axiosInstance } from "./Axios/Axios";
import { toast } from "react-toastify";

// Utility to handle adding to cart
export const addToCart = (id, token) => {
  if (!token) {
    return toast.info("Please login to add to cart");
  }

  return axiosInstance.get(`/products/find-by-id/${id}`).then((response) => {
    const product = response.data;
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
        toast.warning("Already added to cart");
    } else {
        
      cart.push({ ...product, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));

      const cartData = {
        UserId: localStorage.getItem("userId"),
        productId: cart.map((item) => item._id),
      };

      axiosInstance
        .get(`/cart/find-by-id/${cartData.UserId}`)
        .then((response) => {
          if (response.data) {
            axiosInstance
              .put(`/cart/update/${cartData.UserId}`, cartData)
              .then(() => {
                toast.success("Added to cart");
              });
          }
        })
        .catch((error) => {
          if (error.response.data.status === 404) {
            axiosInstance.post("/cart/create", cartData).then(() => {
              toast.success("Added to cart");
            });
          }
        });
    }
  });
};


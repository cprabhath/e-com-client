import { useState, useEffect, useCallback } from "react";
import { axiosInstance, useAxiosLoader } from "./Axios/Axios";
import { toast } from "react-toastify";
import Currency from "./Currency";
import Swal from "sweetalert2";
import { MD5 } from "crypto-js";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [qty, setQty] = useState(1);
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});
  const userId = localStorage.getItem("userId");
  const [basicModal, setBasicModal] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const toggleOpen = () => setBasicModal(!basicModal);

  useEffect(() => {
    getCart();
  }, []);

  const getTotalProductPrice = useCallback(() => {
    let total = 0;
    products.forEach((product) => {
      const qty = productQuantities[product._id] || 1;
      total += qty * product.price;
    });
    setTotalPrice(total);
  }, [products, productQuantities]);

  const getProducts = useCallback(() => {
    Promise.all(
      productIds.map((id) => axiosInstance.get(`/products/find-by-id/${id}`))
    )
      .then((responses) => {
        const productsArray = responses.map((response) => response.data);
        setProducts(productsArray);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [productIds]);

  useEffect(() => {
    if (productIds.length > 0) {
      getProducts();
    }
  }, [productIds, getProducts]);

  useEffect(() => {
    getTotalProductPrice();
  }, [products, productQuantities, getTotalProductPrice]);

  

  const getCart = () => {
    axiosInstance
      .get(`/cart/find-by-id/${userId}`)
      .then((response) => {
        setProductIds(response.data.productId);
      })
      .catch((error) => {
        toast.error("Your cart is empty!");
      });
  };

  const removeFromLocalStorage = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
      const index = cart.findIndex((item) => item._id === productId);
      if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(`Product with ID ${productId} removed from local storage.`);
      } else {
        console.log(`Product with ID ${productId} not found in local storage.`);
      }
    } else {
      console.log("Cart is empty or not found in local storage.");
    }
  };

  const removeItem = (e, productId) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/v1/cart/delete-by-id/${userId}/${productId}`)
          .then((response) => {
            toast.success(response.data.message);
            removeFromLocalStorage(productId);
            getCart();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            console.log(error);
          });
      }
    });
  };

  const updateQuantity = (productId, increment) => {
    getTotalProductPrice();
    setQty((prevQty) => {
      const currentQty = prevQty[productId] || 1;
      let newQty;

      if (increment) {
        newQty = currentQty + 1;
      } else {
        newQty = Math.max(currentQty - 1, 1);
      }

      return { ...prevQty, [productId]: newQty };
    });
    setProductQuantities((prevQuantities) => {
      const currentQty = prevQuantities[productId] || 1;
      const newQty = increment ? currentQty + 1 : Math.max(currentQty - 1, 1);
      return { ...prevQuantities, [productId]: newQty };
    });
  };

  const calculateTotalPrice = (productId, price) => {
    const qty = productQuantities[productId] || 1;
    return qty * price;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const prefix = "HP";
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000);
    const uniqueID = prefix + timestamp + randomPart;

    const PAYHERE_MERCHANT_ID = import.meta.env.VITE_PAYHERE_MERCHANT_KEY;
    const PAYHERE_SECRET = import.meta.env.VITE_PAYHERE_MERCHANT_SECRET;
    const order_id = uniqueID;
    const amount = parseFloat(totalPrice)
      .toLocaleString("en-us", { minimumFractionDigits: 2 })
      .replaceAll(",", "");
    const currency = import.meta.env.VITE_PAYHERE_CURRENCY;
    const hashedInput = MD5(
      PAYHERE_MERCHANT_ID +
        order_id +
        amount +
        currency +
        MD5(PAYHERE_SECRET).toString().toUpperCase()
    )
      .toString()
      .toUpperCase();

    const orderDetails = {
      sandbox: true,
      merchant_id: PAYHERE_MERCHANT_ID,
      return_url: "",
      cancel_url: "",
      notify_url: "",
      order_id: order_id,
      items: products.map((product) => product.name).join(", "),
      amount: String(amount),
      currency: currency,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      address: "",
      city: "",
      country: "",
      hash: hashedInput,
      delivery_address: "",
      delivery_city: "",
      delivery_country: "",
      custom_1: "",
      custom_2: "",
    };
    payhere.onCompleted = function onCompleted(orderId) {
      const orderDetails = {
        orderID: orderId,
        userID: userId,
        totalCost: totalPrice,
        products: products.map((product) => ({
          category : product.category,
          price: product.price,
          name: product.brand + " " + product.name,
          quantity: productQuantities[product._id] || 1,
        })),
      };

      const updates = products.map(product => {
        const orderedQuantity = productQuantities[product._id] || 0;
        return {
          productId: product._id,
          qtyOnHand: Math.max(product.qtyOnHand - orderedQuantity, 0)
        };
      });

      updates.forEach(update => {
        axiosInstance.put(`/products/updateQty/${update.productId}`, { qtyOnHand: update.qtyOnHand })
          .then(() => {
            console.log(`Quantity updated for product ${update.productId}!`);
          })
          .catch((error) => {
            console.error(`Error updating quantity for product ${update.productId}:`, error);
          });
      });
      

      axiosInstance
        .post("/orders/create", orderDetails)
        .then(() => {
          toast.success("Payment completed!");
          axiosInstance
            .delete(`/cart/delete-all/${userId}`)
            .then(() => {
              localStorage.removeItem("cart");
            })
            .catch((error) => {
              console.log(error);
            });
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    };

    // Payment window closed
    payhere.onDismissed = function onDismissed() {
      toast.error("Payment dismissed!");
    };

    // Error occurred
    payhere.onError = function onError(error) {
      toast.error(error.message);
    };

    try {
      if (
        first_name === "" ||
        last_name === "" ||
        email === "" ||
        phone === ""
      ) {
        toast.error("Please fill all the fields!");
        return;
      }
    payhere.startPayment(orderDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4 shadow-0 border">
              <div className="card-header py-3">
                <h5 className="mb-0">
                  Cart - {products && products.length} items
                </h5>
              </div>
              { 
                <div className="card-body">
                  {products.length == 0 ? (
                    <div>Not Item Founded!</div>
                  ) : (
                    products.map((product, index) => (
                      <div key={index}>
                        <div className="row">
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={product.imageUrls[0].url}
                                className="w-50"
                                alt="Blue Jeans Jacket"
                              />
                              <a href="#!">
                                <div className="mask"></div>
                              </a>
                            </div>
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p>
                              <strong>
                                {product.brand + " " + product.name}
                              </strong>
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm me-1 mb-2 shadow-0"
                              data-mdb-toggle="tooltip"
                              title="Remove item"
                              onClick={(e) => removeItem(e, product._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn btn-primary px-3 me-2 shadow-0"
                                onClick={() =>
                                  updateQuantity(product._id, false)
                                }
                                disabled={qty <= 1 ? true : false}
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <div className="form">
                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={qty[product._id] || 1}
                                  type="number"
                                  className="form-control"
                                  readOnly
                                />
                              </div>

                              <button
                                className="btn btn-primary px-3 ms-2 shadow-0"
                                onClick={() =>
                                  updateQuantity(product._id, true)
                                }
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <p className="text-start text-md-center">
                              <strong>
                                {product.price && (
                                  <Currency
                                    price={calculateTotalPrice(
                                      product._id,
                                      product.price
                                    )}
                                  />
                                )}
                              </strong>
                            </p>
                          </div>
                        </div>

                        <hr className="my-4" />
                      </div>
                    ))
                  )}
                </div>
              }
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 shadow-0 border">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>
                        {totalPrice && <Currency price={totalPrice} />}
                      </strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block shadow-0"
                  id="payhere-payment"
                  onClick={toggleOpen}
                  disabled={products.length == 0 ? true : false}
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for payments */}
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered size="xl">
          <MDBModalContent>
            <MDBModalBody>
              <div className="row d-flex justify-content-center my-4">
                <div className="col-md-8">
                  <div className="card mb-4 shadow-0 border">
                    <div className="card-body">
                      <form>
                        <div className="row mb-4">
                          <div className="col">
                            <div data-mdb-input-init className="form">
                              <label htmlFor="form6Example1" className="mb-2">
                                First Name
                              </label>
                              <input
                                type="text"
                                id="form6Example1"
                                className="form-control"
                                onChange={(e) => setFirst_name(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div data-mdb-input-init className="form">
                              <label htmlFor="form6Example2" className="mb-2">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="form6Example2"
                                className="form-control"
                                onChange={(e) => setLast_name(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col">
                            <div data-mdb-input-init className="form">
                              <label htmlFor="form6Example3" className="mb-2">
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="form6Example3"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div data-mdb-input-init className="form">
                              <label htmlFor="form6Example4" className="mb-2">
                                Phone Number
                              </label>
                              <input
                                type="number"
                                id="form6Example4"
                                className="form-control"
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block shadow-0"
                          id="payhere-payment"
                          onClick={(e) => handlePayment(e)}
                        >
                          Continue to checkout
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4 shadow-0 border">
                    <div className="card-header py-3">
                      <h5 className="mb-0">Summary</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                            <strong>
                              <p className="mb-0">(including VAT)</p>
                            </strong>
                          </div>
                          <span>
                            <strong>
                              {totalPrice && <Currency price={totalPrice} />}
                            </strong>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card mb-4 mb-lg-0 shadow-0 border">
                    <div className="card-body">
                      <p>
                        <strong>We accept</strong>
                      </p>
                      <img
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                        alt="Visa"
                      />
                      <img
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                        alt="American Express"
                      />
                      <img
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                        alt="Mastercard"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </section>
  );
};

export default Cart;

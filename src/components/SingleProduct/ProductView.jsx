import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../ApiService";
import Loader from "../Loader/Loader";
import Currency from "../Currency";
import { addToCart } from '../CartUtils';


const ProductView = () => {
  const { productId } = useParams();
  const [SelectedProduct, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const { data, loading, error } = useApi(`/products/find-by-id/${productId}`);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
    if (error) {
      toast.error(error);
    }
  }, [data, error]);

  const plus = (e) => {
    e.preventDefault();
    setQty(qty + 1);
  };

  const minus = (e) => {
    e.preventDefault();
    setQty(qty - 1);
  };

  const handleCard = (id, e) => {
    e.preventDefault();
    addToCart(id, token)
    
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="row gx-5">
              <aside className="col-lg-6">
                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                  <img
                    style={{
                      maxWidth: "50%",
                      maxHeight: "50%",
                      margin: "10px",
                    }}
                    className="rounded-4 fit"
                    src={
                      SelectedProduct.imageUrls &&
                      SelectedProduct.imageUrls[0].url
                    }
                  />
                </div>
                <div className="d-flex justify-content-center mb-3">
                  {SelectedProduct.imageUrls &&
                    SelectedProduct.imageUrls.map((image, index) => (
                      <img
                        key={index}
                        style={{
                          maxWidth: "10%",
                          maxHeight: "10%",
                          margin: "auto",
                        }}
                        className="rounded-4 fit"
                        src={image.url}
                      />
                    ))}
                </div>
              </aside>
              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <h4 className="title text-dark">
                    {SelectedProduct.brand + " " + SelectedProduct.name}
                  </h4>
                  <div className="d-flex flex-row my-3">
                    <div className="text-warning mb-1 me-2">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="ms-1"></span>
                    </div>
                    <span className="text-muted">
                      <i className="fas fa-shopping-basket fa-sm mx-1"></i>154
                      orders
                    </span>
                    {SelectedProduct.qtyOnHand <= 0 ? (
                      <span className="text-danger ms-2">Out of stock</span>
                    ) : (
                      <span className="text-success ms-2">In stock</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <span className="h5">
                      {
                        SelectedProduct.price && <Currency price={SelectedProduct.price} />
                      }
                    </span>
                  </div>

                  <hr />
                
                  <div className="row mb-4">
                    <div className="col-md-4 col-6 mb-3">
                      <label className="mb-2 d-block">Quantity</label>
                      <div
                        className="input-group mb-3"
                        style={{ width: "170px" }}
                      >
                        <button
                          className="btn btn-white border border-secondary px-3"
                          type="button"
                          id="button-addon1"
                          data-mdb-ripple-color="dark"
                          onClick={(e) => minus(e)}
                          disabled={
                            SelectedProduct.qtyOnHand <= 0
                              ? true
                              : false || qty <= 1
                              ? true
                              : false
                          }
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control text-center border border-secondary"
                          value={qty}
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          disabled={
                            SelectedProduct.qtyOnHand <= 0 ? true : false
                          }
                          readOnly
                        />
                        <button
                          className="btn btn-white border border-secondary px-3"
                          type="button"
                          id="button-addon2"
                          data-mdb-ripple-color="dark"
                          onClick={(e) => plus(e)}
                          disabled={
                            SelectedProduct.qtyOnHand <= 0 ? true : false
                          }
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button href="#" className="btn btn-primary shadow-0 me-2" onClick={(e) => handleCard(SelectedProduct._id, e)} disabled={SelectedProduct.qtyOnHand <= 0 ? true : false}>
                    <i className="me-1 fa fa-shopping-basket"></i> Add to cart
                  </button>
                  <a
                    href="#"
                    className="btn btn-light border border-secondary py-2 icon-hover px-3"
                  >
                    <i className="me-1 fa fa-heart fa-lg"></i> Save
                  </a>
                </div>
              </main>
            </div>
          )}
        </div>
      </section>
      <section className="bg-light border-top py-4">
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-12 mb-4">
              {loading ? (
                <Loader />
              ) : (
                <div className="card shadow-0 border">
                <div className="card-body">
                  <h5 className="card-title">Description</h5>
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: SelectedProduct.description }}>
                   
                  </p>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductView;

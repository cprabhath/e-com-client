import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Currency from "../Currency";
import Loader from "../Loader/Loader";
import useApi from "../ApiService";
import { addToCart } from '../CartUtils';

const Items = () => {
  const [products, setProducts] = useState([]);
  const { data, loading, error } = useApi(`/products/find-all`);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }

    if (error) {
      console.log(error);
    }

    setToken(localStorage.getItem("token"));
  }, [data, error]);

  const handleCard = (id, e) => {
    e.preventDefault();
    addToCart(id, token)
    
  };
  return (
    <>
      <section>
        <div className="container my-5">
          <header className="mb-4">
            <h3>New Arrivals</h3>
          </header>

          <div className="row">
            {loading ? (
              <Loader />
            ) : (
              products.map((product, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 d-flex">
                  <div className="card my-2 shadow-2-strong p-2">
                    <img
                      src={product.imageUrls[0].url}
                      className="card-img-top"
                      style={{ aspectRatio: 1 / 1 }}
                    />
                    <div className="card-body d-flex flex-column">
                      <Link to={`/product-view/${product._id}`}>
                        <h5 className="card-title">
                          {product.brand + " " + product.name}
                        </h5>
                      </Link>

                      <p className="card-text">
                        <Currency price={product.price} />
                      </p>
                      <p className="card-text">{product.category}</p>
                      <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        {
                          product.qtyOnHand === 0 ? <button
                          disabled
                          className="btn btn-danger shadow-0 me-1 text-light"
                        >
                          Out of Stock
                        </button> : <button
                          onClick={(e) => handleCard(product._id, e)}
                          className="btn btn-primary shadow-0 me-1"
                        >
                          Add to cart
                        </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="shopcategory-loadmore">Explore More</div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div
                className="card-banner bg-gray h-100"
                style={{
                  minHeight: "200px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  top: "50%",
                  backgroundImage:
                    "url(https://assets.afcdn.com/story/20140919/496324_w1888h1060c1cx574cy249.jpg)",
                }}
              >
                <div className="p-3 p-lg-5" style={{ maxWidth: "70%" }}>
                  <h3 className="text-dark">
                    Best products & brands in our store at 30% off
                  </h3>
                  <p>That`s true but not always</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row mb-3 mb-sm-4 g-3 g-sm-4">
                <div className="col-6 d-flex">
                  <div
                    className="card w-100 bg-primary"
                    style={{ minHeight: "200px" }}
                  >
                    <div className="card-body">
                      <h5 className="text-white">Gaming toolset</h5>
                      <p className="text-white-50">
                        Technology for cyber sport
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex">
                  <div
                    className="card w-100 bg-primary"
                    style={{ minHeight: "200px" }}
                  >
                    <div className="card-body">
                      <h5 className="text-white">Quality sound</h5>
                      <p className="text-white-50">All you need for music</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-success" style={{ minHeight: "200px" }}>
                <div className="card-body">
                  <h5 className="text-white">Buy 2 items, With special gift</h5>
                  <p className="text-white-50" style={{ minWeight: "400px" }}>
                    Buy one, get one free marketing strategy helps your business
                    improves the brand by sharing the profits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Items;

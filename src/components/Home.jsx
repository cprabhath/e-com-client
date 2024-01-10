import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer/Footer";
import SearchBar from "./Search";
import Loader from "./Loader/Loader";
import { axiosInstance } from "./Axios/Axios";
import { toast } from "react-toastify";
import { addToCart } from './CartUtils';
import Currency from "./Currency";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  const handleCard = (id, e) => {
    e.preventDefault();
    addToCart(id, token)
    
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query === "") {
      setIsSearching(false);
      setSearchResults([]);
    } else {
      setIsSearching(true);
      axiosInstance
        .get(`/products/search?query=${searchQuery}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      <header>
        <div className="p-3 text-center bg-white border-bottom">
          <div className="container">
            <div className="row gy-3">
              <div className="col-lg-2 col-sm-4 col-4">
                <a href="#" target="_blank" className="float-start">
                  <img src="./logo.png" height="35" alt="Logo" />
                </a>
              </div>
              <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                <div className="justify-content spece-between">
                  <div className="d-flex float-end">
                    
                    <Link
                      to="/cart"
                      className="border rounded py-1 px-3 nav-link d-flex align-items-center me-2"
                    >
                      {" "}
                      <i className="fas fa-shopping-cart m-1 me-md-2 "></i>
                      <p className="d-none d-md-block mb-0">
                        MY CART{" "}
                        <span className="badge badge-danger">
                          {/* {cart == 0 ? "" : cart} */}
                        </span>
                      </p>{" "}
                    </Link>
                    {token ? (
                      <MDBDropdown className="shadow-0">
                        <MDBDropdownToggle
                          color="light"
                          className="border rounded py-1 px-3 nav-link d-flex align-items-center"
                        >
                          {" "}
                          <i className="fas fa-user m-1 me-md-2"></i>
                          Profile
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <Link to="/profile">
                            <MDBDropdownItem link>Profile</MDBDropdownItem>
                          </Link>
                          <MDBDropdownItem
                            onClick={(e) => handleLogout(e)}
                            link
                          >
                            Sign out
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    ) : (
                      <Link
                        type="button"
                        className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                        to="/login"
                      >
                        {" "}
                        <i className="fas fa-user-alt m-1 me-md-2"></i>
                        <p className="d-none d-md-block mb-0">Sign in</p>{" "}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-12"></div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {" "}
              <span className="navbar-toggler-icon"></span>{" "}
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ marginLeft: "100px" }}
              >
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-us">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${isSearching ? "searching" : ""}`}>
            <SearchBar onSearch={handleSearch} />
          </div>
        </nav>
      </header>

      <div className={`${isSearching ? "searching" : ""}`}>
        {isSearching && searchResults.length === 0 && <Loader />}
      </div>
      <div>
        <div style={{ display: isSearching ? "none" : "block" }}>
          <Outlet />
        </div>
        {isSearching && searchResults.length > 0 && (
          <div className="row" style={{ marginLeft: "90px" }}>
            <div className="row" style={{ marginLeft: "90px" }}>
              {searchResults.map((product, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 d-flex">
                  <div className="card w-100 my-2 shadow-2-strong p-2">
                    <img
                      src={product.imageUrls[0].url}
                      className="card-img-top"
                      style={{ aspectRatio: 1 / 1 }}
                    />
                    <div className="card-body d-flex flex-column">
                      <Link
                        to={`/product-view/${product._id}`}
                        onClick={() => setIsSearching(false)}
                      >
                        <h5 className="card-title">
                          {product.brand + " " + product.name}
                        </h5>
                      </Link>
                      <p className="card-text">
                        <Currency price={product.price} />
                      </p>
                      <p className="card-text">{product.category}</p>
                      <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        <button onClick={(e)=> handleCard(product._id, e)} className="btn btn-primary shadow-0 me-1">
                          Add to cart
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;

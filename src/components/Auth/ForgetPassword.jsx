import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance, useAxiosLoader } from "../Axios/Axios";
import "./Login.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isloading] = useAxiosLoader();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.info("Please fill all the fields");
    } else {
      axiosInstance
        .post("/users/forgot", { email })
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  return (
    <div className="login">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card border-0">
            <div className="card-body p-0">
              <div className="row no-gutters">
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="mb-4">
                      <h3 className="h4 font-weight-bold text-theme">
                        Reset you Password
                      </h3>
                    </div>
                    <form>
                      <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                     
                      <button
                        type="submit"
                        className="btn btn-primary btn-theme btn-block mb-3"
                        onClick={(e) => handleSubmit(e)}
                        disabled= { isloading ? true : false}
                      >
                        Send Email
                      </button>
                      <Link to="/login" className="text-primary">
                        Back on Track?
                      </Link>
                    </form>
                  </div>
                </div>

                <div className="col-lg-6 d-none d-lg-inline-block">
                  <div className="account-block rounded-right">
                    <div className="overlay rounded-right"></div>
                    <div className="account-testimonial">
                      <p className="lead text-white">
                        {
                          "Reset your password and get back to your account by clicking the link we just emailed to you."
                        }
                      </p>
                      <p>- Happy Shop</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-muted text-center mt-3 mb-0">
            Don`t have an account?{" "}
            <Link to="/register" className="text-primary ml-1">
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ForgetPassword;

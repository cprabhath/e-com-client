import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance, useAxiosLoader } from "../Axios/Axios";
import "./Login.css";

const ResetPassword = () => {
  const { token, email } = useParams();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isloading] = useAxiosLoader();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "" || repeatPassword === "") {
      return toast.info("Please fill all the fields");
    } else if (password !== repeatPassword) {
      return toast.info("Password does not match");
    }
    const user = {
      email,
      password,
    };

    axiosInstance
      .post(`/users/reset/${token}/${email}`, user)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
                          Create a new password
                        </h3>
                      </div>
                      <form>
                        <div className="form-group mb-3">
                          <label htmlFor="exampleInputEmail1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="exampleInputPassword1">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setRepeatPassword(e.target.value)}
                          />
                        </div>
                        <button
                          onClick={(e) => handleSubmit(e)}
                          className={
                            isloading
                              ? "btn btn-primary btn-user btn-block disabled  mb-3"
                              : "btn btn-primary btn-user btn-block  mb-3"
                          }
                        >
                          {isloading ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Reset your password"
                          )}
                        </button>
                        <Link to="/login" className="text-primary">
                          Login
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
                            "“This is a great theme with a lot of features to cover all your needs and a very clean design.”"
                          }
                        </p>
                        <p>- Happy Shop</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

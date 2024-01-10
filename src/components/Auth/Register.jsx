import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import validateFields from "../Config/Validation";
import { toast } from "react-toastify";
import { axiosInstance } from "../Axios/Axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = firstName + " " + lastName;
    
    const data = {
      fullName,
      email,
      password,
    };

    const isValid = validateFields(data, [
      {
        condition: () => password === confirmPassword,
        errorMessage: "Password and Confirm Password should be same",
      },
    ]);

    if (isValid) {
      axiosInstance
        .post("/users/register", data)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.message);
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
                          Register
                        </h3>
                      </div>
                      <form>
                        <div className="form-group mb-3 row">
                          <div className="col">
                            <label htmlFor="first">First Name</label>
                            <input
                              type="email"
                              className="form-control"
                              id="first"
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="last">Last Name</label>
                            <input
                              type="email"
                              className="form-control"
                              id="last"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="email">Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) => setEmailAddress(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-3 row">
                          <div className="col">
                            <label htmlFor="pass">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="pass"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="confirm">Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirm"
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-theme btn-block mb-3"
                          onClick={(e) => handleSubmit(e)}
                        >
                          Register
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <p className="lead text-white">
                          {
                            "Join the HappyShop family where every shopping experience brings a smile. Register now to unlock a world of exclusive deals, personalized selections, and joyous discoveries. Be part of a community where happiness is just a click away. Sign up, dive into the joy of shopping, and turn your everyday into a parade of delights with HappyShop!"
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
              Already have an account?{" "}
              <Link to="/login" className="text-primary ml-1">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

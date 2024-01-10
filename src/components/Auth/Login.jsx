import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { axiosInstance } from "../Axios/Axios";
import { toast } from "react-toastify";
import validateFields from "../Config/Validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    const isValid = validateFields(data);

    if (isValid) {
      axiosInstance
        .post("/users/login", data)
        .then((response) => {
          if(!response.data.message.token){
            return toast.error("Invalid Credentials")
          }
          localStorage.setItem("userId", response.data.message.selectedUser._id);
          localStorage.setItem("token", response.data.message.token);
          localStorage.setItem("UserName", response.data.message.selectedUser.fullName);
          localStorage.setItem("UserImage", response.data.message.selectedUser.imageUrl);
          navigate("/");
        })
        .catch((error) => {
          if(error.response === undefined){
            return toast.error(error.message);
          }
          toast.warning(error.response.data.message);
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
                          Login
                        </h3>
                      </div>

                      <h6 className="h5 mb-4">Welcome back!</h6>

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
                        <div className="form-group mb-3">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-theme btn-block mb-3"
                          onClick={(e) => handleSubmit(e)}
                        >
                          Login
                        </button>
                        <Link to="/forgot-password" className="text-primary">
                          Forgot password?
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
                            "Unleash the joy of shopping online, where every click is a step towards discovering something wonderful. Indulge in a world where convenience meets style, and every purchase is a celebration. Don't just browse, bring the magic home. The best deals and delightful finds are just a click away – embrace the thrill of shopping now!"
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

export default Login;

import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";

const SingleProduct = lazy(() =>
  import("./components/SingleProduct/ProductView")
);
const Main = lazy(() => import("./components/Home/Main"));
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const ForgotPassword = lazy(() => import("./components/Auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Category = lazy(() => import("./components/Category"));
const Brands = lazy(() => import("./components/Brands"));
const Cart = lazy(() => import("./components/Cart"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token/:email" element={<ResetPassword/>} />
          <Route path="/" element={<Home />}>
            <Route index element={<Main />} />
            <Route
              path="product-view/:productId"
              element={<SingleProduct />}
            />
            <Route path="profile" element={<Profile/>} />
            <Route path="contact-us" element={<ContactUs/>} />
            <Route path="about-us" element={<AboutUs/>} />
            <Route path="category" element={<Category/>} />
            <Route path="brands" element={<Brands/>} />
            <Route path="cart" element={<Cart/>} />
          </Route>
          <Route path="*" element={<div>Not Found</div>}/>
        </Routes>
      <ToastContainer className="toast-position" position="bottom-right" />
    </Suspense>
  );
}

export default App;

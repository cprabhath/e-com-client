import { useState } from "react";
import { axiosInstance } from "./Axios/Axios";
import { toast } from "react-toastify";

const ContactUs = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            message
        }
        axiosInstance.post("/inquiries/create", data)
            .then((response) => {
                if (response.data.message) {
                    toast.success(response.data.message);
                    setName("");
                    setEmail("");
                    setMessage("");
                }
                
            })
            .catch((error) => {
                toast.error("Something went wrong with "+ error.message);
            })
    }

  return (
    <section>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="wrapper">
              <div className="row no-gutters mb-5">
                <div className="col-md-7">
                  <div className="contact-wrap w-100 p-md-5">
                    <h3 className="mb-4">Make your inquiry</h3>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="name">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="name"
                              placeholder="Name"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="email">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                       
                        <div className="col-md-12 mt-3">
                          <div className="form-group">
                            <label className="label" htmlFor="#">
                              Message
                            </label>
                            <textarea
                              name="message"
                              className="form-control"
                              id="message"
                              cols="30"
                              rows="4"
                              placeholder="Message"
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12 mt-3">
                          <div className="form-group">
                            <button
                             onClick={(e) => handleSubmit(e)}
                              className="btn btn-primary btn-outline-primary btn-block"
                            >
                                Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-stretch">
                  <div id="map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7933.265384048943!2d80.34251820243536!3d6.179894251808368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae165c8411f137f%3A0xd1ce7cb3071dd5f7!2sIndia%20Walk%20Estate%20Bungalow!5e0!3m2!1sen!2slk!4v1704635664936!5m2!1sen!2slk"
                      width="600"
                      height="450"
                      style={{ border: "0" }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="dbox w-100 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-map-marker"></span>
                    </div>
                    <div className="text">
                      <p>
                        <span>Address:</span>Amarasiri Dodangoda Mawatha,
                        Udugama 80070
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dbox w-100 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-phone"></span>
                    </div>
                    <div className="text">
                      <p>
                        <span>Phone:</span>{" "}
                        <a href="tel://1234567920">+ 94 76 6 938 974</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dbox w-100 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-paper-plane"></span>
                    </div>
                    <div className="text">
                      <p>
                        <span>Email:</span>{" "}
                        <a href="mailto:cprabhath119@gmail.com">
                          cprabhath119@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dbox w-100 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-globe"></span>
                    </div>
                    <div className="text">
                      <p>
                        <span>Website</span>{" "}
                        <a
                          href="https://cprabhath.github.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          cprabhath.github.io
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

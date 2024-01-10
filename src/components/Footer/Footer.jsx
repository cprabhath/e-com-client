const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-muted"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="">
        <div className="container">
          <div className="d-flex justify-content-between py-4 border-top">
            <div>
              <i className="fab fa-lg fa-cc-visa text-dark me-1"></i>
              <i className="fab fa-lg fa-cc-amex text-dark me-1"></i>
              <i className="fab fa-lg fa-cc-mastercard text-dark me-1"></i>
              <i className="fab fa-lg fa-cc-paypal text-dark"></i>
            </div>
            <div>
              Design and Developed by :{" "}
              <a href="https://cprabhath.github.io" className="text-dark">
                Prabhath Hettiarachchi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

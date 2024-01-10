const AboutUs = () => {
  return (
    <>
      <div className="bg-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 px-5 mx-auto">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/react-pos-70e5e.appspot.com/o/images%2Flogo.png?alt=media&token=f19171a1-4313-496c-b6c0-6fe80803bc0e"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="font-weight-light">Who we are</h2>
              <p className="font-italic text-muted mb-4">
                HappyShop is a family-owned business that has been bringing
                smiles to our customers since 2023. We specialize in Mobile
                Phones, Laptops and more, everything you need for a fun-filled
                celebration! At HappyShop, customer satisfaction is our top
                priority. We stand behind every product we sell and strive to
                make every shopping experience fun and memorable. We can`t wait
                to help you with your next celebration! Come visit us in-store
                or shop online today to see what HappyShop can do for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col">
              <h2 className="display-4 font-weight-light">Our team</h2>
              <p className="font-italic text-muted">
                The HappyShop team is a group of party planning experts
                dedicated to bringing joy to every celebration. Our friendly,
                knowledgeable staff have years of experience helping customers
                find the perfect products for birthdays, holidays, and all of
                life`s special moments. We take pride in our excellent customer
                service and aim to make every interaction upbeat and fun. The
                HappyShop team loves what we do - spreading smiles comes
                naturally to us!
              </p>
            </div>
          </div>

          <div className="row text-center">
          <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Prbhath Hettiarachchi</h5>
                <span className="small text-uppercase text-muted">
                  CEO - Founder
                </span>
                
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Sithara Dilmini</h5>
                <span className="small text-uppercase text-muted">
                  Cheif Quality Assurance
                </span>
               
              </div>
            </div>

        
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Akalanka Nagahawatta</h5>
                <span className="small text-uppercase text-muted">
                  Cheif Marketing Officer
                </span>
               
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png"
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Chathura Sandaruwan</h5>
                <span className="small text-uppercase text-muted">
                  Cheif Financial Officer
                </span>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

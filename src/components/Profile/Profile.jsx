import { useEffect, useState } from "react";
import { axiosInstance } from "../Axios/Axios";
import History from "./History";
import { toast } from "react-toastify";
import ImageUploader from "../ImageUploader";

const Profile = () => {
  const [getProfile, setGetProfile] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleImageUrlChange = (newImageUrl) => {
    setImageUrl(newImageUrl);
  };

  useEffect(() => {
    setGetProfile(localStorage.getItem("userId"));
    axiosInstance
      .get(`/users/find-one/${getProfile}`)
      .then((response) => {
        if (!response.data.message) {
          return toast.error("No data found");
        }
        setFullName(response.data.message.fullName);
        setEmail(response.data.message.email);
        setMobileNumber(response.data.message.mobileNumber);
        setAddress(response.data.message.address);
        setImageUrl(response.data.message.imageUrl);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [getProfile]);

  const editProfile = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    if (isEditing){
      const data = {
        fullName,
        email,
        mobileNumber,
        imageUrl,
        address,
      };

      axiosInstance.put(`/users/update/${userId}`, data)
        .then((response) => {
          if (response.data.message) {
            toast.success(response.data.message);
            setIsEditing(false);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
      }
    }

  return (
    <div className="container mt-4">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card shadow-0 border">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  {
                    isEditing ? <ImageUploader onImageUrlChange={handleImageUrlChange} /> :
                    <img
                    src={imageUrl && imageUrl }
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  }
                  <div className="mt-3">
                    <h4>{fullName ? fullName : "Not Available"}</h4>
                    <p className="text-secondary mb-1">
                      {email ? email : "Not Available"}
                    </p>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <button
                        className="btn btn-info"
                        onClick={(e) => editProfile(e)}
                      >
                        {isEditing ? "Save Profile" : "Edit Profile"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3 shadow-0 border">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                      isEditing ? 
                      <div className="form">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your Name"
                        value={fullName ? fullName : ""}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      
                    </div>
                      : fullName ? fullName : "Not Available"

                    }
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                    email ? email : "Not Available"
                    }
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mobile</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                     isEditing ? 
                     <div className="form">
                     <input
                       type="number"
                       className="form-control"
                       placeholder="Enter your Mobile Number"
                        value={mobileNumber ? mobileNumber : ""}
                        onChange={(e) => setMobileNumber(e.target.value)}
                     />
                     
                   </div>
                     :
                    mobileNumber ? mobileNumber : "Not Available"}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                     isEditing ? 
                     <div className="form">
                     <input
                       type="number"
                       className="form-control"
                       placeholder="Enter your Mobile Number"
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                     />
                     
                   </div>
                     :
                    address ? address : "Not Available"
                      }
                  </div>
                </div>
              </div>
            </div>

            <div className="row gutters-sm">
              <div className="col-sm-12 mb-3">
                <div className="card h-100 shadow-0 border">
                  <div className="card-body">
                    <History />
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

export default Profile;

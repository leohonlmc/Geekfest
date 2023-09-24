import "../User.css";
import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AWS from "aws-sdk";
import ViewIcon from "./popup/ViewIcon";
import Header from "./partial/Header";

const {
  REACT_APP_API_ENDPOINT,
  REACT_APP_ACCESS_ID,
  REACT_APP_SECRET_ACCESS_ID,
  REACT_APP_REGION,
} = process.env;
const token = localStorage.getItem("token");

AWS.config.update({
  accessKeyId: REACT_APP_ACCESS_ID,
  secretAccessKey: REACT_APP_SECRET_ACCESS_ID,
  region: REACT_APP_REGION,
});

const s3 = new AWS.S3({
  params: {
    Bucket: "myswecompany.com",
  },
});

function User() {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [user, setUser] = useState({});
  const [allImage, setAllImage] = useState({ images: [] });

  const [imageSrcs, setImageSrcs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const [correctPin, setCorrectPin] = useState(false);

  const scannedQRcode = localStorage.getItem("scannedQRcode");
  const verified = localStorage.getItem("verified");

  const fakeImage = [
    "312kjajkbda38apple.png",
    "adha34g2j53iuugjfamily.jpeg",
    "31231238un34jjdavsjddiphone.png",
    "jdlasjdak82311k23hkklake.png",
    "3127nkjkbjk4bhgc412chround.webp",
    "3123hkjkb4k341vhsea-view.jpeg",
    "3123kjkbkae88dastree-view.jpeg",
  ];

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    if (!token) {
      navigate("/");
    }

    if (verified === "false") {
      navigate("/auth");
    }

    if (scannedQRcode === "false") {
      setCorrectPin(false);
    } else {
      setCorrectPin(true);
    }

    const axiosInstance = axios.create({
      baseURL: `${REACT_APP_API_ENDPOINT}`,
    });

    const fetchData = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) {
        return;
      }
      //Get User Data
      try {
        const response = await axiosInstance.get(`/user/${userId}`);
        if (response.data !== null && response.data.length > 0) {
          setUser(response.data);
        }
      } catch (error) {
        console.log("Please login");
      }
    };

    const fetchAllImageData = async () => {
      const sub = localStorage.getItem("id");
      if (!sub) {
        return;
      }
      try {
        const response = await axiosInstance.get(`/allImages/${sub}`);
        setAllImage(response.data.image[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchAllImageData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFileChange = (event) => {
    setImageFiles(randomString + event.target.files[0].name);
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = function (e) {
      setImageSrcs(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  //upload image
  const handleUpload = async () => {
    if (selectedFile) {
      const params = {
        Key: imageFiles,
        ContentType: selectedFile.type,
        Body: selectedFile,
        ACL: "public-read",
      };

      s3.upload(params, (err, data) => {
        if (err) {
          toast.error("Error uploading file", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          console.log(err);
        } else {
          toast.success("File uploaded successfully");
        }
      });
    }

    try {
      const response = await axios.post(
        `${REACT_APP_API_ENDPOINT}/image/import`,
        {
          sub: localStorage.getItem("id"),
          images: imageFiles,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response);
    } catch (err) {}
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("scannedQRcode");
    localStorage.removeItem("verified");
    alert("You have been logged out");
    navigate("/");
  };

  function generateRandomString() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$*()_-+=<>?/";
    let result = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    result += localStorage.getItem("id");
    return result;
  }

  const randomString = generateRandomString();

  return (
    <div className="User">
      <ToastContainer />

      <Header title="Upload Image | KeyHolder" />

      {showPopup && (
        <ViewIcon setShowPopup={setShowPopup} image={currentImage} />
      )}

      <div className="main">
        <h1 style={{ margin: "20px 0px" }}>
          {`Welcome back, `}{" "}
          <strong style={{ color: " rgb(0, 213, 255)" }}>
            {" "}
            {user && user.length > 0 && user[0].username}
          </strong>
        </h1>

        <div
          className="container d-flex justify-content-center mt-100"
          style={{
            marginTop: "24px",
            height: "100%",
            width: "90%",
            padding: "0px",
            marginBottom: "24px",
            paddingBottom: "24px",
          }}
        >
          <div className="row" style={{ width: "100%" }}>
            <div
              className={"col-md-4 col-lg-7 col-sm-12"}
              style={{
                width: "453px",
                border: "1px solid #f1f1f1",
                boxShadow: "0 0 10px rgb(186, 186, 186)",
                padding: "24px",
                borderRadius: "5px",
                marginTop: windowWidth > 1208 ? "0px" : "",
                marginLeft: windowWidth > 1208 ? "0px" : "",
              }}
            >
              <div
                className="file-drop-area"
                style={{ width: "100%", height: "200px" }}
              >
                <div className="file-input-btn">
                  <div className="svg-upload-icon">
                    <svg
                      className=""
                      height="32"
                      viewBox="0 0 32 32"
                      width="32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 26h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3zM2 28h16a1 1 0 0 1 0 2H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h28a1 1 0 0 1 1 1v17a1 1 0 0 1-2 0V2H2v26zm9-15a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm.174 7.353L6.768 23.64a1 1 0 1 1-1.536-1.28l5-6a1 1 0 0 1 1.35-.174l6.254 4.468 5.405-6.305a1 1 0 1 1 1.518 1.302l-6 7a1 1 0 0 1-1.34.163l-6.245-4.46z"
                        fill="#008f79"
                      ></path>
                    </svg>
                  </div>

                  <button>
                    Select Photos
                    <input
                      type="file"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </button>
                  <p style={{ paddingTop: "10px" }}>or drag photos here</p>
                  <p style={{ color: "darkgray" }}>(1 image a time)</p>
                </div>
              </div>
              {imageSrcs.length > 0 ? (
                <div
                  style={{
                    padding: "5px",
                    display: "inline-block",
                    marginTop: "10px",
                    position: "relative",
                  }}
                >
                  <img
                    src={imageSrcs}
                    alt={`Selected`}
                    style={{ width: "123px", height: "123px" }}
                    className="img-thumbnail"
                  />

                  <div className="D_Qy">
                    <p
                      className="D_oz D_ov D_o_ D_oE D_oH D_oK D_oN D_oP"
                      style={{ textAlign: "center", marginBottom: "0px" }}
                    >
                      1
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="list-item-btn">
                {correctPin === false ? (
                  //wrong pin, fake upload image successfully
                  <button
                    className="btn btn-success"
                    style={{ padding: "4px 24px", fontWeight: "bold" }}
                    onClick={() => {
                      toast.success("File uploaded successfully");
                      window.location.reload();
                    }}
                  >
                    List now
                  </button>
                ) : (
                  //correct pin, upload image successfully
                  <button
                    className="btn btn-success"
                    style={{ padding: "4px 24px", fontWeight: "bold" }}
                    onClick={() => handleUpload()}
                  >
                    List now
                  </button>
                )}
              </div>
            </div>

            {windowWidth > 1208 ? null : (
              <div style={{ padding: "20px" }}></div>
            )}

            {/* right side */}

            <div
              className="col-md-7 col-lg-7 col-sm-12"
              style={{
                border: "1px solid #f1f1f1",
                boxShadow: "0 0 10px rgb(186, 186, 186)",
                padding: "24px",
                borderRadius: "5px",
                marginLeft: { windowWidth } < 1208 ? "0px" : "10px",
                margin: { windowWidth } < 1208 ? "0px" : "auto",
              }}
            >
              <div>
                <h2>Uploaded Images</h2>
                {correctPin === false ? (
                  <h4>
                    Browsing all{" "}
                    <strong style={{ color: "rgb(0, 213, 255)" }}>
                      {fakeImage && fakeImage.length}
                    </strong>{" "}
                    images
                  </h4>
                ) : (
                  <h4>
                    Browsing all{" "}
                    <strong style={{ color: "rgb(0, 213, 255)" }}>
                      {allImage && allImage.images ? allImage.images.length : 0}
                    </strong>{" "}
                    images
                  </h4>
                )}
              </div>

              <div>
                {correctPin === false ? (
                  <div>
                    {fakeImage &&
                      fakeImage.map((image, index) => (
                        <div
                          className="image-item"
                          style={{ display: "flex" }}
                          onClick={() => {
                            setShowPopup(true);
                            setCurrentImage(image);
                          }}
                          key={index}
                        >
                          <div
                            className="child-image-item"
                            style={{ display: "flex" }}
                          >
                            <p key={index}>{image}</p>
                          </div>
                          <div
                            className="child-image-item"
                            style={{
                              marginLeft: "auto",
                              marginRight: "0px",
                              color: "#0d6efd",
                            }}
                          >
                            Show
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div>
                    {allImage?.images &&
                      [...allImage.images].reverse().map((image, index) => (
                        <div
                          className="image-item"
                          style={{ display: "flex" }}
                          onClick={() => {
                            setShowPopup(true);
                            setCurrentImage(image);
                          }}
                          key={index}
                        >
                          <div
                            className="child-image-item"
                            style={{ display: "flex" }}
                          >
                            <p key={index}>{image.slice(31)}</p>
                          </div>
                          <div
                            className="child-image-item"
                            style={{
                              marginLeft: "auto",
                              marginRight: "0px",
                              color: "#0d6efd",
                            }}
                          >
                            Show
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="logout-btn-div">
              <button className="btn btn-danger" onClick={() => logout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;

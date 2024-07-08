import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiTwotoneSetting } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/ProfileService";
import UserForm from "./UserForm";
import "../Styles/profile.css";

const Profile = () => {
  const id = localStorage.getItem('id');
  const [user, setUser] = useState({});
  const [showSetting, setShowSetting] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [enlargedLinkId, setEnlargedLinkId] = useState(null);

  useEffect(() => {
    getUserProfile(id).then((response) => {
      setUser(response.data);
      console.log(response.data);
    });
  }, [id]);

  const showSettingHandler = () => {
    setShowOrder(false);
    setShowSetting(true);
    setEnlargedLinkId(null); // Reset enlarged link
  };

  const showOrderHandler = () => {
    setShowSetting(false);
    setShowOrder(true);
    setEnlargedLinkId(null); // Reset enlarged link
  };

  const handleLinkClick = (linkId) => {
    setEnlargedLinkId(linkId === enlargedLinkId ? null : linkId); // Toggle link enlargement
  };

  return (
    <div className="all d-flex flex-column align-items-center justify-content-center">
      <div className="profile">
        <div className="classList mt-2 p-1">
          <ul style={{ margin: 'auto' }}>
            <li>
              <AiTwotoneSetting />
              <a
                
                onClick={showSettingHandler}
                className={enlargedLinkId === "setting" ? "enlarged" : ""}
                style={{ margin: 'auto' }}
              >
                Account Info
              </a>
            </li>
            <li>

             
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        {showSetting && (
          <div className="Setting d-flex ">
            <div className="account-settings w-50 m-auto d-flex flex-column align-items-center">
              <h1>Account Information</h1>
              <img src="/Images/image.jpeg" style={{display:'block',margin:'auto'}} alt={user.name} />
              <form style={{ padding: "20px" }} className="w-75">

                <div className="form-group">
                  <label>
                    <strong>Name:</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>Email:</strong>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    value="***********"
                    className="form-control"
                    readOnly
                  />
                </div>

                <div
                  style={{
                    textAlign: "right",
                    marginBottom: "10px",
                  }} className="m-auto w-50"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ width:'100px' ,right:0}}
                    onClick={() => setShowModal(true)}
                  >
                    <AiTwotoneEdit style={{ marginRight: 8 }} />
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <UserForm
          closeModal={() => setShowModal(false)}
          userId={id}
          setUser={setUser}
          className="w-50 m-auto "
        />
      )}
    </div>
  );
};

export default Profile;

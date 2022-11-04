import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import app from "../../firebase/Config";

const LogIn = () => {
  // Variables for login functionality
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  // Firebase Login
  const onLoginPress = () => {
    const validationErrors = [
      //...validateEmail(email),
      //...validatePassword(password),
    ];

    setErrors(validationErrors);
    if (validationErrors.length === 0) {
      app.auth().signInWithEmailAndPassword(email, password).then((response) => {
        const usersRef = app.firestore().collection("users");
        usersRef.doc(response.user?.uid).get().then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            alert("The user does not exist!");
          } else {
            navigate(routes.dashboardPage);
          }
        })
        .catch((error) => {
          alert(error);
        })
      })
      .catch((error) => {
        alert(error);
      })
    }
  }

  return (
    <section className="zl_login_section">
      <div className="zl_login_content container">
        <div className="zl_login_heading_text">
          <h3 className="zl_login_heading">Rorobot</h3>
          <p className="zl_login_peregraph">
            Login with your username and password.
          </p>
        </div>

        <div className="zl_login_row row">
          <div>
            <div className="zl_login_input_content position-relative">
              <input
                type="text"
                className="zl_login_input"
                placeholder="Email"
                onChange={(text) => setEmail(text)}
              />
            </div>
          </div>
        </div>

        <div className="zl_login_row row">
          <div>
            <div className="zl_login_input_content position-relative">
              <input
                type="text"
                className="zl_login_input"
                placeholder="Password"
                onChange={(text) => setPassword(text)}
              />
            </div>
          </div>
        </div>
        <div className="zl_login_btn">
          <button
            className="mx-auto zl_login_btn_link"
            onClick={() => onLoginPress()}
          >
            Login
          </button>
        </div>
        <div>
          <p className="new_account_text">
            <a href="https://www.w3schools.com/" className="new_account_link">Create a new account</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LogIn;

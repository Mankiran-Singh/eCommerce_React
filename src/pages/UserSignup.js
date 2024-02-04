import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import { URL } from "../components/URL";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import load from "load-script";
import AfterFooter from "../components/AfterFooter";

function UserSignup() {
  function ToTop() {
    window.scrollTo(0, 0);
    document.title = "User Signup";
    document.body.classList.remove("home");
    document.body.classList.add("about-us");
  }

  useEffect(async () => {
    await ToTop();
  }, []);

  let [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
    mobile: "",
    address: "",
  });

  // Handle Form Inputs...
  const handle_Inputs = (e) => {
    let key = e.target.name;
    formInputs[key] = e.target.value;
    // console.log(formInputs);
    setFormInputs(formInputs);
  };

  // Add Action
  const handle_Signup = () => {
    let { username, email, password, confirmpassword, name, mobile, address } =
      formInputs;

    if (
      username &&
      email &&
      password &&
      confirmpassword &&
      name &&
      mobile &&
      address
    ) {
      if (password !== confirmpassword) {
        Swal.fire({
          text: "Password & Confirm Password must be same.",
          icon: "warning",
          // text: 'Category Not Added.',
        });
      } else {
        axios
          .post(`${URL}user-signup`, {
            username,
            email,
            password,
            confirmpassword,
            name,
            mobile,
            address,
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === "OK") {
              // console.log(res.data);

              if (res.data === "success") {
                Swal.fire({
                  icon: "success",
                  title: "User Registration Done",
                });

                document.getElementById("signup-form").reset();

                setFormInputs({
                  username: "",
                  email: "",
                  password: "",
                  confirmpassword: "",
                  name: "",
                  mobile: "",
                  address: "",
                });
              } else if (res.data === "notmatched") {
                Swal.fire({
                  text: "Password & Confirm Password must be same.",
                  icon: "warning",
                });
              } else {
                Swal.fire({
                  title: "Username already exist.",
                  icon: "error",
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      Swal.fire({
        title: "All Fields Are Required.",
        icon: "warning",
      });
    }
  };

  return (
    <>
      <div className="page-wrapper">
        {/*<h1 className="d-none">Wolmart - Responsive Marketplace HTML Template</h1>*/}
        <header className="header">
          <TopHeader logo="new/img/logos/white-logo.png" />

          <NewNavigation />
        </header>

        <main className="main login-page">
          <BreadCrumb title="User Registration" />

          <div className="page-content">
            <div className="container">
              <div className="col-lg-10 mx-auto">
                <div className="login-popup">
                  <form id="sign-in">
                    <div className="">
                      <div className="row">
                        <div className="col-lg-12 form-group">
                          <div className="ui left icon input field w-100">
                            <label style={{ fontWeight: "600" }}>
                              Username *
                            </label>
                            <input
                              onChange={handle_Inputs}
                              type="text"
                              name="username"
                              id="username"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 form-group">
                          <div className="ui left icon input field w-100">
                            <label style={{ fontWeight: "600" }}>
                              Full Name *
                            </label>
                            <input
                              onChange={handle_Inputs}
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 form-group">
                          <div className="ui left icon input w-100 field">
                            <label style={{ fontWeight: "600" }}>
                              Password *
                            </label>
                            <input
                              onChange={handle_Inputs}
                              type="password"
                              id="password"
                              name="password"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 form-group">
                          <div className="ui left icon input w-100 field">
                            <label style={{ fontWeight: "600" }}>
                              Confirm Password *
                            </label>
                            <input
                              onChange={handle_Inputs}
                              type="password"
                              id="confirmpassword"
                              name="confirmpassword"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 form-group">
                          <div className="ui left icon input w-100 field">
                            <label style={{ fontWeight: "600" }}>Email *</label>
                            <input
                              onChange={handle_Inputs}
                              type="email"
                              name="email"
                              id="email"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 form-group">
                          <div className="ui left icon input w-100 field">
                            <label style={{ fontWeight: "600" }}>
                              Mobile Number *
                            </label>
                            <input
                              onChange={handle_Inputs}
                              type="tel"
                              name="mobile"
                              id="mobile"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 form-group">
                          <label style={{ fontWeight: "600" }}>Address *</label>
                          <textarea
                            onChange={handle_Inputs}
                            rows="5"
                            className="form-control"
                            name="address"
                            id="address"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-block py-3 btn-primary"
                      onClick={handle_Signup}
                      type="button"
                    >
                      Sign Up
                    </button>

                    <div className="text-center py-3">
                      <label>
                        If Already have account?{" "}
                        <Link to="/user-login"> Sign in now</Link>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        <NewFooter logo="new/img/logos/logo.png" />
      </div>

      <AfterFooter />
    </>
  );
}

export default UserSignup;

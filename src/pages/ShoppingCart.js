import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import axios from "axios";

import Swal from "sweetalert2";
// import {useForm} from "react-hook-form";

import { URL } from "../components/URL";

// Import Razorpay Package
import useRazorpay from "react-razorpay";

// new
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import NewFooter from "../components/new/NewFooter";
import BreadCrumb from "../components/new/BreadCrumb";
import load from "load-script";
import AfterFooter from "../components/AfterFooter";

function ShoppingCart() {
  let navigate = useNavigate();

  // RAZORPAY
  const Razorpay = useRazorpay();

  // React Hook Form
  // const {register, handleSubmit, formState: {errors}} = useForm();

  let { cart, setCart, cartCount, setCartCount } = useContext(CartContext);

  let [products, setProducts] = useState([]);
  let [grandTotal, setGrandTotal] = useState(0);
  let [productsFetched, setProductsFetched] = useState(false);

  // ------ ------
  let [formInputs, setFormInputs] = useState({
    city: "",
    zipcode: "",
    address: "",
    remarks: "",
  });

  // let [payment, setPayment] = useState('COD');
  let [payment, setPayment] = useState("Online");
  // ------ ------

  // GET CART PRODUCTS
  let Fetch_CartProducts = (URL) => {
    // if (productsFetched === true) {
    //     return false;
    // }

    axios
      .post(`${URL}add-to-cart`, {
        action: "view",
      })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          // console.log(res.data);

          setProducts(res.data.cart);
          setGrandTotal(res.data.grand_total);
          setProductsFetched(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function ToTop() {
    window.scrollTo(0, 0);
    document.title = "Shopping Cart";
    // document.body.classList.remove("grocino-home");
    // document.body.classList.add("grocino-about");
  }

  useEffect(async () => {
    await ToTop();
    await Fetch_CartProducts(URL);
  }, [URL]);

  // DELETE
  let Delete = (pid) => {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure to Delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let updated_Product = products.filter(
          (product) => product.productid !== pid
        );
        setProducts(updated_Product);

        axios
          .post(`${URL}add-to-cart`, {
            pid,
            action: "delete",
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === "OK") {
              // console.log(res.data);

              setCartCount(res.data.count);
              setGrandTotal(res.data.grand_total);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // INCREMENT QUANTITY
  let incrementQty = (pid) => {
    for (let i of products) {
      if (i.productid === pid) {
        if (i.quantity === 5) {
          return false;
        }
      }
    }

    axios
      .post(`${URL}add-to-cart`, {
        pid,
        action: "inc",
      })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          // console.log(res.data);

          setProducts(res.data.cart);
          setGrandTotal(res.data.grand_total);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DECREMENT QUANTITY
  let decrementQty = (pid) => {
    for (let i of products) {
      if (i.productid === pid) {
        if (i.quantity === 1) {
          return false;
        }
      }
    }

    axios
      .post(`${URL}add-to-cart`, {
        pid,
        action: "less",
      })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          // console.log(res.data);

          setProducts(res.data.cart);
          setGrandTotal(res.data.grand_total);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ------ ------

  // Radio
  const handleChange_Radio = (e) => {
    setPayment(e.target.value);
  };

  // Text_Boxes
  const handle_Inputs = (e) => {
    const newData = { ...formInputs };
    let key = e.target.name;
    newData[key] = e.target.value;
    setFormInputs(newData);
  };

  // RAZORPAY Options
  let options = {
    key: "rzp_test_A3RM3Asww6uWvF",
    currency: "INR",
    amount: 0,
    name: "Electronic Store",
    description: "Best Online Shopping Platform",
    image: "assets/images/demos/demo2/logo-rzp.png",
    handler: bookOrder,
    prefill: {
      name: "",
      // email: "",
      email: "user@yahoo.in",
      contact: "1234567890",
      // contact: "",
    },
    theme: {
      color: "#F46432",
    },
  };

  // RAZORPAY Handler [razorpay_payment_id]
  function bookOrder(response) {
    let payment_id = response.razorpay_payment_id;
    if (payment_id !== "") {
      order_Request_To_Server(payment_id);
    } else {
      alert("Payment Failed. Try again...");
    }
  }

  // Place Order Button
  const place_Order = (price, pay_method) => {
    let { city, zipcode, address } = formInputs;

    if (city === "" || zipcode === "" || address === "") {
      alert("All fields are required.");
      return false;
    }

    if (pay_method === "Online") {
      options.amount = price * 100;

      let rzp = new Razorpay(options);
      rzp.open(); // Display Razorpay
    } else {
      // alert('COD');

      order_Request_To_Server("");
    }
  };

  // Request To Server
  const order_Request_To_Server = (pay_id) => {
    let { city, zipcode, address, remarks } = formInputs;

    axios
      .post(`${URL}book-order`, {
        city,
        zipcode,
        address,
        remarks,
        pay_id,
        payment,
        grandTotal,
      })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          // console.log('Server Response -- -- ' + res.data);

          if (res.data === "login") {
            navigate("/user-login");
          } else if (res.data === "placed") {
            setCartCount(0);
            window.scrollTo(0, 0);
            Fetch_CartProducts(URL);
            setTimeout(() => {
              Swal.fire({
                icon: "success",
                title: "Order Placed.",
              });
            }, 1000);
          } else {
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ------ ------

  return (
    <>
      <div className="page-wrapper">
        {/*<h1 className="d-none">Wolmart - Responsive Marketplace HTML Template</h1>*/}
        <header className="header header-border">
          <TopHeader logo="new/img/logos/white-logo.png" />

          <NewNavigation />
        </header>

        <main className="main cart">
          {/*<BreadCrumb title="Shopping Cart"/>*/}

          <div className="page-content">
            <div className="container mt-10">
              <div className="row gutter-lg mb-10">
                {products.length > 0 ? (
                  <>
                    <div className="col-lg-8 pr-lg-4 mb-6">
                      <table className="shop-table cart-table">
                        <thead>
                          <tr>
                            <th className="product-name">
                              <span>Product</span>
                            </th>
                            <th></th>
                            <th className="product-price">
                              <span>Price</span>
                            </th>
                            <th className="product-quantity">
                              <span>Quantity</span>
                            </th>
                            <th className="product-subtotal">
                              <span>Subtotal</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => {
                            return (
                              <tr>
                                <td className="product-thumbnail">
                                  <div className="p-relative">
                                    <a href="product-default.html">
                                      <figure>
                                        <img
                                          src={URL + product.photo}
                                          alt="product"
                                          style={{
                                            width: "100px",
                                            height: "113px",
                                          }}
                                        />
                                      </figure>
                                    </a>
                                    <button
                                      onClick={() => Delete(product.productid)}
                                      type="submit"
                                      className="btn btn-close"
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </div>
                                </td>
                                <td className="product-name">
                                  <a href="product-default.html">
                                    {product.productname}
                                  </a>
                                </td>
                                <td className="product-price">
                                  <span className="amount">
                                    &#x20b9;{product.net_price}
                                  </span>
                                </td>
                                <td className="product-quantity">
                                  <div className="input-group">
                                    <input
                                      className="quantity form-control"
                                      type="number"
                                      value={product.quantity}
                                      min="1"
                                      max="5"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        incrementQty(product.productid)
                                      }
                                      className="quantity-plus w-icon-plus"
                                    ></button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        decrementQty(product.productid)
                                      }
                                      className="quantity-minus w-icon-minus"
                                    ></button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  <span className="amount">
                                    &#x20b9;
                                    {product.net_price * product.quantity}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <div className="cart-action mb-6">
                        <Link
                          to="/products"
                          className="btn btn-dark btn-sm btn-rounded btn-icon-left btn-shopping mr-auto"
                        >
                          <i className="w-icon-long-arrow-left"></i>Continue
                          Shopping
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-4 sticky-sidebar-wrapper">
                      <div className="sticky-sidebar">
                        <div className="cart-summary">
                          <div className="">
                            <div className="jumbotron">
                              <h4 className="mb-30">Billing Details</h4>
                              <hr />

                              <form className="form-signin">
                                <div className="ui form">
                                  <div className="mb-3">
                                    <div className="ui left icon input field w-100">
                                      <select
                                        onChange={handle_Inputs}
                                        name="city"
                                        id="city"
                                        className="form-control"
                                      >
                                        <option value="">Select City</option>
                                        <option value="Amritsar">
                                          Amritsar
                                        </option>
                                        <option value="Ahmedabad">
                                          Ahmedabad
                                        </option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Bangalore">
                                          Bangalore
                                        </option>
                                        <option value="Lucknow">Lucknow</option>
                                        <option value="Visakhapatnam">
                                          Visakhapatnam
                                        </option>
                                        <option value="Ludhiana">
                                          Ludhiana
                                        </option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <div className="ui left icon input field w-100">
                                      <input
                                        onChange={handle_Inputs}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Zipcode"
                                        name="zipcode"
                                        id="zipcode"
                                      />
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <div className="ui left icon input field w-100">
                                      <textarea
                                        onChange={handle_Inputs}
                                        placeholder="Enter Address"
                                        name="address"
                                        className="form-control"
                                        id="address"
                                      />
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <div className="ui left icon input field w-100">
                                      <textarea
                                        onChange={handle_Inputs}
                                        placeholder="Enter Remarks (optional)"
                                        name="remarks"
                                        className="form-control"
                                        id="remarks"
                                      />
                                    </div>
                                  </div>

                                  <div className="mb-3">
                                    <div className="">
                                      <div className="">
                                        <label>
                                          <h5>Payment Method:</h5>
                                        </label>
                                        <br />

                                        <input
                                          checked={payment === "COD"}
                                          onChange={handleChange_Radio}
                                          type="radio"
                                          name="gender"
                                          value="COD"
                                          id="COD"
                                        />

                                        <span style={{ fontSize: "15px" }}>
                                          &nbsp;COD
                                        </span>

                                        <br />
                                        <br />

                                        <input
                                          checked={payment === "Online"}
                                          onChange={handleChange_Radio}
                                          type="radio"
                                          name="gender"
                                          value="Online"
                                          id="Online"
                                        />

                                        <span style={{ fontSize: "15px" }}>
                                          &nbsp;Online Payment
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="cw-product-promo">
                                        <button
                                          onClick={() =>
                                            place_Order(grandTotal, payment)
                                          }
                                          type="button"
                                          className="btn btn-primary "
                                        >
                                          Proceed to Checkout
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <img
                        src="/empty-cart.png"
                        style={{ height: "300px" }}
                        alt=""
                      />
                    </div>
                  </>
                )}
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

export default ShoppingCart;

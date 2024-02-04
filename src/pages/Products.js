import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import load from "load-script";
import { LoadingScreen } from "../components/ReactLoadingAnimation";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";

import ProductCard from "../components/ProductCard";
import { URL } from "../components/URL";

// Context
import { CartContext } from "../CartContext";
import AfterFooter from "../components/AfterFooter";

function Products() {
  let [categories, setCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);

  let FetchProducts = async () => {
    await axios
      .post(`${URL}view-products`, {
        action: "product_page",
      })
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let FetchCategories = async () => {
    await axios
      .get(`${URL}get-category`)
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function ToTop() {
    window.scrollTo(0, 0);
    document.title = "Product Page";
    document.body.classList.remove("home");
    document.body.classList.add("about-us");
  }

  useEffect(async () => {
    await ToTop();
    await FetchProducts();
    await FetchCategories();
  }, []);

  const fetchSubCategories = (e) => {
    // console.log(e.target.value);
    axios
      .post(`${URL}get-sub-category`, { id: e.target.value })
      .then((res) => {
        // console.log(res.data);
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFilteredProducts = (e) => {
    // console.log(e.target.value);
    axios
      .post(`${URL}sub-products`, { id: e.target.value })
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="page-wrapper">
        {/*<h1 className="d-none">Wolmart - Responsive Marketplace HTML Template</h1>*/}
        <header className="header">
          <TopHeader logo="new/img/logos/white-logo.png" />

          <NewNavigation />
        </header>

        <main className="main">
          <BreadCrumb title="New Products" />

          <div className="container pt-10 pb-5">
            {/* Products Card */}

            {!loading && products.length > 0 && (
              <>
                <h2>Filter</h2>
                <hr />

                <div className="row">
                  <div className="col-lg-6 pb-5">
                    <h4 style={{ color: "#E60089" }}>Category</h4>
                    {categories.map((category) => {
                      return (
                        <div key={category.categoryid}>
                          <input
                            onChange={(e) => fetchSubCategories(e)}
                            type="radio"
                            id={category.categoryid}
                            name="categoryList"
                            value={category.categoryid}
                          />{" "}
                          <label htmlFor={category.categoryid}>
                            {category.categoryname}
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div className="col-lg-6 pb-5">
                    {subCategories.length > 0 && (
                      <>
                        <h4 style={{ color: "#E60089" }}>Sub Category</h4>

                        {subCategories.map((subCategory) => {
                          let { subcategoryid, subcategoryname } = subCategory;
                          return (
                            <div key={subcategoryid}>
                              <input
                                onChange={(e) => fetchFilteredProducts(e)}
                                type="radio"
                                id={subcategoryid}
                                name="subCategoryList"
                                value={subcategoryid}
                              />{" "}
                              <label htmlFor={subcategoryid}>
                                {subcategoryname}
                              </label>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            <>
              {loading ? (
                <>
                  <div style={{ height: "400px" }}>
                    <div
                      style={{
                        display: "grid",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LoadingScreen type="spokes" color="#fcd462" />
                      <p>loading...</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {products.length > 0 ? (
                    <div className="swiper-wrapper row cols-lg-5 cols-md-4 cols-2">
                      {products.map((product) => {
                        return (
                          <ProductCard
                            key={product.productid}
                            details={product}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="text-center p-5 alert alert-danger">
                        No Products Found
                      </div>
                    </>
                  )}
                </>
              )}

              {/* <div className="swiper-pagination"></div> */}
              {/*</div>*/}
            </>
          </div>
        </main>

        <NewFooter logo="new/img/logos/logo.png" />
      </div>

      <AfterFooter />
    </>
  );
}

export default Products;

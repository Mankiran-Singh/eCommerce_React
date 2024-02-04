import React from "react";
import axios from "axios";

function Testing() {
  let [SubCat, setSubCat] = React.useState([]);
  let [count, setCount] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost:5000/get-category").then((res) => {
      console.log(res.data.length);
      setCount(res.data.length);

      res.data.forEach((element) => {
        // console.log(element.categoryid);
        return axios
          .post("http://localhost:5000/get-sub-category", {
            id: element.categoryid,
          })
          .then((response) => {
            // console.log(response.data);
            setSubCat((prev) => [
              ...prev,
              { [element.categoryid]: response.data },
            ]);
          });
      });
    });
  }, []);

  return (
    <div>
      <h2>Data Fetching</h2>
      <p>Total Posts: {SubCat.length}</p>

      {SubCat.length > 0 &&
        SubCat.map((data) => {
          let keys = Object.keys(data);
          Object.keys(data).forEach((key) => {
            // console.log(data[key]);

            data[key].map((value) => {
              let { subcategoryid, subcategoryname } = value;
              //   console.log(subcategoryid);
              return (
                <h4>
                  {subcategoryid} : {subcategoryname}
                </h4>
              );
            });
          });
        })}

      {
        //   SubCat.length > 0 &&
        SubCat.map(function (data, index) {
          //   console.log(data);
          return (
            <div
              style={{ border: "1px solid #000", margin: "10px" }}
              key={index}
            >
              {Object.keys(data).map(function (key, index2) {
                // console.log(key);
                // console.log(data[key]);
                return <span key={index2}>{key}</span>;
              })}
            </div>
          );
        })
      }
    </div>
  );
}

export default Testing;

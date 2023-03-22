import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Coviddata.css";

const Coviddata = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const getCoviddata = async () => {
    const res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
    const resultData = await res.json();
    console.log(resultData.data.regional);
    setData(resultData.data.regional);
  };

  useEffect(() => {
    getCoviddata();
  }, []);

  function Searchstates(e) {
    
    setSearch(e.target.value);
  }

  return (
    <>
      <div className="main">
        <div class="title" className="area">
          Covid API
        </div>
        <input
          className="input"
          type="text"
          placeholder="   Search using State Name "
          value={search}
          onChange={Searchstates}
        />
        <div class="row row-cols-2 row-cols-md-4 g-4">
          {data &&
            data
              .filter((item) => item.loc.includes(search))
              .map((cov) => {
                return (
                  <div class="col">
                    <div class="card border-info mb-3 shadow p-3 mb-5">
                      <span class="card-title">{cov.loc}</span>
                      <p class="card-text">
                        <span style={{color:"red"}}>Total Confirmed Cases </span>:{" "}
                        <b>{cov.totalConfirmed}</b>
                      </p>
                      <p class="card-text">
                        <span className="death">Total Deaths </span>:{" "}
                        <b>{cov.deaths}</b>
                      </p>
                      <p class="card-text">
                        <span className="safe">Discharged</span>:{" "}
                        <b>{cov.discharged}</b>
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Coviddata;

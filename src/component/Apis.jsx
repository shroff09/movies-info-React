import React, { useState, useEffect } from "react";
import "./Style.css";
import Modal from "./Modal";
import UseModal from "./UseModal";

const Api = () => {
  const initialPage = 1;
  const [data, setdata] = useState(null);
  const [search, setsearch] = useState("avengers");
  const [id, setid] = useState("avengers");
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);

  const handleclick = () => {
    setid(search);
    setpage(initialPage);
  };
  const reset = () => {
    setsearch('avengers');
    setpage(initialPage);
  }

  useEffect(() => {
    setloading(true);
    setdata(null);
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=ec5af89')
      .then((res) => res)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        setdata(resp.Search);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, page]);

  const { isShowing, toggle } = UseModal();

  const prevpage = (page) => {
    if (page === 1) {
      return 1;
    } else if (page > 1) {
      return page - 1;
    }
  };

  return (
    <div>
      <div className="header">
        <h1 onClick={reset}>Dodo</h1>
      </div>
      <div className="inputbox">
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button type="submit" onClick={handleclick}>
          Search
        </button>
        <button className="prevpage" onClick={() => setpage(prevpage)}>
          Prev Page
        </button>
        <button className="nextpage" onClick={() => setpage(page + 1)}>
          Next Page
        </button>
      </div>
      {loading ? <h1 className="notExist">loading...</h1> : null}

      {search && data ? (
        <div className="wrapper">
          {data !== null &&
            data.length > 0 &&
            data.map((result, index) => (
              <li className="lists" key={index}>
                {
                  <img
                    alt={result.Title}
                    src={
                      result.Poster === "N/A"
                        ? `http://img.omdbapi.com/?s=${id}&apikey=dbc9f77a`
                        : result.Poster
                    }
                  />
                }
                <br />
                {result.Title}
                <br />
                <small>Type:{result.Type}</small>
                <small>Year:{result.Year}</small>
                <small>{result.plot}</small>
                {/*<button className="show" > <Link className="link" to='/model'>Details</Link></button> */}
                <button className="button-default" onClick={toggle}>
                  Rating
                </button>

                <Modal
                  isShowing={isShowing}
                  hide={toggle}
                  info={data}
                  ids={id}
                />
              </li>
            ))}
        </div>
      ) : (
        <div>
          <h2 className="searchEmpty">Search movie !!</h2>
        </div>
      )}
      {/*<div className="footer">foooter</div> */}
      <div></div>
    </div>
  );
};

export default Api;

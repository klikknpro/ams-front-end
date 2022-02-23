import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import http from "axios";

function Search() {
  let { q } = useParams(); // coming from the URL

  const [imagesOnLoad, setImagesOnLoad] = useState([]);
  const [keyword, setKeyword] = useState(q);
  const [keywordAlpha, setKeywordAlpha] = useState("");
  const [key, setKey] = useState("");
  const [counter, setCounter] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  // const [page, setPage] = useState(0);

  const [isFetching, setIsFetching] = useState(false);

  const [searchError, setSearchError] = useState('')

  function goToNextPage() {
    setCurrentPage((page) => page + 20);
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 20);
    }
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  function goToFirstPage() {
    setCurrentPage(0);
    // console.log(currentPage);
  }

  // Cleveland API
  const loadCleveland = async (keyword) => {
    let artworksData = [];
    const params = {
      q: keyword, // keyword from input
      limit: 20, // number of results
      has_image: 1, // it has an image
      skip: currentPage,
      // page: page,
    };

    const getImages = await http
      .get("https://openaccess-api.clevelandart.org/api/artworks", {
        params,
      })
      .then((response) => {
        console.log(response.data.data);
        for (const artwork of response.data.data) {
          const newArtwork = {
            image: artwork.images.web.url,
            id: artwork.id,
            title: artwork.title,
          };
          artworksData.push(newArtwork);
        }
      })

      .catch((e) => {
        console.log("ERROR getting artwork data");
        console.log(e);
      });
    setImagesOnLoad(artworksData);
    if (artworksData.length === 0) {
      setCurrentPage(currentPage - 20);
      // return loadCleveland();
    }
  };

  const validateSearch = () => {
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (keyword.length === 0 || regex.test(keyword) === true) {
        setSearchError("Wrong search format");
        return false;
    }
    return true;
};

  useEffect(() => {
    console.log(currentPage);
    console.log(counter);
    loadCleveland(keyword);
  }, [currentPage, keyword]);

  return (
    <div>
      <div className="search-part">
      <input
        placeholder="Search"
        type="text"
        defaultValue={keyword}
        onChange={(e) => setKeywordAlpha(e.target.value)}
      />
      <button
        onClick={() => {
          setKeyword(keywordAlpha);
        }}
        disabled={keywordAlpha.length < 3 || keywordAlpha.length === 0 ? true : false}
      >
        OK
      </button>
      <p>{searchError}</p>
      </div>
      <div className="main">
        {imagesOnLoad.map((img, i) => (
          <div key={img.id}>
            {q ? (
              <Link to={`/imageDetails/${img.id}/${q}`}>
                <img src={img.image} alt="Anyád" />
              </Link>
            ) : (
              <Link to={`/imageDetails/${img.id}`}>
                <img src={img.image} alt="Anyád" />
              </Link>
            )}
            <p className="description">{img.title}</p>
          </div>
        ))}
         
      </div>
      <div className="image" >
      </div>
      <div className="button-bottom">
      <button
        disabled={currentPage === 0 ? true : false}
        onClick={() => goToPreviousPage()}
        onChange={(event) => changePage(event)}
      >
        Down
      </button>
      <button
        onClick={() => goToNextPage()}
        onChange={(event) => changePage(event)}
      >
        Up
      </button>
      <button
        onClick={() => goToFirstPage()}
        onChange={(event) => changePage(event)}
      >
        First page
      </button>
      {/* {isFetching && <p>Fetching items...</p>}
      {!isFetching && <button onClick={loadMoreItems}>Load more</button>} */}
    </div>
    </div>
  );
}

export default Search;

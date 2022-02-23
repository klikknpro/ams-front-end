import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "axios";

const Favorites = () => {
  const [imagesOnLoad, setImagesOnLoad] = useState([]);
  
  const loadMyFavorites = async () => {
    let artworksData = [];
    let sessionId = localStorage.getItem('sessionId');
    try {
      const response = await http.get("http://localhost:3001/api/myfavorites", {
        
      }, {
        headers: {
          authorization: sessionId
        }
      }
      );
      console.log(response)
      // saveToCollection()
      // alert("Added to favorites");
      // setNotes("");
      // setTags("");
    } catch (err) {
      if (err.response.status === 401) return alert("Session ended");
      alert("Oops... Something went wrong!");
    }
    // const params = {
    //   q: keyword, // keyword from input
    //   limit: 20, // number of results
    //   has_image: 1, // it has an image
    //   skip: currentPage,
    //   // page: page,
    // };

    // const getImages = await http(
    //   "https://openaccess-api.clevelandart.org/api/artworks",
    //   { params }
    // )
    //   .then((response) => {
    //     console.log(response.data.data);
    //     for (const artwork of response.data.data) {
    //       const newArtwork = {
    //         image: artwork.images.web.url,
    //         id: artwork.id,
    //         title: artwork.title,
    //       };
    //       artworksData.push(newArtwork);
    //     }
    //     if (artworksData.length === 0) return alert('Sorry, no results for this search.')
    //   })
    //   // .then((response) => {
    //   // setImagesOnLoad((prevImages) => {
    //   //   return [
    //   //     ...new Set([...prevImages, ...artworksData.map((b) => b.title)]),
    //   //   ];
    //   // });
    //   // setPage((prevPageNumber) => prevPageNumber + 1);
    //   // setHasMore(response.data.data > 0);
    //   // setIsFetching(false);
    //   // setImagesOnLoad(response.data.data);
    //   // })

    //   .catch((e) => {
    //     console.log("ERROR getting artwork data");
    //     console.log(e);
    //   });
    // setImagesOnLoad(artworksData);
  };


  return (
    <div>
      <h2>Favorites</h2>
      <div className="image" >
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
        <button onClick={loadMyFavorites}>Katt</button>
      </div>
    </div>
  )
}

export default Favorites

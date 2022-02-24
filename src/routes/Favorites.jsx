import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "axios";

const Favorites = () => {
  const [imagesOnLoad, setImagesOnLoad] = useState([]);
  
  const loadMyFavorites = async () => {
    let artworksData = [];
    let sessionId = localStorage.getItem('sessionId');
    try {
      const response = await http.get("http://localhost:3001/api/favorites", {
        headers: {
          authorization: sessionId
        }
      }, {
        
      }
      );
      console.log(response)
      const myCollection = response.data;
      for (const artwork of myCollection) {
        const newArtwork = {
          image: artwork.url,
          id: artwork.id,
          title: artwork.title,
        };
        artworksData.push(newArtwork);
      }
      if (artworksData.length === 0) return alert('You have no favorites yet.')
      // saveToCollection()
      // alert("Added to favorites");
      // setNotes("");
      // setTags("");
    } catch (err) {
      if (err.response.status === 401) return alert("Please login!");
      alert("Oops... Something went wrong!");
    }
    setImagesOnLoad(artworksData);
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

  useEffect(() => {
    loadMyFavorites()
  }, [])
  

  return (
    <div>
      <h2>Favorites</h2>
      <div className="favorites-img">
          {imagesOnLoad.map((img) => (
            <div key={img.id}>
              <Link to={`/imageDetails/${img.id}`}>
                <img src={img.image} alt="Anyád" />
                <p>{img.title}</p>
              </Link>
              {/* <p>{img.title}</p> */}
            </div>
          ))}
        </div>
        <div className="image" >
          </div>
    </div>
  )
}

export default Favorites

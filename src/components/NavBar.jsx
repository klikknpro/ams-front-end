import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import http from 'axios'

const NavBar = (props) => {
  const loggedIn = props.loggedIn;
  const setLoggedIn = props.setLoggedIn;
  
  const setAuthUser = props.setAuthUser;
  const setAuthPassword = props.setAuthPassword;

  // let navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);

  // if (username) {
    //   setLoggedIn(true)
    // }
    
    //   let username;
    //   useEffect(() => {
  //     username = sessionStorage.getItem('username')
  //     if (username) {
  //     setLoggedIn(true)
  //   }
  // }, [])

  // let username = "";
  // const getUsername = () => {
  //   username = localStorage.getItem('username')
  // }
  
  const signOut = async () => {
    // localStorage.removeItem('user')
    // localStorage.removeItem('password')
    // localStorage.removeItem('sessionId')
    try {
      const response = await http.delete('http://localhost:4000/api/logout', {
        headers: {
          authorization: localStorage.getItem("sessionId")
        }
      }, {
        
      })
      console.log(response)
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoggedIn(false)
      localStorage.removeItem('sessionId')
      setAuthUser('')
      setAuthPassword('')
    }
  }

  useEffect(() => {
    // getUsername()
    // getUsername()
  }, [])
  

  return (
    <div className="navbar">
      <nav>
        <Link to="/">HOME</Link> |{" "}
        <Link to="/imageDetails">Image Details (under construction)</Link> |{" "}
        <Link to="/favorites">Favorites</Link> |{" "}
        {/* <Link to="/signup">Sign Up</Link> |{" "} */}
        {/* <Link to="/login">Login</Link> */}
        {loggedIn ? (<button onClick={signOut}>Log Out</button>) : (<><Link to="/signup">Sign Up</Link> |{" "}<Link to="/login">Login</Link></>)}
        {/* <button onClick={() => navigate("/")}>Katt</button> */}
      </nav>
    </div>
  );
};

export default NavBar;

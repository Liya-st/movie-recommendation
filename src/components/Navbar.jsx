  import React, { useState,useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { UserAuth } from "../context/AuthContext";
  import SearchBox from "./SearchBox";
  import Row from "./Row";
  const Navbar = () => {
    const { user, logOut } = UserAuth();
    const [searchItem, setSearchItem] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const searchSuccessful = false;
    const getMovieRequest = async (searchItem) => {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=d9a2926d310b627aa44739b657eac1e2&query=${searchItem}`;
  
      try {
        const response = await fetch(url);
        const responseJson = await response.json();
  
        if (responseJson.results) {
          setMovies(responseJson.results);
          console.log(movies);
          searchSuccessful=true;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    useEffect(() => {
      getMovieRequest(searchItem);
    }, [searchItem]);

    const handleLogOut = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    // function handleSearch(event) {
    //   event.preventDefault();
    //   const queryTerm = event.target.search.value;
    //   event.target.reset();
    //   navigate(`?q=${queryTerm}`);
    // }

    return (
      <div className="flex item-center justify-between p-4 z-[100] w-full absolute">
        <Link to="/">
          <h1 className="text-cyan-600 text-4xl font-bold cursor-pointer">
            Movie Hall
          </h1>
        </Link>
        <SearchBox setSearchItem = {setSearchItem} searchItem={searchItem}/> 
        <span><button onClick={getMovieRequest}>Search</button></span>
        {user?.email ? (
          <div>
            <Link to="/account">
              <button className="text-[#FFFDE3] pr-4">Account</button>
            </Link>

            <button
              onClick={handleLogOut}
              className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 "
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/signIn">
              <button className="text-[#FFFDE3] pr-4">Sign In</button>
            </Link>
            <Link to="/signUp">
              <button className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 ">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  };

  export default Navbar;

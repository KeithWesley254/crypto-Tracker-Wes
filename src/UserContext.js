import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const UserInfo = createContext()

export default function UserContext({ children }){
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem("token"));
  
      fetch("http://feedback-loadbalancer-1037602220.eu-west-2.elb.amazonaws.com/auto_login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
      .then((r) => r.json())
      .then((user) => {
        setUser(user)
      });

      const tokenRet = JSON.parse(localStorage.getItem("token"));
  
      if(user.id){
        fetch(`http://feedback-loadbalancer-1037602220.eu-west-2.elb.amazonaws.com/api/user_profiles/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${tokenRet}`
          },
        })
        .then(r => r.json())
        .then(data => {
          setUserProfile(data)
        })
      }

    }, [user?.id]);

    function handleSubmitSignUp(e, data, state) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("http://feedback-loadbalancer-1037602220.eu-west-2.elb.amazonaws.com/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => {
              window.localStorage.setItem("token", JSON.stringify(user.jwt));
              setUser(user.user);
              setLoggedIn(true);
              navigate(state)
            });
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
    }

    function handleSubmitLogin(e, data, state){
        e.preventDefault();
        setIsLoading(true);
        fetch('http://feedback-loadbalancer-1037602220.eu-west-2.elb.amazonaws.com/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => {
            window.localStorage.setItem("token", JSON.stringify(user.jwt));
            setUser(user.user);
            setLoggedIn(true);
            navigate(state)
            });
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }
    
    function logOut() {
      setUser({});
      setLoggedIn(false);
      setUserProfile({});
      window.localStorage.clear();
      navigate('/')
      window.location.reload();
    }

    return (
        <div>
            <UserInfo.Provider 
            value={{
                user,
                logOut,
                errors,
                loggedIn,
                isLoading,
                userProfile,
                setUserProfile,
                handleSubmitLogin,
                handleSubmitSignUp
            }}>
                {children}
            </UserInfo.Provider>
        </div>
    )
}

export function UserState (){
    return useContext(UserInfo);
}
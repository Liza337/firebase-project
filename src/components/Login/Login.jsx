import React, { useState } from 'react';
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';


const Login = () => {
    const [user, setUser]=useState(null)
    const auth= getAuth(app);
    console.log(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider= new GithubAuthProvider();
    const handleGoogleSingIn =()=>{
        signInWithPopup(auth,googleProvider).then(result =>{
               
            const loggedUser=result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        }).catch(error =>{
            console.log('error',error.message);
        })
    }

    const handleGithubSingIn =()=>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
            const loggedInUser =result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    const handleGoogleSingOut=()=>{
        signOut(auth).then(result=>{
            console.log(result);
            setUser(null);
        })
        .catch(error =>{
            console.log(error);
        })
    }


    return (
        <div>
            {
                user?<button onClick={handleGoogleSingOut}>Sign out</button> :<div>
                       <button onClick={handleGoogleSingIn}>Sign in Google </button>
                       <button onClick={handleGithubSingIn}>Sign in Github </button>

                </div>
            
            }

            {
                user && <div>
                   <h3>user: {user.displayName}</h3>
                   <p>email: {user.email}</p>
                   <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;
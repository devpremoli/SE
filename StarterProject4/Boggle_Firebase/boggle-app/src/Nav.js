
import React, { useState, useEffect } from 'react';
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth,db,logout} from "./firebase";
import "./Nav.css"
import { Avatar } from '@mui/material';
import Button from "@material-ui/core/Button";
/* eslint-disable */
import IconButton from '@material-ui/core/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

function Nav() {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (loading) return;
    fetchUserName();
    }, [user, loading]);
  return (
    <div className='nav'>
        <div className="nav_username"><Button style={{color:"#1de9b6",border: "2px solid #1de9b6"}} variant="outlined">Welcome: {name}</Button></div>

        <div className='nav_avatar'><Avatar sx={{ bgcolor: "#ff4081" }}>{name[0]}</Avatar></div>
        <div className="SignOut">
          <Button variant="outlined" color="secondary" onClick={() => logout()} >
            SignOut
            <IconButton size="small" aria-label="fingerprint" color="secondary">
              <Fingerprint />
            </IconButton>
          </Button>
        </div>
    </div>

  )
}

export default Nav
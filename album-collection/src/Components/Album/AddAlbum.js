import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AddAlbum=(props)=>{
    //This function get all the input like userid and title then call add albumm function for add it on the album list
    const getAlbumFromData=()=>{
        const userid=document.getElementById('aaform-userid-inp').value;
        const title=document.getElementById('aaform-title-inp').value;
        props.addAlbumToList(Number(userid),title);
    }
    return(
        <>
            <Navbar path="/" page="Home" />

            <div className="addalbum-container">
                <div className="addalbum-form">
                    <h4>Enter Album Detail</h4>
                    <div className="inp-container">
                        Enter User Id:- 
                        <input type="number" id="aaform-userid-inp"/>
                    </div>
                    <div className="inp-container">
                        Enter Title:-
                        <input type="text" id="aaform-title-inp"/>
                    </div>
                    <div>
                        <Link to="/"><button onClick={getAlbumFromData}>Add To List</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAlbum;
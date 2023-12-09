import React from "react";
import { Link } from "react-router-dom";
import List from "../List/List";
import Navbar from "../Navbar/Navbar";

//Get All Album List from app and then call list component for each list on the albums

const AlbumList=(props)=>{
    return(
        <>
            <Navbar path="/add-album" page="Add Album" />

            <div className="album-list">
                {props.albums.map((album)=><List album={album} 
                                                key={album.id} 
                                                setUpdateAlbum={props.setUpdateAlbum} 
                                                deleteAlbumFromList={props.deleteAlbumFromList}/>)}
            </div>
        </>
    )
}
export default AlbumList;
import React,{Component} from "react";
import { Route,Routes } from "react-router-dom";
import AddAlbum from "./Components/Album/AddAlbum";
import AlbumList from "./Components/Album/AlbumList";
import UpdateAlbum from "./Components/Album/UpdateAlbum";

export default class App extends Component{
  constructor(){
    super();
    this.state={
      albums:[],
      updateAlbum:{}
    }
  }
  //This Function call first time when App Render
  componentDidMount=async ()=>{
    const albums=await fetch("https://jsonplaceholder.typicode.com/albums")
                        .then((res)=>res.json())
                        .then((json)=>json);

    this.setState({
      albums
    })
  }
  //################### delete album function #####################
  //This function take album id from albums list and then delete the album from albums list and update state
  deleteAlbumFromList=(id)=>{
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`,{method:'DELETE',});
    const newAlbums=this.state.albums.filter((album)=>album.id!==id);
    alert("Your Album Deleted Successfully")
    this.setState({
      albums:newAlbums,
    })
  }

  //################# Update Album #####################
  setUpdateAlbum=async (album)=>{
    this.setState({
      updateAlbum:album,
    })
  }
  updateAlbumInList=async(id,updateTitle,updateUserid,oldAlbum)=>{
    const albums=this.state.albums;
    const index=albums.indexOf(oldAlbum);
    let updatedAlbum=[];
    if(id<100){
      updatedAlbum=await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`,{
        method:'PUT',
        body:JSON.stringify({
          userId:updateUserid,
          id:id,
          title:updateTitle
        }),
        headers:{
          'Content-type':'application/json; charset=UTF-8',

        },

      }).then((res)=>res.json()).then((json)=>json);
    }else{
      updatedAlbum={
        userId:updateUserid,
        id: id,
        title:updateTitle
      }
    }
    albums[index]=updatedAlbum;
    this.setState({
      albums:albums,
    })
    alert("Album Update Successfully");
  }
  //####################### Add Album #########################
  addAlbumToList=(userId,title)=>{
    fetch('https://jsonplaceholder.typicode.com/albums',{
      method:'POST',
      body:JSON.stringify({
        userId: userId,
        id:this.state.count,
        title:title,
      }),
      headers:{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((res)=>res.json()).then((json)=>json);
    const length=this.state.albums.length;
    const lastId=this.state.albums[length-1].id;
    const album={
      userId:userId,
      id:lastId+1,
      title:title
    }
    this.setState({
      albums:[...this.state.albums,album]
    })
    alert("New Album Updated Succesfully");
  }

  // ###################################################################
  render(){
    return(
      <>
        <Routes>
          <Route path="/" element={<AlbumList albums={this.state.albums} 
                                              setUpdateAlbum={this.setUpdateAlbum}
                                              deleteAlbumFromList={this.deleteAlbumFromList}/>}></Route>
          <Route path="/add-album" element={<AddAlbum addAlbumToList={this.addAlbumToList}/>}></Route>
          <Route path="/update-album" element={<UpdateAlbum album={this.state.updateAlbum}
                                                            updateAlbumInList={this.updateAlbumInList}/>}></Route>
        </Routes>
      </>
    )
  }
}
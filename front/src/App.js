import React, { useEffect, useState } from "react"
import Axios from "axios"
import "./App.css"
function App(){
  const [input,setInput] = useState({
    name:"",
    error:""
  })
  const [data,setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get("http://localhost:3001");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  });
  function handleChange(e){
    setInput(prev=>({
      ...prev,
      name:e.target.value
    }))
  }
  function handleReset(){
    setInput({
      name:"",
      error:""
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    const isValid = validate()
    if(isValid){
      const sendData = async() =>{
        const postData = {
          name : input.name.trim()
        }
        await Axios.post("http://localhost:3001",postData)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
      }
      sendData()
      setInput({
        name:"",
        error:""
      })
    }

  }
  function validate(){
    const name = input.name.trim()
    if(name === ""){
      setInput(prev=>({
        ...prev,
        error:"Input Field is Empty"
      }))
      return false
    }
    else if(!/^[a-zA-Z]{2}[a-zA-Z0-9-_\s]*$/.test(name)){
      setInput(prev=>({
        ...prev,
        error:"Invalid input"
      }))
      return false
    }
    else if(data.some(item=>item.name === name)){
      setInput(prev=>({
        ...prev,
        error:"Already Exist"
      }))
      return false
    }
    else{
      setInput(prev=>({
        ...prev,
        error:""
      }))
      return true
    }
  }

  const renderData = () =>{
    if (data.length == 0){
      return(
        <h1>No Data</h1>
      )
    }else{
      return data.map((item,index) =>(
        <div className={item.checked ? "user-list-checked" : "user-list-unchecked"} key={index}>
          <span className="user-list-index">{index+1}</span>
          <span className="user-list-name">{item.name}</span>
          {item.checked ?
          <input type="button" value="Uncheck" onClick={() =>handleUnclick(item._id)} className="user-list-btn-unclick"/>
          :
          <input type="button" value="Check" onClick={() =>handleClick(item._id)} className="user-list-btn-click"/>
          }
          <input type="button" value="Delete" onClick={()=>handleDelete(item._id)} className="user-list-btn-delete"/>
        </div>
      ))
    }
  }

  function handleClick(id){
    const sendData = async() =>{
      const postData = {
        id : id
      }
      await Axios.put("http://localhost:3001/check",postData)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    sendData()
  }

  function handleUnclick(id){
    const sendData = async() =>{
      const postData = {
        id : id
      }
      await Axios.put("http://localhost:3001/check",postData)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    sendData()
  }
  
  function handleDelete(id){
    const sendData = async() =>{
      const postData = {
        id : id
      }
      await Axios.delete("http://localhost:3001",postData)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    sendData()
  }
  return(
   <div className="user-container">
    <h3 className="user-heading">User CURD</h3>
    <form className="user-form" onSubmit={handleSubmit} onReset={handleReset}>
      <div className="user-form-div">
        <input type="text" className="input-field" value={input.name} placeholder="Enter the name" onChange={handleChange}/>
        <div className="user-form-btn">
        <input type="submit" className="input-submit" value="Add"/>
        <input type="reset" className="input-reset" value="Clear"/>
        </div>
      </div>
      {input.error && <span className="input-error">{input.error}</span>}
    </form>
    <div className="user-list-div">
      <ul className="user-list">
          {renderData()}
      </ul>
    </div>
   </div>
  )
}

export default App
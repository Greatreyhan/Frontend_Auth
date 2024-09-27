import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {LoginUser, reset} from "../features/authSlice"

const Login = () => {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth)  

  const Auth = (e)=>{
    e.preventDefault()
    // console.log(email,password)
    dispatch(LoginUser({email,password}))
  }

  useEffect(()=>{
    if(user || isSuccess){
      navigate("/")   
    }
    else{
      dispatch(reset())
    }
  },[user,isSuccess,isError,isLoading])
  return (
    <div>
      <form onSubmit={(e)=>Auth(e)}>
        {isError && <p className="has-text-centered">{message}</p>}
        <input required type="email" value={email} onChange={(e)=>setEmail(e.currentTarget.value)} name='email' placeholder='email@gmail.com' />
        <input required type="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)} name='password' placeholder='*****' />
        <button type="submit">{isLoading ? "Wait...":"Login"}</button>
        </form>
    </div>
  )
}

export default Login
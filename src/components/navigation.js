import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import UserProfile from "../assets/icons/user_profile.png"
import Loading from '../utils/loading';

const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user, isLoading } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        navigate("/login");
      }
    }, [isError, navigate]);


  return (
    <div className='fixed top-0 w-full flex justify-center z-50'>
        {isLoading && <Loading />}
        <div className='w-10/12 mx-auto flex items-center justify-end'>
            <div className='bg-gray-100 pl-6 pr-2 py-2 rounded-bl-lg'>
                <img className='w-12 h-12' src={UserProfile} />
            </div>
            <div className='bg-gray-100 pr-8 pl-2 py-2 rounded-br-lg'>
                <p className='text-xl font-semibold'>{user ? user.name : ""}</p>
                <p className='text-sm capitalize'>{user ? user.role : ""}</p>
            </div>
        </div>
    </div>
  )
}

export default Navigation
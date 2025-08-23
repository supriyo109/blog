import React from 'react'
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import auth from "../assets/auth.jpg"
import store from '../redux/store';
import "./Login.css";

const Login = () => {
  const {loading} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      dispatch(setLoading(true))
      const response = await axios.post(`http://localhost:8000/api/v1/user/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (response.data.success) {
        navigate('/')
        dispatch(setUser(response.data.user))
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error.response.data.message);

    }finally{
      dispatch(setLoading(false))
    }

  };
  const [showpassword, setShowpassword] = useState(false);
  
      return (
          <div className="flex h-screen md:pt-14 md:h-[760px] md:w">
              {/* <div className='hidden md:block'>
                  <img src={auth} alt="" className='h-[700px]'  />
              </div> */}
              <div className="hidden md:flex items-center justify-center w-1/2">
                <img src={auth} alt="Auth" className="imageclass" />
              </div>
              <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
                  <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                      <CardHeader>
                          <CardTitle>
                              <h1 className="text-center text-3xl font-semibold">Login into your account</h1>
                          </CardTitle>
                          <p className=' mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details below to login your account</p>
                      </CardHeader>
                      <CardContent>
                          <form className="space-y-4" onSubmit={handleSubmit}>
                              <div>
                                  <Label htmlFor="email" className='text-xl'>Email</Label>
                                  <Input type="email" id="email"
                                      placeholder="Enter email"
                                      name="email"
                                      className="h-14 !text-xl dark:border-gray-600 dark:bg-gray-900 mt-2" 
                                      value={input.email}
                                      onChange={handleChange}/>
                              </div>
                              <div className='relative'>
                                  <Label className='text-xl' htmlFor="password">Password</Label>
                                  <Input type={showpassword ? "text" : "password"}
                                      placeholder="Enter password" id="password"
                                      name="password"
                                      className="h-14 !text-xl dark:border-gray-600 dark:bg-gray-900 mt-2" 
                                      value={input.password}
                                      onChange={handleChange}/>
                                  <button onClick={()=>setShowpassword(!showpassword)} type="button" className='absolute right-3 top-13 text-gray-500'>
                                      {showpassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                  </button>
                              </div>
                              <Button type="submit" className='h-12 w-full'>
                                {
                                  loading ? (
                                  <>
                                  <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                                  please wait
                                  </>) : ("Login")
                                }
                              </Button>
                              <p className='text-center text-gray-600'>Don't have an Account? <Link to={"/signup"}> <span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign Up</span> </Link></p>
                          </form>
                      </CardContent>
                  </Card>
  
              </div>
          </div>
          
        // <div className="flex flex-col md:flex-row h-screen md:h-[760px]">
        //   {/* Left Side Image */}
        //   <div className="hidden md:flex items-center justify-center w-1/2">
        //     <img src={auth} alt="Auth" className="max-h-[700px] object-contain" />
        //   </div>

        //   {/* Right Side Form */}
        //   <div className="flex justify-center items-center flex-1 px-4 sm:px-6 md:px-0">
        //     <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
        //       <CardHeader>
        //         <CardTitle>
        //           <h1 className="text-center text-xl font-semibold">
        //             Login into your account
        //           </h1>
        //         </CardTitle>
        //         <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
        //           Enter your details below to login your account
        //         </p>
        //       </CardHeader>
        //       <CardContent>
        //         <form className="space-y-4" onSubmit={handleSubmit}>
        //           {/* Email */}
        //           <div>
        //             <Label>Email</Label>
        //             <Input
        //               type="email"
        //               placeholder="Enter email"
        //               name="email"
        //               className="dark:border-gray-600 dark:bg-gray-900 mt-2"
        //               value={input.email}
        //               onChange={handleChange}
        //             />
        //           </div>

        //           {/* Password */}
        //           <div className="relative">
        //             <Label>Password</Label>
        //             <Input
        //               type={showpassword ? "text" : "password"}
        //               placeholder="Enter password"
        //               name="password"
        //               className="dark:border-gray-600 dark:bg-gray-900 mt-2"
        //               value={input.password}
        //               onChange={handleChange}
        //             />
        //             <button
        //               onClick={() => setShowpassword(!showpassword)}
        //               type="button"
        //               className="absolute right-3 top-7 text-gray-500"
        //             >
        //               {showpassword ? <EyeOff size={20} /> : <Eye size={20} />}
        //             </button>
        //           </div>

        //           {/* Submit Button */}
        //           <Button type="submit" className="w-full">
        //             {loading ? (
        //               <>
        //                 <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        //                 Please wait
        //               </>
        //             ) : (
        //               "Login"
        //             )}
        //           </Button>

        //           {/* Signup Link */}
        //           <p className="text-center text-gray-600">
        //             Don't have an Account?{" "}
        //             <Link to="/signup">
        //               <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
        //                 Sign Up
        //               </span>
        //             </Link>
        //           </p>
        //         </form>
        //       </CardContent>
        //     </Card>
        //   </div>
        // </div>

      )
}

export default Login



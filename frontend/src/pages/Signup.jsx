import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import auth from "../assets/auth.jpg"
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import "./Login.css";

const Signup = () => {
    const {loading} = useSelector(store=>store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [User, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(User)

        try {
            dispatch(setLoading(true))
            const response = await axios.post(`https://blog-2-s756.onrender.com/api/v1/user/register`, User, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (response.data.success) {
                navigate('/login')
                toast.success(response.data.message)
            } 
    //else {
    //             toast.error(response.data.message)
    //         }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)


        } finally{
            dispatch(setLoading(false))
        }
    };

    const [showpassword, setShowpassword] = useState(false);

    return (
        <div className="flex  h-screen md:pt-14 md:h-[760px] ">
            <div className='hidden md:block'>
                <img src={auth} alt="" className='imageclass'  />
            </div>
            <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
                <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-center text-3xl font-semibold">Create an account</h1>
                        </CardTitle>
                        <p className=' mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details below to create your account</p>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className='flex gap-3'>
                                <div>
                                    <Label htmlFor="firstname" className="mb-2 ml-2 text-xl">First Name</Label>
                                    <Input type="text"
                                        placeholder="First Name"
                                        name="firstname" id='firstname'
                                        className="dark:border-gray-600 dark:bg-gray-900 h-14 !text-xl"
                                        value={User.firstname}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="lastname" className="mb-2 ml-2 text-xl">Last Name</Label>
                                    <Input type="text"
                                        placeholder="Last Name"
                                        name="lastname" id='lastname'
                                        className="dark:border-gray-600 dark:bg-gray-900 h-14 !text-xl"
                                        value={User.lastname}
                                        onChange={handleChange}/>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2 ml-2 text-xl">email</Label>
                                <Input type="email"
                                    placeholder="abc@gmail.com"
                                    name="email" id='email'
                                    className="dark:border-gray-600 dark:bg-gray-900 h-14 !text-xl" 
                                    value={User.email}
                                    onChange={handleChange}/>
                            </div>
                            <div className='relative'>
                                <Label htmlFor="password" className="mb-2 ml-2 text-xl">password</Label>
                                <Input type={showpassword ? "text" : "password"}
                                    placeholder="create a password"
                                    name="password" id='password'
                                    className="dark:border-gray-600 dark:bg-gray-900 h-14 !text-xl" 
                                    value={User.password}
                                    onChange={handleChange}/>
                                <button onClick={()=>setShowpassword(!showpassword)} type="button" className='absolute right-3 top-10 text-gray-500'>
                                    {showpassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                            <Button type="submit" className='w-full h-9 !text-xl'>
                                {
                                  loading ? (
                                  <>
                                  <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                                  please wait
                                  </>) : ("Sign Up")
                                }
                            </Button>
                            <p className='text-center text-gray-600'>Already have an Account? <Link to={"/login"}> <span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign in</span> </Link></p>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
        
    )
}

export default Signup

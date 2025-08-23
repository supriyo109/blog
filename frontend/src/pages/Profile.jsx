import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userLogo from "../assets/user.jpg"
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import TotalProperty from '@/components/TotalProperty'

const Profile = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        firstname: user?.firstname,
        lastname: user?.lastname,
        occupation: user?.occupation,
        bio: user?.bio,
        facebook: user?.facebook,
        instagram: user?.instagram,
        file: user?.photo
    })

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("firstname", input.firstname);
        formData.append("lastname", input.lastname);
        formData.append("bio", input.bio);
        formData.append("occupation", input.occupation);
        formData.append("facebook", input.facebook);
        formData.append("instagram", input.instagram);
        if (input?.file) {
            formData.append("file", input?.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(`https://blog-4-uaoh.onrender.com/api/v1/user/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                setOpen(false)
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='pt-20 lg:ml-[320px] md:h-screen'>
            <div className='max-w-6xl mx-auto mt-8 '>
                <Card className=" flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
                    {/* image section */}
                    <div className='flex flex-col items-center justify-center md:w-[400px]'>
                        <Avatar className="w-40 h-40 border-2">
                            <AvatarImage src={user?.photo || userLogo} />
                        </Avatar>
                        <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3'>{user?.occupation || "ADD occupation"}</h1>
                        <div className='flex gap-4 items-center'>
                            <Link ><FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                        </div>
                    </div>
                    {/* info section */}
                    <div>
                        <h1 className='font-bold text-center md:text-start text-4xl mb-7'>Welcome {user?.firstname}!</h1>
                        <p className=''><span className='font-semibold'>Email : </span>{user?.email}</p>
                        <div className='flex flex-col gap-2 items-start justify-start my-5'>
                            <Label className="">About Me</Label>
                            <p className='border dark:border-gray-600 p-6  rounded-lg'>{user?.bio || "Exploring the world through words and ideas 🌍"}</p>

                        </div>

                        <Dialog open={open} onOpenChange={setOpen} >
                            <Button onClick={() => setOpen(true)} >Edit Profile</Button>
                            <DialogContent className="md:w-[425px] ">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Edit Profile</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Make changes to your profile here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='grid gap-4 py-4'>
                                    <div className='flex gap-2'>
                                        <div>
                                            <Label htmlFor="name" className="text-right mb-2 ml-2">
                                                First Name
                                            </Label>
                                            <Input
                                                id="firstname"
                                                name="firstname"
                                                value={input.firstname}
                                                onChange={changeEventHandler}
                                                placeholder="First Name"
                                                type="text"
                                                className="col-span-3 text-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastname" className="text-right mb-2 ml-2">
                                                Last Name
                                            </Label>
                                            <Input
                                                id="lastname"
                                                name="lastname"
                                                value={input.lastname}
                                                onChange={changeEventHandler}
                                                placeholder="Last Name"
                                                className="col-span-3 text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                            <Label htmlFor="occupation" className="text-right mb-2 ml-2">
                                                Occupation
                                            </Label>
                                            <Input
                                                id="occupation"
                                                name="occupation"
                                                value={input.occupation}
                                                onChange={changeEventHandler}
                                                placeholder="Enter Occupation"
                                                className="col-span-3 text-gray-500"
                                            />
                                        </div>

                                    {/* <div className='flex gap-2'> */}
                                        <div>
                                            <Label htmlFor='facebook' className='mb-2 ml-2'>Facebook</Label>
                                            <Input id="facebook"
                                                name="facebook"
                                                value={input.facebook}
                                                onChange={changeEventHandler}
                                                placeholder="Enter a URL"
                                                className="col-span-3 text-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor='instagram' className='mb-2 ml-2'>Instagram</Label>
                                            <Input id="instagram"
                                                name="instagram"
                                                value={input.instagram}
                                                onChange={changeEventHandler}
                                                placeholder="Enter a URL"
                                                className="col-span-3 text-gray-500"
                                            />
                                        </div>
                                    {/* </div> */}
                                    
                                    <div>
                                        <Label htmlFor="bio" className="text-right mb-2 ml-2">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            value={input.bio}
                                            onChange={changeEventHandler}
                                            name="bio"
                                            placeholder="Enter a description"
                                            className="col-span-3 text-gray-500"
                                        />
                                    </div>
                                    <div >
                                        <Label htmlFor="file" className="text-right mb-2 ml-2">
                                            Picture
                                        </Label>
                                        <Input
                                            id="file"
                                            type="file"
                                            accept="image/*"
                                            onChange={changeFileHandler}
                                            className="w-[277px]"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    {
                                        loading ? <Button ><Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait</Button> : <Button
                                            onClick={submitHandler} >Save Changes</Button>
                                    }

                                </DialogFooter>
                            </DialogContent>
                        </Dialog>


                    </div>
                </Card>
            </div>
            <TotalProperty/>
        </div>
    )
}

export default Profile
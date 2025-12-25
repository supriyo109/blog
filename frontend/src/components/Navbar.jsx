// import React, {useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import logo from "../assets/logo.png"
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// // import {Search} from 'lucide-react'
// import { FaEdit, FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { useDispatch, useSelector } from 'react-redux'
// import { toggleTheme } from '../redux/themeSlice'
// import axios from 'axios'
// import { setUser } from '../redux/authSlice'
// import { toast } from 'sonner'
// import userLogo from "../assets/user.jpg"
// import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";


// import {
//     ChartColumnBig,
//     Cloud,
//     CreditCard,
//     Github,
//     Keyboard,
//     LifeBuoy,
//     LogOut,
//     Mail,
//     MessageSquare,
//     Plus,
//     PlusCircle,
//     Search,
//     Settings,
//     User,
//     UserPlus,
//     Users,
// } from "lucide-react"

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu"
// import { LiaCommentSolid } from "react-icons/lia";
// import ResponsiveMenu from './ResponsiveMenu'

// const Navbar = () => {
//   const {user} = useSelector(store=>store.auth)
//   const {theme} = useSelector(store=>store.theme)
//   const [searchTerm, setSearchTerm] = useState('');
//   const [openNav, setOpenNav]= useState(false)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const logoutHandler = async (e)=>{
//     try {
//       const res = await axios.get(`https://blog-5-qvj7.onrender.com/api/v1/user/logout`,{withCredentials:true})
//       if(res.data.success){
//         navigate("/")
//         dispatch(setUser(null))
//         toast.success(res.data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error)
//     }
//   }

  
//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchTerm.trim() !== '') {
//             navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//             setSearchTerm('')
//         }
//     };

//      const toggleNav = ()=>{
//         setOpenNav(!openNav)
//     }

//   return (
//     <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
//       <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
//         {/* logo section */}
//         <div className='flex gap-7 items-center'>
//           <Link to={'/'}>
//             <div className='flex gap-2 items-center'>
//               <img src={logo} alt="" className='w-7 h-7 md:h-10 md:w-10 dark:invert' />
//               <h1 className='font-bold text-3xl md:text-4xl'>Logo</h1>
//             </div>
//           </Link>
//           <div className='relative hidden md:block'>
//             <Input type="text" placeholder="search..." 
//             value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
//             className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"/>
//             <Button onClick={handleSearch} className="absolute right-0 top-0"><Search/></Button>
//           </div>
//         </div>
//         {/* nav section */}
//         <nav className='flex md:gap-7 gap-4 items-center'>
//           <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
//             <Link to={'/'}> <li>Home</li> </Link>
//             <Link to={'/blogs'}> <li>Blogs</li> </Link>
//             <Link to={'/about'}> <li>About</li> </Link>
//           </ul>
//           <div className='flex'>
//             <Button onClick={()=>dispatch(toggleTheme())}>
//               {
//                 theme === 'light' ? <FaMoon/> :<FaSun/>
//               }
//             </Button>
//             {
//               user ? <div className='ml-7 flex gap-3 items-center'>
                


//                 {/* <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Avatar>
//                       <AvatarImage src="https://github.com/shadcn.png" />
//                       <AvatarFallback>CN</AvatarFallback>
//                     </Avatar>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-56" align="start">
//                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                     <DropdownMenuGroup>
//                       <DropdownMenuItem>
//                         Profile
//                         <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         Your Blogs
//                         <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         Comments
//                         <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         Write Blogs
//                         <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
//                       </DropdownMenuItem>
//                     </DropdownMenuGroup>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuGroup>
//                       <DropdownMenuItem>Team</DropdownMenuItem>
//                       <DropdownMenuSub>
//                         <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
//                         <DropdownMenuPortal>
//                           <DropdownMenuSubContent>
//                             <DropdownMenuItem>Email</DropdownMenuItem>
//                             <DropdownMenuItem>Message</DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>More...</DropdownMenuItem>
//                           </DropdownMenuSubContent>
//                         </DropdownMenuPortal>
//                       </DropdownMenuSub>
//                       <DropdownMenuItem>
//                         New Team
//                         <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
//                       </DropdownMenuItem>
//                     </DropdownMenuGroup>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem>
//                       Log out
//                       <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator />
                    
//                   </DropdownMenuContent>
//                 </DropdownMenu> */}

//                  <DropdownMenu className="">
//                                     <DropdownMenuTrigger asChild>
//                                         <Avatar className="cursor-pointer">
//                                             {/* <AvatarImage /> */}
//                                              <AvatarImage src={user.photo || userLogo} />
//                                             <AvatarFallback>CN</AvatarFallback>
//                                         </Avatar>
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent className="w-56 dark:bg-gray-800">
//                                         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                                         <DropdownMenuSeparator />
//                                         <DropdownMenuGroup>
//                                             <DropdownMenuItem onClick={()=>navigate('/dashboard/profile')}>
//                                                 <User />
//                                                 <span>Profile</span>
//                                                 <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//                                             </DropdownMenuItem>
//                                             <DropdownMenuItem onClick={()=>navigate('/dashboard/your-blog')}>
//                                                 <ChartColumnBig />
//                                                 <span>Your Blog</span>
//                                                 <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//                                             </DropdownMenuItem>
//                                             <DropdownMenuItem onClick={()=>navigate('/dashboard/comments')}>
//                                                 <LiaCommentSolid />
//                                                 <span>Comments</span>
//                                                 <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//                                             </DropdownMenuItem>
//                                             <DropdownMenuItem onClick={()=>navigate('/dashboard/write-blog')}>
//                                                 <FaRegEdit />
//                                                 <span>Write Blog</span>
//                                                 <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//                                             </DropdownMenuItem>
//                                         </DropdownMenuGroup>
//                                         <DropdownMenuSeparator />
//                                         <DropdownMenuItem onClick={logoutHandler}>
//                                             <LogOut />
//                                             <span>Log out</span>
//                                             <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//                                         </DropdownMenuItem>
//                                     </DropdownMenuContent>
//                                 </DropdownMenu>


//                 <Button className='hidden md:block' onClick={logoutHandler}>Logout</Button>
//               </div>: <div className='ml-7 md:flex gap-2'>
//                 <Link to={"/login"}> <Button>Login</Button> </Link>
//                 <Link className='hidden md:block' to={"/signup"}> <Button>Sign Up</Button> </Link>
//               </div>
//             }
//           </div>
//           {
//             openNav? <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 md:hidden'/>:<HiMenuAlt1 className='w-7 h-7 md:hidden' onClick={toggleNav}/>
//           }
//         </nav>
//         <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler} />
//       </div>
//     </div>
//   )
// }

// export default Navbar



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaMoon, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import userLogo from "../assets/user.jpg";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { Search, LogOut, User, ChartColumnBig } from "lucide-react";
import { LiaCommentSolid } from "react-icons/lia";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // 👈 NEW state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `https://blog-5-qvj7.onrender.com/api/v1/user/logout`,
        { withCredentials: true }
      );
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowSearch(false); // hide after searching
    }
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Logo */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <div className="flex gap-2 items-center">
              <img
                src={logo}
                alt=""
                className="w-7 h-7 md:h-10 md:w-10 dark:invert"
              />
              <h1 className="font-bold text-3xl md:text-4xl">Blox</h1>
            </div>
          </Link>

          {/* Search (Desktop) */}
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[150px] lg:w-[300px]"
            />
            <Button onClick={handleSearch} className="absolute right-0 top-0">
              <Search />
            </Button>
          </div>
        </div>

        {/* Nav section */}
        <nav className="flex md:gap-7 gap-4 items-center">
          {/* Links hidden if search is open on mobile */}
          {!showSearch && (
            <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
              <Link to={"/"}>
                <li>Home</li>
              </Link>
              <Link to={"/blogs"}>
                <li>Blogs</li>
              </Link>
              <Link to={"/about"}>
                <li>About</li>
              </Link>
            </ul>
          )}

          {/* Search button (Mobile) */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              {
                !showSearch?<Search />:<RxCross2 />

              }
              
            </Button>
          </div>

          {/* Search input (Mobile toggle) */}
          {showSearch && (
            
            <div className="absolute left-0 top-full w-full p-2 bg-white dark:bg-gray-800 border-b md:hidden">
              <div className="flex gap-2">
                                
             <Input type="text" placeholder="search..." 
             value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
             className="flex-1 border border-gray-700 dark:bg-gray-900"/>
             <Button onClick={handleSearch} className="absolute right-2 top-2"><Search/></Button>
        
              </div></div>
            // </form>
          )}

          {/* Theme + User */}
          {!showSearch && (
            <div className="flex items-center">
              <Button onClick={() => dispatch(toggleTheme())}>
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </Button>
              {user ? (
                <div className="ml-7 flex gap-3 items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user.photo || userLogo} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 dark:bg-gray-800">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => navigate("/dashboard/profile")}
                        >
                          <User />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/dashboard/your-blog")}
                        >
                          <ChartColumnBig />
                          <span>Your Blog</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/dashboard/comments")}
                        >
                          <LiaCommentSolid />
                          <span>Comments</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/dashboard/write-blog")}
                        >
                          <FaRegEdit />
                          <span>Write Blog</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logoutHandler}>
                        <LogOut />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button className="hidden md:block" onClick={logoutHandler}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="ml-7 md:flex gap-2">
                  <Link to={"/login"}>
                    <Button>Login</Button>
                  </Link>
                  <Link className="hidden md:block" to={"/signup"}>
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu icon */}
          {!showSearch &&
            (openNav ? (
              <HiMenuAlt3
                onClick={toggleNav}
                className="w-7 h-7 md:hidden"
              />
            ) : (
              <HiMenuAlt1
                className="w-7 h-7 md:hidden"
                onClick={toggleNav}
              />
            ))}
        </nav>

        {/* Responsive drawer menu */}
        <ResponsiveMenu
          openNav={openNav}
          setOpenNav={setOpenNav}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;

"use client";

import { SearchOffSharp } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';


const Navbar = () => {
    const router  = useRouter()
const [search, setSearch] = useState<string>('');
const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);

const [isScrolled, setIsScrolled] = useState<boolean>(false);
const handleScroll = () => {
    if (window.scrollY > 10) {
        setIsScrolled(true);
    } else {
        setIsScrolled(false);
    }
}

useEffect(() => {
   window.addEventListener('scroll', handleScroll);

    return () => {
         window.removeEventListener('scroll', handleScroll);
    }
}, []);

  return (
   <div className={ `top-0 z-10 sticky flex items-center justify-between py-3 px-10 ${isScrolled ? 'bg-black' : 'bg-transparent'} transition-all duration-300` }>
    <Link href={'/'}>
     <img src="/assets/netflix_logo.svg" alt="" className='w-30' />
    </Link>

    <div className='flex gap-8 max-md:hidden'>
        <Link href={'/'} className='text-white text-base-bold mr-4 cursor-pointer hover:text-red-500'>Home</Link>
        <Link href={'/series'} className='text-white text-base-bold mr-4  cursor-pointer hover:text-red-500'>Series</Link>
        <Link href={'/movies'} className='text-white text-base-bold mr-4  cursor-pointer hover:text-red-500'>Movies</Link>
        <Link href={'/new-and-popular'} className='text-white text-base-bold mr-4  cursor-pointer hover:text-red-500'>New & Popular</Link>
        <Link href={'/my-list'} className='text-white text-base-bold  cursor-pointer hover:text-red-500'>My List</Link>
    </div>

    <div className='flex gap-8 items-center'>
        <div className=' flex justify-between items-center gap-2 px-4 py-2 rounded-xl'>
            <input type="text" placeholder='Search movie...'className=' w-40 bg-transparent outline-none text-body-medium text-white' value={search} onChange={(e)=> setSearch(e.target.value)} />

            <button disabled={search === ""} >
            <SearchIcon className='size-7 cursor-pointer text-white hover:text-red-500' onClick={()=> router.push(`/search/${search}`)}/>
                </button>
        </div>
        <img src="/assets/profile_icon.jpg" alt="" className=' w-8 h-auto cursor-pointer' onClick={()=> setDropDownMenu(!dropDownMenu) }/>

        {dropDownMenu && (
            <div className=' absolute top-20 p-3 flex flex-col gap-3 right-5 z-20 w-32 bg-white rounded-xl'>
       <Link href={'/'}>Home</Link>
        <Link href={'/series'}>Series</Link>
        <Link href={'/movies'}>Movies</Link>
        <Link href={'/new-and-popular'} >New & Popular</Link>
        <Link href={'/my-list'} >My List</Link>
        <a href="Log Out">Log Out</a>
            </div>
            )
        }
    </div>
   </div>
  );
};
export default Navbar;
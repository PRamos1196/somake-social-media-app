import React, {useState, useEffect }from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { GoogleLogin, googleLogout } from '@react-oauth/google';

import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/Somake-logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';

interface IProps {
  
}

const Navbar = () => {

  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();
  
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="bg-[#0F0F0F] w-full flex justify-between items-center py-2 px-4">
        <Link href="/">
            <div className="w-[100px] md:w-[130px]">
                <Image className="cursor-pointer" src={Logo} alt="Somake" layout="responsive"/>
            </div>
        </Link>
        <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20'
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 text-white md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search accounts and videos'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
        <div>
          {user ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className="rounded bg-[#272727] px-1 py-2 text-white px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                  <IoMdAdd className="text-xl" /> {` `}
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>  
              {user.image && (
                <Link href={`/profile/${user._id}`}>
                <>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={user.image}
                    alt='user-profile'
                  />
                </>
              </Link>
              )}
              <button type="button" 
                className="px-2" 
                onClick={()=>{
                googleLogout();
                removeUser();
                }}>
                <AiOutlineLogout color="white" fontSize={21}/>
              </button>
            </div>
          ) : (
            <GoogleLogin 
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.
                log('error')}
            />
          )}
        </div>
    </div>
  )
}

export default Navbar
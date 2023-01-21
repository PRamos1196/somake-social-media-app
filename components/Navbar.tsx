import React from 'react';

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


const Navbar = () => {

  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className="bg-[#0F0F0F] w-full flex justify-between items-center py-2 px-4">
        <Link href="/">
            <div className="w-[100px] md:w-[130px]">
                <Image className="cursor-pointer" src={Logo} alt="Somake" layout="responsive"/>
            </div>
        </Link>
        <div>
          SEARCH
        </div>
        <div>
          {userProfile ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className="rounded bg-[#272727] px-1 py-2 text-white px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                  <IoMdAdd className="text-xl" /> {` `}
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>  
              {userProfile.image && (
                <Link href={`/`}>
                <>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={userProfile.image}
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
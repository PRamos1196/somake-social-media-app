import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';

const Search = ({videos} : {videos: Video[]}) => {

  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();
  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accounts = isAccounts ? 'text-[#70C8E8] bg-[#272727] rounded p-3' : 'text-gray-400'
  const isVideos = !isAccounts ? 'text-[#70C8E8] bg-[#272727] rounded p-3' : 'text-gray-400'

  const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm));

  return (

    <div className='w-full'>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200'>
                <p className={`text-xl font-semibold 
                    cursor-pointer mt-2 p-3 ${accounts}`} onClick=
                    {() => setIsAccounts(true)}>
                        Accounts
                    </p>
                    <p className={`text-xl font-semibold 
                    cursor-pointer mt-2 p-3 ${isVideos}`} onClick=
                    {() => setIsAccounts(false)}>
                        Videos
                    </p>
        </div>
        {isAccounts ? (
            <div className="md:mt-16">
                {searchedAccounts.length > 0 ? (
                    searchedAccounts.map((user: IUser, idx: number) => (
                        <Link href={`/profile/${user._id}`} key={idx}>
                            <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                            <div>
                                <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                            </div>
                            <div>
                                <div>
                                <p className='flex gap-1 text-white items-center text-lg font-bold'>
                                    {user.userName} <GoVerified className='text-blue-400' />
                                </p>
                                <p className='capitalize text-gray-400 text-sm'>
                                    {user.userName}
                                </p>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))
                ) : (
                    <NoResults text={`No Account Results for ${searchTerm}`} />
                )}
            </div>
            ) : (
                <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                    {videos.length ? (
                        videos.map((post: Video, idx: number) => (
                            <VideoCard post={post} key={idx} />
                        ))
                    ) : (
                        <NoResults text={`No Video Results for ${searchTerm}`} />
                    )}
                </div>
            )}
    </div>
  )
}

export const getServerSideProps = async ({
    params: { searchTerm },
  }: {
    params: { searchTerm: string };
  }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  
    return {
      props: { videos: res.data },
    };
  };

export default Search
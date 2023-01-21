import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';

import useAuthStore from '../store/authStore';

interface IProps {
  likes: any;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({ likes, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const [ wiggle, setWiggle] = useState(false);
  
  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`flex gap-6`}>
      <div className='mt-4 flex flex-col justify-center items-center text-white cursor-pointer'>
        {alreadyLiked ? (
          <div className={`bg-primary rounded-full p-2 md:p-4 text-[#F51997] ${wiggle && "animate-wiggle"}`} onClick={handleDislike} >
            <MdFavorite className='text-lg md:text-2xl' onClick={()=>{setWiggle(true)}} onAnimationEnd={() => setWiggle(false)}/>
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4 text-white' onClick={handleLike}>
            <MdFavorite className='text-lg md:text-2xl text-white'/>
          </div>
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'


const Comments = () => {
  const { userProfile } = useAuthStore();
  const comments = [];
  const isPostingComment = false;

  return (
    <div className="border-t-2 border-gray-300 pt-4 px-10 mt-4 bg-[#121212] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[457px]">
        {comments.length ? (
          <div>videos</div>
        ) : (
          <NoResults text="No comments yet"/>
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={() => {}} className="flex gap-4">
            <input value="" onChange={() => {}} placeholder="Add comment..." className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'/>
            <button className='text-white text-md' onClick={() => {}}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
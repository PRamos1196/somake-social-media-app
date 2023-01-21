import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';

import type { NextPage} from 'next'; 
import { Url } from 'url';

import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full  bg-[#0f0f0f]">
        {videos.length ? (
          videos.map((video: Video ) => (
            <VideoCard post={video} key={video._id}/>
          ))
        ): ( 
          <NoResults text={'No Videos'} />
        )}
    </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data
    }
  }
}
import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import {NextPage} from 'next';
import Link from 'next/link';
import {HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import {BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

interface IProps {
    post: Video;
}

const VideoCard: NextPage<IProps> = ({post}) => {
  return (
    <div>

    </div>
  )
}

export default VideoCard
'use client';
import React, { useEffect, useState } from 'react';
import { VideoBody } from './_components/video/video-body';
import { CommentBody } from './_components/comment/comment-body';
import { Room } from './_components/video-room';

import axios from 'axios';
import { YoutubeSearchResponse } from '@/types/type-video';

interface VideoPageProps {
    params: {
        videoId: string;
    };
}

const VideoPage = ({ params }: VideoPageProps) => {
    const [search, setsearch] = useState('');
    const [results, setresults] = useState<YoutubeSearchResponse[]>();
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (search === '') throw Error("search can't be empty");
            const params = {
                key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
                q: search,
                part: 'snippet',
                type: 'video',
                maxResults: 10,
                videoEmbeddable: true,
            };

            const res = await axios.get(
                'https://www.googleapis.com/youtube/v3/search',
                {
                    params,
                }
            );
            if (res.status === 200) {
                setresults(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        console.log(results);
    }, [results]);

    return (
        <>
            <input
                type="text"
                value={search}
                className="border-2 border-black"
                onChange={(e) => setsearch(e.target.value)}
            />
            <button className=" border" onClick={handleClick}>
                aaa
            </button>
            <div></div>
        </>
        // <Room videoId={params.videoId}>

        //     <VideoBody />
        //     <CommentBody />
        // </Room>
    );
};

export default VideoPage;

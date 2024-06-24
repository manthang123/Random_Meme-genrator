import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import useGif from '../hooks/useGif';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

function Random() {
   
    const {gif, loading, fetchData} = useGif ();

    function changeHandler() {
        fetchData();
    }

    return (
        <div className='w-1/2 bg-green-400 rounded-lg border border-black 
        flex flex-col items-center gap-y-5 mt-[15px]'>
            <h1 className='text-2xl underline uppercase font-bold'>A Random GIF</h1>
            {loading ? <Spinner /> : <img src={gif} alt="Random GIF" width="450" />}
            <button
                className='w-10/12 bg-yellow-300 text-lg py-2 rounded-lg mb-5'
                onClick={changeHandler}
            >
                Generate
            </button>
        </div>
    );
}

export default Random;

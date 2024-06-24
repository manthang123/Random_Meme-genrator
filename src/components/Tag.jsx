import React, { useState, useEffect } from 'react';
import useGif from '../hooks/useGif';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

function Tag() {
    const [tag, setTag] = useState('');
    const { gif, loading, fetchData } = useGif(tag);
    const [error, setError] = useState(null);

    let debounceTimer;

    const handleInputChange = (e) => {
        const inputTag = e.target.value;
        setTag(inputTag);

        // Debounce fetchData function
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetchData(inputTag);
        }, 500); // Adjust debounce delay as needed
    };

    const handleGenerateClick = () => {
        fetchData(tag);
    };

    return (
        <div className='w-1/2 bg-blue-400 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
            <h1 className='text-2xl underline uppercase font-bold'>Random GIF</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : gif ? (
                <img
                    src={gif}
                    alt="Random GIF"
                    width="450"
                    onError={() => setError("Failed to load image")}
                />
            ) : (
                <p>No GIF loaded yet</p>
            )}
            <input
                type="text"
                value={tag}
                onChange={handleInputChange}
                placeholder="Enter a tag"
                className="p-2 rounded"
            />
            <button onClick={handleGenerateClick} className="p-2 bg-yellow-500 rounded">
                Generate
            </button>
        </div>
    );
}

export default Tag;

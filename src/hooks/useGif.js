import { useState, useEffect } from 'react';
import axios from 'axios';

function useGif(tag) {
    const [gif, setGif] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
    const randomMemeUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
    const tagMemeUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=`;

    async function fetchData() {
        setLoading(true);
        try {
            let url = tag ? `${tagMemeUrl}${tag}` : randomMemeUrl;
            const { data } = await axios.get(url);
            const imageSource = data.data.images.downsized_large.url;
            setGif(imageSource);
        } catch (error) {
            console.error("Error fetching the gif", error);
            setGif(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(); // Call fetchData initially
    }, [tag]); // Call fetchData whenever 'tag' changes

    return { gif, loading, fetchData };
}

export default useGif;

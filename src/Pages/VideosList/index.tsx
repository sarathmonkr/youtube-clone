import { Container, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/AxiosInterceptor/Api';
import { Fragment, useEffect, useState } from 'react';
import VideoCard from '../../Components/VideoList/VideoCard';
import { useSearchContext } from '../../Utils/Contexts/searchContext';

interface VideosType {
    id: number;
    channel_name: string;
    thumbnail: string;
    title: string;
    created_date: string;
    views: number;
}

const VideosList = () => {
    const { searchValue } = useSearchContext();
    const [videos, setVideos] = useState<VideosType[]>([]);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    console.log("searchValue", searchValue);

    const fetchVideos = async (page: number, searchValue: string) => {
        const response = await API.get(`/feeds/get-videos?page=${page}&search=${searchValue}`);
        return response?.data;
    };

    const { data: videosData } = useQuery({
        queryKey: ['videos-list', page, searchValue],
        queryFn: () => fetchVideos(page, searchValue),
    });

    useEffect(() => {
        if (videosData?.data?.results?.data) {
            setVideos(prevVideos => [...prevVideos, ...videosData.data.results.data]);
        }
    }, [videosData]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoadingMore) return;
        setIsLoadingMore(true);
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoadingMore]);

    useEffect(() => {
        if (isLoadingMore) {
            fetchVideos(page, searchValue).then(newVideos => {
                setVideos(prevVideos => [...prevVideos, ...newVideos.data.results.data]);
                setIsLoadingMore(false);
            });
        }
    }, [isLoadingMore, page]);

    useEffect(() => {
        setVideos([]);
        setPage(1);
    }, [searchValue]);

    return (
        <Container fluid>
            <Row>
                {videos.map(video => (
                    <Fragment key={video.id}>
                        <VideoCard
                            id={video?.id}
                            channelName={video?.channel_name}
                            thumbnail={video?.thumbnail || "https://placehold.co/600x400/orange/white"}
                            title={video?.title}
                            uploadTime={video?.created_date}
                            views={"2.3K"}
                        />
                    </Fragment>
                ))}
            </Row>
        </Container>
    );
};

export default VideosList;
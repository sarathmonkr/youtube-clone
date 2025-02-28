import { CgProfile } from 'react-icons/cg';
import { TiTick } from 'react-icons/ti';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Button } from 'reactstrap';
import { timeAgo } from '../../Utils/timesAgo';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { HiOutlineSave } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import API from '../../Utils/AxiosInterceptor/Api';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { VideosType } from '../VideosList';

const ViewVideo = () => {

    const { id: videoId } = useParams()

    const { data: videoData } = useSuspenseQuery({
        queryKey: ['video', videoId],
        queryFn: async () => {
            const response = await API.get(`/feeds/get-video-details?feed_id=${videoId}`);
            return response?.data?.data
        }
    })

    const fetchVideos = async () => {
        const response = await API.get(`/feeds/get-videos`);
        return response?.data;
    };

    const { data: videosData } = useQuery({
        queryKey: ['videos-list'],
        queryFn: () => fetchVideos(),
    });

    return (
        <Container className="mt-4">
            <Row>
                <Col md="8">
                    <div className="view-video">
                        <iframe
                            className="embed-responsive-item"
                            src={videoData?.video_link}
                            width="100%"
                            height="500px"
                            allowFullScreen
                            title="Video"
                        ></iframe>
                    </div>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">{videoData?.title}</CardTitle>
                            <CardText className='d-flex justify-content-between'>
                                <div>
                                    <CgProfile className='h3 me-3' />
                                    {videoData?.channel_name} <TiTick />
                                    <Button color="primary btn-danger" className="ms-3">Subscribe</Button>
                                </div>
                                <div>
                                    <AiOutlineLike className='h5 ms-3' /> Like
                                    <AiOutlineDislike className='h5 ms-3' /> Dislike
                                    <FaShare className='h5 ms-3' /> Share
                                    <IoMdDownload className='h5 ms-3' /> Download
                                    <HiOutlineSave className='h5 ms-3' /> Save
                                </div>
                            </CardText>
                            <CardText>1,234,567 views • {timeAgo(videoData?.created_date)}</CardText>
                            <CardText>{videoData?.description}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4" className='overflow-auto vh-100' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {videosData?.data?.results?.data?.map((video: VideosType, index: number) => (
                        <Card key={index} className="mb-3 mt-0">
                            <CardImg width="100%" src={video?.thumbnail || `https://placehold.co/600x400/orange/white`} alt={`Video ${video}`} />
                            <CardBody>
                                <CardTitle tag="h6">Related Video {video?.title}</CardTitle>
                                <CardText>{video?.channel_name}</CardText>
                                <CardText>{timeAgo(video?.created_date)}</CardText>
                            </CardBody>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default ViewVideo;
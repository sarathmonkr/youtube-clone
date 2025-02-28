import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { Col, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'
import { timeAgo } from '../../Utils/timesAgo'

interface VideoCardPropsType {
    id: number,
    thumbnail: string,
    title: string,
    channelName: string,
    views: string,
    uploadTime: string
}

const VideoCard: React.FC<VideoCardPropsType> = ({
    id,
    thumbnail,
    title,
    channelName,
    views,
    uploadTime
}) => {

    const navigate = useNavigate()

    function onVideoCardClick(id: number) {
        navigate(`/view-video/${id}`)
        window.scrollTo(0, 0)
    }

    return (
        <Col xs="12" sm="6" md="4" lg="3" className="mb-4">
            <Card className="video-card cursor-pointer" onClick={() => onVideoCardClick(id)}>
                <CardImg top width="100%" src={thumbnail} alt={title} className="video-thumbnail" />
                <CardBody className="video-body p-2">
                    <div className="d-flex align-items-center mb-2">
                        {/* <img src={profileIcon} alt="Profile" className="rounded-circle me-2" width="40" height="40" /> */}
                        <CgProfile className='h3 me-3' />

                        <div>
                            <CardTitle tag="h6" className="video-title mb-0">{title}</CardTitle>
                            <CardText className="channel-name text-muted small">{channelName}</CardText>
                        </div>
                    </div>
                    <CardText className="views-upload-time text-muted small">{views} • {timeAgo(uploadTime)}</CardText>
                </CardBody>
            </Card>
        </Col>
    )
}

export default VideoCard


import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { styled } from '@mui/material';
import { bannerData } from '../../../constant/carousel';

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    height: 473,
    objectFit: 'cover',
    borderRadius: '20px',
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: 280
    },
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        height: 100,
        borderRadius: '5px',
    }
}))
const Carous = styled(Carousel)`
margin: 7px 0px 0px 0px;
`

const responsive = {

    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const NavB = () => {
    return (
        <Carous
            responsive={responsive}
            swipeable={true}
            draggable={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            slidesToSlide={1}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            containerClass="carousel-container">
            {
                bannerData && bannerData.map((item) => (
                    <Image src={item.url} key={item.id} alt="banner" />
                ))
            }

        </Carous>
    )
}

export default NavB;

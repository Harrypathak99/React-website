import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryItems } from '../services/apiv2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import imgs from './images/banner.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import demo from './images/demo.jpg';


const Trendingdishes = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
   const swiperRef = useRef();
    // const swiperElRef = useRef(null);
  
  //   useEffect(() => {
  //     // listen for Swiper events using addEventListener
  //     swiperElRef.current.addEventListener('swiperprogress', (e) => {
  //       const [swiper, progress] = e.detail;
  //       console.log(progress);
  //     });
  
  //     swiperElRef.current.addEventListener('swiperslidechange', (e) => {
  //       console.log('slide changed');
  //     });
  //   }, []);
    useEffect(() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 600);
      // swiperElRef.current.addEventListener('swiperprogress', (e) => {
      //     const [swiper, progress] = e.detail;
      //     console.log(progress);
      //   });
    
      //   swiperElRef.current.addEventListener('swiperslidechange', (e) => {
      //     console.log('slide changed');
      //   });
      const fetchMenuItems = async () => {
        try {
          const response = await getCategoryItems();
          setMenuItems(response.data);
        } catch (error) {
          console.error('Error fetching menu items:', error);
        }
      };
  
      fetchMenuItems();
    }, []);
   
  return (
    
    <div class="sider-container">
    
        <div className='slider-title'>
            Trending Dishes
        </div>
        <div style={{width: "100%", height: "210px"}}>

        <div className='flexing-1'>
        <div style={{width: "100%", height: "210px"}}>
        <Swiper
        pagination={{
          type: 'progressbar',
        }}
        slidesPerView={4}
        breakpoints={{
        // When window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        // When window width is >= 480px
        480: {
          slidesPerView: 2,
        },
        // When window width is >= 768px
        768: {
          slidesPerView: 3,
        },
        // When window width is >= 992px
        992: {
          slidesPerView: 4,
        },
      }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
    >
     
      {menuItems.map((item) => (
      <SwiperSlide>

      {loading ? ( <div class="loading-v">
      </div>) : (
      <Link to={`/menu/${item.id}`}> 
      
      <div key={item.id} class="slider-content"> 
                <div className='image-content'>
                  <img src={`http://localhost:8000/uploads/`+item.file_path} alt='imagess' class='img-class' style={{width: "100%", height: "150px", filter: "brightness(70%"}} />
                </div>
                <div className='slider-des'>
                <div class="star">&#9734;&#9733;&#9733;&#9733;&#9733;</div> 
                <div class="food-name">{item.name}</div>
                    <div class="price-dollar">Rs.{item.price}</div>
                    <div class="discount">-{item.discount}%</div> 
                    </div>
                    <div class="overlay">
      <div class="overlay-content">
        
      </div>
    </div>
            </div> 
            
            </Link> )}
           
            </SwiperSlide>
            ))}
    </Swiper>
    </div>
    </div>
    <div className='flexing-2'>
    
        <button className='styled-button' onClick={() => swiperRef.current.slideNext()}>
        &gt;
      </button><br />
     
        
    </div>
    </div>
   
    
    </div>
        
  )
}

export default Trendingdishes;
import { SplideRenderer } from '@splidejs/splide';
import Quote from '../assets/blockquote.svg'
import {reviews} from './reviewsData'
import {Splide,SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'; 

const Testimonial = () => {
  return <section className = "testimonial-container">  

  <div className="title">
    <h1>Testimonial</h1>
    <p>What are members saying.</p>
  </div>


  <div className="slider-container">
    <blockquote>
      <img src={Quote} className="quote top-quote" alt="" />
      <img src={Quote} className="quote bottom-quote" alt="" />
    </blockquote>

  <Splide options={{ perPage: 1, type: 'loop', speed: 3000, autoplay: true }}>
    {reviews.map((review) => (
      <SplideSlide key={review.id}>
        <img src={review.image} className='review-img' alt="" />

        <div className='content'>
          <p className='text'>{review.text}</p>

          <div className='info'>
            <div className="rating">
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
              <span className="star">&#9733;</span>
            </div>
            <div className="user">{review.name}</div>
          </div>
        </div>
      </SplideSlide>
    ))}
  </Splide>

  </div>

  </section>
}

export default Testimonial
import React from 'react';
import { Carousel, Image } from 'antd';
import img1 from "../assests/img/carousel1.jpg";
import img2 from "../assests/img/carousel2.jpg";
import img3 from "../assests/img/carousel3.jpg";
import img4 from "../assests/img/carousel4.jpg";
import img5 from "../assests/img/carousel5.jpg";
// import img6 from "../assests/img/post-img-5.jpg";
// import img7 from "../assests/img/post-img-5.jpg";




const contentStyle: React.CSSProperties = {
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const imgStyle: React.CSSProperties = {
  // height: '100%',
  width: '50%',
  alignItems: 'center'
};

function Home() {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <Image src={img1} style={imgStyle} />
        </div>
        <div>
          <Image src={img2} style={imgStyle} />
        </div>
        <div>
          <Image src={img3} style={imgStyle} />
        </div>
        <div>
          <Image src={img4} style={imgStyle} />
        </div>
        <div>
          <Image src={img5} style={imgStyle} />
        </div>
        {/* <div>
          <Image src={img6} style={imgStyle} />
        </div>
        <div>
          <Image src={img7} style={imgStyle} />
        </div> */}
      </Carousel>
    </div>
  );
}

export default Home;

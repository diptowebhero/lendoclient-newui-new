import styled from "styled-components";
import mediaQuery from "@src/styles/MediaQuery";

export const Style = styled.div`
  .swiper {
    width: 100%;
    height: auto;
    ${mediaQuery.lt`
          width: 100%;
      `}
  }
  .main-swiper-box{
    width: 87%;
    height:30rem;
    margin-top: -500px;
    // margin-top: -44%
    // ${mediaQuery.xs`
    //     // margin-top: -44%
    // `}
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-weight: bold;
    color: #fff;
    margin-left: 1%;
  }

 

  .swiper-container {
    position: relative;
    /* Add any other necessary styles for your container */
  }

  /* Styles for the "second" container holding navigation buttons */
.second {
  display: flex;
  margin-top: 15%;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0; /* Adjust the margin as needed */
}

/* Style for the "prev" button */
.prev {
  cursor: pointer;
  padding: 10px;
  background-color: #404242; /* Button background color */
  color: #fff; /* Button text color */
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease; /* Smooth background color transition */
  height: 30rem;
  width: 3rem;
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
  margin-left: 1.4%;
  span{
    font-size: 28px;
    margin-top: 4em;
    margin-left: 5%;
  }
}

.prev:hover {
  background-color: #404242; /* Hover background color */
}

/* Style for the "next" button */
.next {
  cursor: pointer;
  margin-right: -90%;
  padding: 10px;
  background-color: #404242; /* Button background color */
  color: #fff; /* Button text color */
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease; /* Smooth background color transition */
  height: 30rem;
  width: 3rem;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
  margin-left: -1.5%;
  span{
    font-size: 28px;
    margin-top: 4em;
    margin-left: 5%;
  }
}

.next:hover {
  background-color: #404242; /* Hover background color */
}


  
  
  
  
  // .swiper-button-prev {
  //   width: 8.33333% !important;
  //   background: #404242 !important;
  //   height: 88.5%;
  //   margin-top: -19%;
  //   border-top-left-radius: 35px;
  //   border-bottom-left-radius: 35px;
  //   margin-left: -1%;
  //   ${mediaQuery.xs`
  //    width: 9.33333% !important;
  //    height: 91.5%;
  //    margin-top: -99%;
  //    margin-left: -4%;
  //  `}
  //   ${mediaQuery.lt`
  //    width: 9.33333% !important;
  //    height: 91.5%;
  //    margin-top: -99%;
  //    margin-left: -4%;
  //  `}
  //   ${mediaQuery.md`
  //    height: 91.5%;
  //   //  margin-top: -45%;
  //    margin-top: -95%;
  //  `}
  //  ${mediaQuery.lg`
  //    height: 91.5%;
  //    margin-top: -98%;
  //   //  margin-top: -45%;
  //  `}
  // }
  
  // .swiper-button-next {
  //   width: 8.33333% !important;
  //   background: #404242 !important;
  //   height: 88.5%;
  //   margin-top: -19%;
  //   border-top-right-radius: 35px;
  //   border-bottom-right-radius: 35px;
  //   margin-right: -1%;
  //   padding:2%;
  //   ${mediaQuery.xs`
  //    width: 9.33333% !important;
  //    height: 91.5%;
  //    margin-top: -99%;
  //    margin-right: -5%;
  //  `}
  //   ${mediaQuery.lt`
  //    width: 9.33333% !important;
  //    height: 91.5%;
  //    margin-top: -99%;
  //    margin-right: -5%;
  //  `}
  //  ${mediaQuery.md`
  //    height: 91.5%;
  //    margin-top: -45%;
  //  `}
  //  ${mediaQuery.lg`
  //    height: 91.5%;
  //    margin-top: -99%;
  //   //  margin-top: -45%;
  //  `}
  // }
  
 
  

  .auction-slider-card {
    position: relative;
    display: block;
    background: #fff;
    overflow: hidden;
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 10px 0px;
    transition: box-shadow 0.3s ease-in 0s;
    .top {
      img {
        width: 474px;
        height: 474px;
        object-fit: cover;
      }
    }
    .bottom {
      .content {
        padding: 20px 0 20px 20px;
        .title {
          font-weight: 500;
          font-size: 1.1rem;
          margin-bottom: 0;
          margin-top: 15px;
          color: #000;
        }
        .price {
          font-size: 1.5rem;
        }
      }
      .auction-type {
        position: absolute;
        right: 0;
        bottom: 25px;
        background: #000;
        color: #fff;
        padding: 15px 40px;
        border-radius: 100px 0px 0px 100px;
        p {
          margin: 0;
          text-transform: capitalize;
        }
      }
    }
    &:hover {
      box-shadow: rgb(4 17 29 / 25%) 0px 0px 50px 0px;
    }
  }


.homecarousel {
  margin-top: 80px;
}

.carousel-inner {
  width: 83.3333% !important;
}

.left-half {
  padding: 25px 35px;
}

.cartexthead {
  font-weight: 700;
  font-size: 35px;
  line-height: 42px;
  margin-bottom: 35px;
}

.cartext p {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.launchpadnav {
  background: #E46400;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #FFFFFF;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  margin-top: 40px;
}

.launchpadnav a {
  color: white !important;
  text-decoration: none !important;
}

.carousel-control-next,
.carousel-control-prev {
  width: 8.33333% !important;
  background: #404242 !important;
}

.button.carousel-control-prev {
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
}

.button.carousel-control-next {
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
}



}


`;

export default Style;

import React, { Component } from "react";
import ReactCardCarousel from "react-card-carousel";
import CategoryCard from "./CategoryCard";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const carouselStyle = {
  display: "flex",
  flexDirection: "column",
};

const arrowBackStyle = {
  height: "100%",
  marginLeft: "20px",
  color: "#0EE290",
  fontSize: "50",
  cursor: "pointer",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
};

const arrowForwardStyle = {
  height: "100%",
  marginRight: "20px",
  color: "#0EE290",
  fontSize: "50",
  cursor: "pointer",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
};

class MyCarousel extends Component {
  static get CONTAINER_STYLE() {
    return {
      position: "relative",
      height: "30vh",
      width: "100%",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "middle",
    };
  }

  render() {
    return (
      <div style={MyCarousel.CONTAINER_STYLE}>
        <ArrowBackIcon
          style={arrowBackStyle}
          onClick={() => {
            this.Carousel.prev();
          }}
        />

        <ReactCardCarousel
          ref={(Carousel) => (this.Carousel = Carousel)}
          style={carouselStyle}
          autoplay={true}
          autoplay_speed={3000}
          spread={"wide"}
        >
          {this.props.categories.map((category) => {
            return (
              <div>
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  avatar={category.img}
                />
              </div>
            );
          })}
        </ReactCardCarousel>
        <ArrowForwardIcon
          style={arrowForwardStyle}
          onClick={() => {
            this.Carousel.next();
          }}
        />
      </div>
    );
  }
}

export default MyCarousel;

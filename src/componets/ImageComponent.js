import React, { useContext, useEffect, useState } from "react";
import { imageContext } from "../context/ImageContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { alpha, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Box from "@material-ui/core/Box";
import blue from "@material-ui/core/colors/blue";
import Bullets from "./Bullets";

const primary = blue[200];
const primaryBlue = blue[500];
const useStyles = makeStyles((theme) => ({
  prev: {
    paddingRight: 30,
  },
  next: {
    paddingLeft: 30,
  },
  container: {
    display: "flex",
    alignItems: "center",
    padding: 50,
    marginLeft: "10%",
  },
  imgcontainer: {
    padding: 10,
    borderRadius: 10,
    width: 640,
    height: 450,
    backgroundColor: alpha(primary, 0.25),
  },
  img: {
    width: "100%",
    height: "100%",
  },
  imgloading: {
    width: 0,
    height: 0,
  },
  spinner: {
    display: "flex",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "100%",
  },
  textcontent: {
    display: "flex",
    width: "100%",
    paddingTop: 10,
  },
  flex1: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    color: alpha(primaryBlue, 1),
  },
  pad: {
    padding: 5,
  },
}));

const ImageComponent = (props) => {
  const classes = useStyles();
  const { images, termChanged } = useContext(imageContext);
  const [index, setIndex] = useState(0);
  const [imageLoadingStatus, setImageLoadingStatus] = useState(true);

  useEffect(() => {
    setImageIndex(0);
  }, [termChanged]);
  const slideLeft = () => {
    setImageLoadingStatus(true);
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };

  const slideRight = () => {
    setImageLoadingStatus(true);
    setIndex((index + 1) % images.length);
  };

  const imageLoaded = () => {
    setImageLoadingStatus(false);
  };

  const imageLoadingError = () => {
    setImageLoadingStatus(false);
  };

  const setImageIndex = (imgIndex) => {
    setImageLoadingStatus(true);
    setIndex(imgIndex);
  };

  return (
    images.length > 0 && (
      <Container fixed>
        <div className={classes.container}>
          <div className={classes.prev}>
            <Button variant="contained" color="primary" onClick={slideLeft}>
              <ChevronLeftIcon style={{ fontSize: 40 }} />
            </Button>
          </div>
          <Box boxShadow={4} className={classes.imgcontainer}>
            {imageLoadingStatus ? (
              <div className={classes.spinner}>
                <CircularProgress style={{ margin: "auto" }} />
                <img
                  className={classes.imgloading}
                  src={images[index].webformatURL}
                  alt={index}
                  onLoad={imageLoaded}
                  onError={imageLoadingError}
                />
              </div>
            ) : (
              <div className={classes.img}>
                <img
                  className={classes.img}
                  src={images[index].webformatURL}
                  alt={index}
                  onLoad={imageLoaded}
                  onError={imageLoadingError}
                />
                <div className={classes.textcontent}>
                  <span className={classes.flex1}>
                    <div>
                      <ThumbUpIcon />
                    </div>
                    <div className={classes.pad}>{images[index].likes}</div>
                  </span>
                  <span style={{ color: primaryBlue }}>
                    {images[index].tags.split(", ").join(" #")}
                  </span>
                </div>
                <Bullets
                  images={images}
                  setImageIndex={setImageIndex}
                  currentIndex={index}
                />
              </div>
            )}
          </Box>
          <div className={classes.next}>
            <Button variant="contained" color="primary" onClick={slideRight}>
              <ChevronRightIcon style={{ fontSize: 40 }} />
            </Button>
          </div>
        </div>
      </Container>
    )
  );
};

export default ImageComponent;

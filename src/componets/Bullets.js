import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";


const primaryBlue = blue[200];
const activeBlue = blue[500];
const useStyles = makeStyles((theme) => ({
  circle: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    color: alpha(primaryBlue, 1),
    background: alpha(primaryBlue, 1),
    border: 1,
    margin: 5,
  },
  circlecontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: -81,
    cursor: "pointer",
  },
  circleactive: {
    width: 18,
    height: 18,
    color: alpha(activeBlue, 1),
    background: alpha(activeBlue, 1),
    borderRadius: "50%",
    border: 1,
    margin: 5,
  },
}));
const Bullets = ({ images, setImageIndex, currentIndex }) => {
 
  const classes = useStyles();
  return (
    <div className={classes.circlecontainer}>
      {images.map((image, index) => (
        <div key={index}
          className={
            currentIndex === index ? classes.circleactive : classes.circle
          }
          onClick={() => {
            setImageIndex(index);
          }}></div>
      ))}
    </div>
  );
};

export default Bullets;

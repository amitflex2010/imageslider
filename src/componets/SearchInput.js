import React, { useContext, useState, useEffect, useCallback } from "react";
import { imageContext } from "../context/ImageContext";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchInput = (props) => {
  const classes = useStyles();

  const { getImages, dispatch } = useContext(imageContext);
  const [query, setQuery] = useState("flowers");

  useEffect(() => {
    getImages(query);
  }, []);

  const KeyPressHandler = useCallback(
    (e) => {
      if (e.charCode === 13) {
        getImages(query);
        dispatch({ type: "QUERY_CHANGED" });
      }
    },
    [query]
  );

  const handleSubmit = useCallback(() => {
    getImages(query);
    dispatch({ type: "QUERY_CHANGED" });
  }, [query]);
  return (
    <div className="App">
      <Typography className={classes.title} variant="h6" noWrap>
        Image Slider
      </Typography>
      <div className={classes.search}>
        <Button color="secondary" onClick={handleSubmit}>
          <SearchIcon />
        </Button>

        <InputBase
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={KeyPressHandler}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </div>
  );
};

export default React.memo(SearchInput);

import "./App.css";
import ImageComponent from "./componets/ImageComponent";
import SearchInput from "./componets/SearchInput";
import { ImageContextProvider } from "./context/ImageContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ImageContextProvider>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <SearchInput />
          </Toolbar>
        </AppBar>
      </div>
      <ImageComponent />
    </ImageContextProvider>
  );
}

export default App;

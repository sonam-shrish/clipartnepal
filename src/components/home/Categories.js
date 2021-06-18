import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  AppBar,
  useScrollTrigger,
  Tabs,
  Tab,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar
  },
  logo: {
    height: "7em"
  },
  logoBtn: {
    padding: "0",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tabsContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px"
  }
}));

const Header = () => {
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();
  function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });

    return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
  }
  function handleActiveTab(e, value) {
    setActiveTab(value);
  }

  return (
    
    <>
      <ElevationScroll>
          <Toolbar>
            
            <Tabs
              value={activeTab}
              onChange={handleActiveTab}
              className={classes.tabsContainer}
              variant='scrollable'
              scrollButtons='on'
            >
              <Tab label="Category 1" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              <Tab label="Artist Portfolio" className={classes.tab} />
              <Tab label="Artist Portfolio" className={classes.tab} />
              <Tab label="Artist Portfolio" className={classes.tab} />
              <Tab label="Category 2" className={classes.tab} />
              

            </Tabs>
            
          </Toolbar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;

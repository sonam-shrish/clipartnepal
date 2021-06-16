import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {CardContent, Typography} from '@material-ui/core'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const useStyles = makeStyles((theme) => ({
  
  root: {
    maxWidth: 445,
    marginTop: '7rem',
  },
  media: {
    maxHeight: "300px",
    objectFit: "contain"
  },

  downloadBtn: {
    marginLeft: "auto"
  }
}));

export default function CardComp() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <center>
        <img
          className={classes.media}
          alt="testimg"
          src="https://wikiclipart.com/wp-content/uploads/2016/11/Cookie-monster-clipart-4.png"
        />
      </center>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton className={classes.downloadBtn} aria-label="download">
          <CloudDownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

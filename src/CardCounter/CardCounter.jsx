import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 200,
  },
});

export default function CardCounter(props) {
  const classes = useStyles();
  
  return (
    <Box m={2}>
    <Card  alignItems="center" className={classes.root}>
      <CardActionArea>
        <CardContent  alignItems="center">
          <Typography gutterBottom variant="h5" component="h2">
            {props.cardTitle}
          </Typography>
          <Typography  alignItems="center" gutterBottom variant="h2" component="h2">
          {props.cardData}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Box>
  );
}

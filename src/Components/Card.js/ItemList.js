import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './ItemList.css'
import {DeleteCourse} from '../../store/actions/course'
import { Redirect } from 'react-router-dom';


export default function MediaCard(props) {

  const {uid,createdBy}=props;


  return (
    <Card className="card-container">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {props.detail}
          </Typography>
        </CardContent>
        <CardContent className="card-content">
        <Typography variant="body1" color="textSecondary" component="p">
            Price: {props.price}Rs
          </Typography><Typography variant="body1" color="textSecondary" component="p">
            Duration: {props.duration}hrs
          </Typography>
        </CardContent>
      </CardActionArea>


      {/*checking for courses created by logged in user or authenticated user */}
      {uid===createdBy?<CardActions>
        <Button size="small" color="primary" onClick={()=>props.handleShow('Edit Course',props.id)}>
         Edit 
        </Button>
        <Button size="small" color="primary" onClick={props.onDelete}>
          Delete
        </Button>
      </CardActions>:null}
    </Card>
  );
}

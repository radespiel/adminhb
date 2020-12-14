import {React, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import CardCounter from '../CardCounter/CardCounter'
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';



export default function Counters(props) {
  const [counters, setCounters] = useState({ users: 0, posts: 0, comments: 0, likes:0});  
  const [ranges, setRanges] = useState({ "0-20": 0, "20-40": 0, "40-60": 0, "60+":0});
  const [render,setRender] = useState(false) 
  useEffect(() => {
        axios.get('http://localhost:3000/api/admin/counters', {
        headers: {
        'Authorization': props.tokenp
        }
    })
    .then((res) => {
      setCounters(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
    axios.get('http://localhost:3000/api/admin/ageranges', {
      headers: {
      'Authorization': props.tokenp
      }
  })
  .then((res) => {
    setRanges(res.data)
    setRender(true)
  })
  .catch((error) => {
    console.error(error)
  })
      },[])

      const data = [
        { range: '0-20 Anos', qt: ranges["0-20"] },
        { range: '20-40 Anos', qt: ranges["20-40"] },
        { range: '40-60 Anos', qt: ranges["40-60"] },
        { range: '60+ Anos', qt: ranges["60+"] },
      ];  
     
      const lineChart = () => {
        if(render===true){
        return(<Paper>
        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="qt"
            argumentField="range"
          />
          <Title text="Faixa Etária dos Usuários" />
          <Animation />
        </Chart>
        </Paper>
      )
        }
        else{return(null)}
      }

    return(
        <Box>
        <h2>Contadores</h2>
        <Box mb={2} display="flex" flexDirection="row" >
        <CardCounter cardTitle="Número de Usuários" cardData={counters.users}></CardCounter>
        <CardCounter cardTitle="Número de Posts" cardData={counters.posts}></CardCounter>
        <CardCounter cardTitle="Número de Comentários" cardData={counters.comments}></CardCounter>
        <CardCounter cardTitle="Número de Likes" cardData={counters.likes}></CardCounter>
        </Box>
        <h2>Gráficos</h2>
        <Box>
          {lineChart}
        </Box>
        <br/>
        <Box display="flex" justifyContent="center">
        <Button variant="contained"><ArrowBackIcon style={{height: "30px", width: "30px"}}></ArrowBackIcon></Button> 
        {'\u00A0'}
        <Button variant="contained"><ArrowForwardIcon style={{height: "30px", width: "30px"}}></ArrowForwardIcon></Button>
        </Box>
        </Box>
        );
}
import {React, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const columns = [
    {field: 'id', headerName: 'ID do Like', width: 220 },
    {field: 'name', headerName: 'Nome do Autor', width: 250 },
    {field: 'email', headerName: 'Email do Autor', width: 250 },
    {field: 'post', headerName: 'Liked dado em', width: 250},
    {field: 'createdAt', headerName: 'Data', width: 200,},
  ];

export default function Likes(props) {
    const [likes, setLikes] = useState([]); 
    const [search, setSearch] = useState("");   
    const [selected, setSelected] = useState({});
    
    function emptyze() {
      if(search === ""){
        return "empty"
      }
      else{
        return search
      }
    }    
    useEffect(() => {
        let copy = search
        axios.get('http://localhost:3000/api/admin/likes/'+emptyze(), {
        headers: {
        'Authorization': props.tokenp
        }
    })
    .then((res) => {
      setLikes(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
      }, [selected, search])

      function deleteLike(){
        axios.delete('http://localhost:3000/api/admin/likes/'+selected.id, {
          headers: {
          'Authorization': props.tokenp
          }
      })
      .then((res) => {
        console.log("operação teve sucesso:", res.data)
        setSelected({})
      })
      .catch((error) => {
        console.error(error)
      })
      }

      return (
     <Box style={{ width: '100%' }}>
     <Box>
     <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="serach"
      label="Pesquisar por email ou Post ID"
      onChange={e => setSearch(e.target.value)}
        />
     <div style={{ height: 650, width: '100%' }}>
        <DataGrid disableMultipleSelection={true} rows={likes} columns={columns} pageSize={10} onRowSelected={(element)=>{ setSelected(element.data)}}  />
    </div>
      </Box>
           <Box m={2}>
           <Button
           variant="contained"
           color="secondary"
           style={{width: "200px"}}
           onClick={deleteLike}
            >
               Remover Like
             </Button>
        </Box> 
        </Box>    
      )
}
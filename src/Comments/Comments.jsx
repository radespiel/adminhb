import {React, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const columns = [
    {field: 'id', headerName: 'ID do Comentário', width: 220 },
    {field: 'text', headerName: 'Comentário', width: 250 },
    {field: 'name', headerName: 'Nome do Autor', width: 250 },
    {field: 'email', headerName: 'Email do Autor', width: 250 },
    {field: 'post', headerName: 'Comentado em', width: 250},
    {field: 'createdAt', headerName: 'Data', width: 200,},
  ];

export default function Comments(props) {
    const [comments, setComments] = useState([]); 
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
        axios.get('http://localhost:3000/api/admin/comments/'+emptyze(), {
        headers: {
        'Authorization': props.tokenp
        }
    })
    .then((res) => {
      setComments(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
      }, [selected, search])

      function deleteComments(){
        axios.delete('http://localhost:3000/api/admin/comments/'+selected.id, {
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
        <DataGrid disableMultipleSelection={true} rows={comments} columns={columns} pageSize={10} onRowSelected={(element)=>{ setSelected(element.data)}}  />
    </div>
      </Box>
           <Box m={2}>
           <Button
           variant="contained"
           color="secondary"
           style={{width: "200px"}}
           onClick={deleteComments}
           
         
            >
               Remover Comentário
             </Button>
        </Box> 
        </Box>    
      )
}
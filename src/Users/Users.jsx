import {React, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import SelectedUser from '../SelectedUser/SelectedUser'
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const columns = [
    {field: 'id', headerName: 'ID', width: 220 },
    {field: 'name', headerName: 'Nome', width: 250 },
    {field: 'email', headerName: 'Email', width: 250 },
    {field: 'birthdate', headerName: 'Data de Nascimento', width: 250},
    {field: 'condition', headerName: 'Condição', width: 200,},
    {field: 'refprofilepic', headerName: 'Foto de Perfil', width: 300,},
  ];

export default function Users(props) {
    const [users, setUsers] = useState([]); 
    const [search, setSearch] = useState("");   
    const [selected, setSelected] = useState({email: "", id: "", name: "", birthdate: "", condition: "", forcereload: 0});
    
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
        axios.get('http://localhost:3000/api/admin/users/'+emptyze(), {
        headers: {
        'Authorization': props.tokenp
        }
    })
    .then((res) => {
      setUsers(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
      }, [selected, search])

      return (
     <Box style={{ width: '100%' }} >
     <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="serach"
      label="Pesquisar por email"
      onChange={e => setSearch(e.target.value)}
        />
     <div style={{ height: 400, width: '100%' }}>
        <DataGrid disableMultipleSelection={true} rows={users} columns={columns} pageSize={5} onRowSelected={(element)=>{ setSelected(element.data)}}  />
    </div>
      <SelectedUser tokenp={props.tokenp} selectedRow={selected} changeSelected={setSelected}></SelectedUser>
      </Box>
      )
}
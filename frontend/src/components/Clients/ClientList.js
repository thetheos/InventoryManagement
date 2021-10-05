import { Button } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Link } from "react-router-dom";
import ClientCard from './ClientCard';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {DataGrid} from '@material-ui/data-grid';



const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  background: '#e79908',
   color: '#fff'
};
 function ClientList() {

  const [clientList, setClientsList] = useState(null);


  const domain = "http://localhost:1337"
  useEffect(() => {    
    axios.get(domain+'/clients').then(response => {
      console.log(response);
      const clientList = response.data
      setClientsList(clientList) 
     });
    }, []);

    

    
    return (
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={
            (clientList || []).map( (client) => {console.log(client);
                return ({
                        id: client.id,
                        client_name: client.client_name,
                        client_surname: client.client_surname,
                        client_phone: client.client_phone,
                        client_mail: client.client_mail,
                    })
                })
            } columns={columns} 
             onCellEditCommit={(values, event) =>
                    {
                    console.log("yes"); 
                    axios.put(domain+'/clients/'+values.id,values.field+"="+values.value ).then(response => {
                      console.log(response);
                     });
                    
                    } 
            
        }
        checkboxSelection />
            <Link to="/clients/add">
                <Fab style={style} aria-label="add">
            <AddIcon />
        </Fab>
      </Link>
      </div>
    );
  }

  const columns = [
    { field: 'client_name', headerName: 'Name', width: 180, editable: true },
    { field: 'client_surname', headerName: 'surname',width:180,  editable: true },
    { field: 'client_phone', headerName: 'phone',width:180, editable: true },
    { field: 'client_mail', headerName: 'mail',width:300, editable: true },
  ];
  


  /*
function ClientList() {

  const [clientList, setClientsList] = useState(null);


  const domain = "http://localhost:1337"
  useEffect(() => {    
    axios.get(domain+'/clients').then(response => {
      console.log(response);
      const clientList = response.data
      setClientsList(clientList)
     
    });
  }, []);


  return (
      <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name </TableCell>
              <TableCell align="left">Surname</TableCell>
              <TableCell align="left">phone</TableCell>
              <TableCell align="left">mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {(clientList || []).map( (client) => {
                 return (<TableRow
                 key={client.client_name}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                 >
                    <TableCell component="th" scope="row">
                    {client.client_name}
                    </TableCell>
                    <TableCell align="left">{client.client_surname}</TableCell>
                    <TableCell align="left">{client.client_phone}</TableCell>
                    <TableCell align="left">{client.client_mail}</TableCell>
                    <TableCell align="left"></TableCell>
               </TableRow>)
            }
            )} 
          </TableBody>
          </Table>
          </TableContainer>
      </div>
  )
}

*/
export default ClientList;

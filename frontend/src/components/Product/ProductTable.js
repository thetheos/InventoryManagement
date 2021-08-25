import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';

const columns = [
  {
    field: 'barcode',
    headerName: 'Code barre',
    width: 150,
    editable: true,
  },
  {
    field: 'comment',
    headerName: 'Commentaire',
    width: 500,
    editable: true,
  }
];

var init = [
  {id: 1, barcode: '012102010201', comment: 'PC sous linux'},
  {id: 2, barcode: '023102023101', comment: 'Sans OS'},
  {id: 3, barcode: '023102023101', comment: 'Défectueux'}

];

var id = 3
  
export default function ProductTable(props) {
    const rows = props.rows
    const setRows = props.setRows
    const [barcodeInput, setBarcodeInput] = useState("")

    function addRow() {
        setRows(state => [...state, {id:++id, barcode:barcodeInput, comment:''}])
        setBarcodeInput('')
    }

    function onChangeBarcode(barcode){
        setBarcodeInput(barcode.target.value)
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            addRow();
        }
    }

    useEffect( () => {
        setRows(state => [...state, ...init])
    },  [])


    return (
    <div style={{ height: 500, width: '100%' }}>
        <TextField
            id="filled-disabled"
            label="Code-barre"
            value={barcodeInput}
            onChange={onChangeBarcode}
            onKeyDown={handleKeyDown}
            InputProps={{endAdornment: (
                <Button variant="contained" onClick={addRow} color="primary">
                    Ajouter
                </Button>)
                        }}
        />
        
        
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
        />
    </div>
  );
}
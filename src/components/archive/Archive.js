import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

function Archive(props) {
    
    let archiveLocale = JSON.parse(window.localStorage.getItem('archive'))
    console.log(props)
    return (
        <>
        {props.data.length > 0 ? 
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Activate</TableCell>
                            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                    </TableHead>
                    < TableBody >
                        {
                            props.data.map((item, index) => {
                                return (
                                    <>
                                        <TableRow hover key={props.index}>
                                            <TableCell align="left" >
                                                {item.title}
                                            </TableCell>
                                            <TableCell align="right" >
                                            <Button className='removebutton' startIcon={<UnarchiveIcon/>} style={{ backgroundColor: 'green' }} onClick={() => props.activeItem(index)} variant="contained" color="secondary">Activate</Button>
                                            </TableCell>
                                        </TableRow>
                                        {/* <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid' }}>
                                            <p>{item.title}</p>
                                            <p><button style={{ backgroundColor: 'green' }} onClick={() => props.activeItem(index)}>Active</button></p>
                                        </div> */}

                                    </>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        : null}
        </>
    )
}

export default React.memo(Archive)
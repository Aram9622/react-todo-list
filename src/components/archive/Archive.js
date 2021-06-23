import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Archive(props) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Active</TableCell>
                            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                    </TableHead>
                    < TableBody >
                        {
                            props.data.map((item, index) => {
                                return (
                                    <>
                                        <TableRow key={props.index}>
                                            <TableCell align="left" >
                                                {item.title}
                                            </TableCell>
                                            <TableCell align="right" >
                                            <Button className='removebutton' style={{ backgroundColor: 'green' }} onClick={() => props.activeItem(index)} variant="contained" color="secondary">Active</Button>
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
        </>
    )
}
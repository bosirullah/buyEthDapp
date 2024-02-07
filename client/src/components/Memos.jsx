import { useState,useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Table } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Memos.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Memos=({state})=>{
    const [memos,setMemos]=useState([]);
    const {contract}=state;
    
    useEffect(()=>{
        const memosMessage = async()=>{
            const memos = await contract.getMemos();
            setMemos(memos)
          //console.log(memos)
        }
        contract && memosMessage()
    },[contract])

    return (
        <div className="container-fluid">
            <h2 style={{ textAlign: "center"}}>Details</h2>      
            <TableContainer component={Paper}  sx={{ maxHeight: 220 }}>
            <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" width="350px">NAME</StyledTableCell>
                            <StyledTableCell align="center" width="200px">DATE & TIME</StyledTableCell>
                            <StyledTableCell align="center" width="350px">MESSAGE</StyledTableCell>
                            <StyledTableCell align="center" width="350px">WALLET ADDRESS</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {memos.map((memo,index) =>{
                            return(
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="center">{memo.name}</StyledTableCell>
                                    <StyledTableCell align="center">{new Date(memo.timestamp * 1000).toLocaleString()}</StyledTableCell>
                                    <StyledTableCell align="center">{memo.message}</StyledTableCell>
                                    <StyledTableCell align="center">{memo.from}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
            </Table>
            </TableContainer>   
        </div>
    );
}
export default Memos;
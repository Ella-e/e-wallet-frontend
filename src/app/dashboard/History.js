import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSearchParams } from 'next/navigation';

const baseURL = "http://localhost:8081/transaction"

const History = () => {
    const [history, setHistory] = useState(null)
    const searchParams = useSearchParams();

    useEffect(()=>{
        axios({
            method:'post',
            url:baseURL + "/findTransactionByFromId?fromAccountId="+searchParams.get('aid')
        }).catch((e)=>{

        }).then((response)=>{
            setHistory(response.data.data)
            console.log(response.data.data)
        })
    }, [])

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
      
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? < KeyboardArrowUpIcon/> : < KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.toAccountId}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      Remarks
                    </Typography>
                    {row.remark}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }

    return (
        <div>
            <h1>Transaction History</h1>
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Amount&nbsp;($)</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>To Account id</TableCell>
                    <TableCell>Time</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {history?.map((row) => (
                    <Row key={row.name} row={row} />
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default History
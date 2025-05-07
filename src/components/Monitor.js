import React, { useContext, useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ContactsOutlined } from "@material-ui/icons";
import green from "../static/media/TruckSideIcon-Green.svg";
import yellow from "../static/media/TruckSideIcon-Yellow.svg";
import red from "../static/media/TruckSideIcon-Red.svg";
import { TableSortLabel } from '@material-ui/core';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 30,
    textAlign: "center",
    '& .MuiTableSortLabel-root': {
      color: theme.palette.common.white,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
        '& .MuiTableSortLabel-icon': {
          opacity: 1,
        },
      },
    },
    '& .MuiTableSortLabel-root.Mui-active': {
      color: theme.palette.common.white,
      '& .MuiTableSortLabel-icon': {
        opacity: 1,
      },
    },
    '& .MuiTableSortLabel-icon': {
      color: theme.palette.common.white,
      opacity: 0.6, // visible but subtle
      transition: 'opacity 0.3s ease',
    },
  },
  body: {
    fontSize: 25,
    textAlign: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Monitor() {
  const getData = () => {
    try {
      axios
        .get("https://engine.logikor.com/api/prod/tba.php?location='TOYOWO','PENSCO03','PENSCO04','TOYOEO','PENSCO02'")
        .then((response) => {
          const loads = response.data;
          console.log(loads);
          setTableData(loads);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const [tableData, setTableData] = React.useState([]);
  const todaysDate = new Date().toISOString().split('T')[0];
  const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('');

const handleSort = (property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTableData(([first, ...rest]) => [...rest, first]);
    }, 3000); // Timer in MS?

    return () => {
      clearInterval(timer);
    }; // Cleanup function
  }, []);

  const getColor = (value) => {
    if (!value) return "#f8dc75";

    return "";
  };

  const getStatus = (value) => {
    if (value == "Early") {
      return green;
    }
    if (value == "On Time") {
      return yellow;
    }
    if (value == "Late") {
      return red;
    }
  };

  // const getData = () => {

  //   try {
  //     const headers = {
  //       'Access-Control-Allow-Headers': 'X-Api-Key',
  //       'X-Api-Key': 'ea9f0db5182d450196743c2578081c90'
  //     };
  //     axios.get(
  //       "https://dwapi.logikor.com/api/v1/loadmonitor?monitor=green",
  //       { headers }
  //     ).then((response) => {
  //       const array = [];
  //       const loads = response.data;
  //       let origin = loads.map(a => a.originLocation);
  //       let result = loads.map(a => a.destinationLocation);
  //       let planned = loads.map(a => a.plannedDelivery);
  //       let load = loads.map(a => a.loadNumber);
  //       let owner = loads.map(a => a.customer);

  //       for (let i = 0; i < result.length; i++) {
  //         if (result[i] != origin[i] && planned[i].includes("2021") && load[i] != "L984096" || result[i] != origin[i] && planned[i].includes("2023") && load[i] != "L984096") {

  //           if (load[i] != "L995754") {
  //             array.push(loads[i])
  //           }

  //         }
  //       }
  //       const sortedArray = array.sort((a, b) => new Date(a.plannedDelivery) - new Date(b.plannedDelivery))

  //       setTableData(sortedArray);

  //     }
  //     )

  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ height: "75vh" }}>
      <Table
        className={classes.table}
        aria-label="customized table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
          <StyledTableCell sortDirection={orderBy === 'load' ? order : false}>
      <TableSortLabel
        active={orderBy === 'load'}
        direction={orderBy === 'load' ? order : 'asc'}
        onClick={() => handleSort('load')}
      >
        L#
      </TableSortLabel>
    </StyledTableCell>
    <StyledTableCell sortDirection={orderBy === 'route' ? order : false}>
      <TableSortLabel
        active={orderBy === 'route'}
        direction={orderBy === 'route' ? order : 'asc'}
        onClick={() => handleSort('route')}
      >
        Route
      </TableSortLabel>
    </StyledTableCell>
    <StyledTableCell sortDirection={orderBy === 'location_name' ? order : false}>
      <TableSortLabel
        active={orderBy === 'location_name'}
        direction={orderBy === 'location_name' ? order : 'asc'}
        onClick={() => handleSort('location_name')}
      >
        Next Stop
      </TableSortLabel>
    </StyledTableCell>
    <StyledTableCell>
      Shipments
    </StyledTableCell>

    <StyledTableCell sortDirection={orderBy === 'planned_delivery' ? order : false}>
      <TableSortLabel
        active={orderBy === 'planned_delivery'}
        direction={orderBy === 'planned_delivery' ? order : 'asc'}
        onClick={() => handleSort('planned_delivery')}
      >
        Planned Delivery
      </TableSortLabel>
    </StyledTableCell>

    <StyledTableCell sortDirection={orderBy === 'eta' ? order : false}>
      <TableSortLabel
        active={orderBy === 'eta'}
        direction={orderBy === 'eta' ? order : 'asc'}
        onClick={() => handleSort('eta')}
      >
        ETA
      </TableSortLabel>
    </StyledTableCell>

    <StyledTableCell sortDirection={orderBy === 'carrier' ? order : false}>
      <TableSortLabel
        active={orderBy === 'carrier'}
        direction={orderBy === 'carrier' ? order : 'asc'}
        onClick={() => handleSort('carrier')}
      >
        Carrier
      </TableSortLabel>
    </StyledTableCell>
    <StyledTableCell sortDirection={orderBy === 'status' ? order : false}>
  <TableSortLabel
    active={orderBy === 'status'}
    direction={orderBy === 'status' ? order : 'asc'}
    onClick={() => handleSort('status')}
  >
    Status
  </TableSortLabel>
</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData &&
            [...tableData]
            .filter(
              load =>
                load &&
                todaysDate >= load.planned_delivery?.slice(0, 10) &&
                !load.route?.startsWith("MX")
            )
            .sort((a, b) => {
              const aVal = a['planned_delivery'];
              const bVal = b['planned_delivery'];

              // Handle dates properly
              if (orderBy === 'planned_delivery' || orderBy === 'eta') {
                return (order === 'asc'
                  ? new Date(aVal) - new Date(bVal)
                  : new Date(bVal) - new Date(aVal));
              }
          
              // Fallback string comparison
              if (typeof aVal === 'string' && typeof bVal === 'string') {
                return order === 'asc'
                  ? aVal.localeCompare(bVal)
                  : bVal.localeCompare(aVal);
              }
          
              return 0;
            }).map((row) => {
              if (row) {
                return (
                  <StyledTableRow key={row.load}>
                    <StyledTableCell component="th" scope="row" width="10%">
                      {row.load}
                    </StyledTableCell>
                    <StyledTableCell width="10%">{row.route}</StyledTableCell>
                    <StyledTableCell width="10%">{row.location_name}</StyledTableCell>
                    <StyledTableCell width="10%">
                      {" "}
                      {row.shipments.filter((shipments) => {
                            return (
                              shipments != "TOYOTA BOSHOKU CANADA" &&
                              shipments != "TOYOTA BOSHOKU AMERICA, INC." &&
                              shipments != "PENSKE CROSSDOCK" && 
                              shipments != "TBA WOODSTOCK" &&
                              shipments != "TBA ELMIRA" &&
                              shipments != "PENSKE CROSSDOCK C/O TBCA ELMIRA"
                            );
                          }).map((b, index) => (index ? ", " : "") + b)}
                    </StyledTableCell>
                    <StyledTableCell width="10%">
                      {row.planned_delivery}
                    </StyledTableCell>
                    <StyledTableCell width="10%">{row.eta}</StyledTableCell>
                    <StyledTableCell width="10%">{row.carrier}</StyledTableCell>
                    <StyledTableCell width="10%">
                      <img src={getStatus(row.status)}></img>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

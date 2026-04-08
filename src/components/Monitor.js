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
import { TableSortLabel, useMediaQuery, useTheme } from '@material-ui/core';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#bf2126',
    color: theme.palette.common.white,
    fontSize: 15,
    fontWeight: 700,
    textAlign: "center",
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '14px 16px',
    borderBottom: 'none',
    whiteSpace: 'nowrap',
    '& .MuiTableSortLabel-root': {
      color: theme.palette.common.white,
      cursor: 'pointer',
      '&:hover': {
        color: '#ffcdd2',
        '& .MuiTableSortLabel-icon': {
          opacity: 1,
          color: '#ffcdd2',
        },
      },
    },
    '& .MuiTableSortLabel-root.Mui-active': {
      color: theme.palette.common.white,
      '& .MuiTableSortLabel-icon': {
        opacity: 1,
        color: theme.palette.common.white,
      },
    },
    '& .MuiTableSortLabel-icon': {
      color: 'rgba(255,255,255,0.5)',
      opacity: 0.6,
      transition: 'opacity 0.3s ease, color 0.3s ease',
    },
  },
  body: {
    fontSize: 14,
    textAlign: "center",
    padding: '12px 16px',
    borderBottom: '1px solid #e8e8e8',
    color: '#333',
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    transition: 'background-color 0.2s ease',
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderCollapse: 'separate',
  },
  container: {
    flex: 1,
    borderRadius: 12,
    boxShadow: ({ darkMode }) => darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
    border: ({ darkMode }) => darkMode ? '1px solid #2a2a3e' : '1px solid #e0e0e0',
    overflow: 'auto',
    backgroundColor: ({ darkMode }) => darkMode ? '#16213e' : undefined,
  },
  statusIcon: {
    width: 36,
    height: 36,
  },
  shipmentChip: {
    display: 'inline-block',
    backgroundColor: ({ darkMode }) => darkMode ? '#2a2a3e' : '#f0f0f0',
    borderRadius: 4,
    padding: '2px 8px',
    margin: '2px 3px',
    fontSize: 12,
    color: ({ darkMode }) => darkMode ? '#ccc' : '#555',
  },
  // Mobile card styles
  cardList: {
    flex: 1,
    overflow: 'auto',
    padding: '0 8px 8px',
  },
  card: {
    backgroundColor: ({ darkMode }) => darkMode ? '#16213e' : '#fff',
    borderRadius: 12,
    boxShadow: ({ darkMode }) => darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
    border: ({ darkMode }) => darkMode ? '1px solid #2a2a3e' : '1px solid #e8e8e8',
    marginBottom: 10,
    padding: '14px 16px',
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardLoad: {
    fontSize: 16,
    fontWeight: 700,
    color: ({ darkMode }) => darkMode ? '#e0e0e0' : '#1a1a1a',
  },
  cardRoute: {
    fontSize: 13,
    fontWeight: 600,
    color: '#bf2126',
    backgroundColor: ({ darkMode }) => darkMode ? '#2a1a1e' : '#fef2f2',
    borderRadius: 6,
    padding: '2px 8px',
  },
  cardStatusIcon: {
    width: 28,
    height: 28,
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: ({ darkMode }) => darkMode ? '#777' : '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardValue: {
    fontSize: 13,
    color: ({ darkMode }) => darkMode ? '#ccc' : '#333',
    fontWeight: 500,
    textAlign: 'right',
  },
  cardDivider: {
    height: 1,
    backgroundColor: ({ darkMode }) => darkMode ? '#2a2a3e' : '#f0f0f0',
    margin: '6px 0',
  },
  cardShipmentChip: {
    display: 'inline-block',
    backgroundColor: ({ darkMode }) => darkMode ? '#2a2a3e' : '#f5f5f5',
    borderRadius: 4,
    padding: '2px 6px',
    margin: '2px 3px',
    fontSize: 11,
    color: ({ darkMode }) => darkMode ? '#ccc' : '#555',
  },
});

const LOCATION_MAP = {
  'TBCA-E': ['TOYOEO', 'PENSCO02'],
  'TBCA-W': ['TOYOWO'],
  'TBIN': ['TBINPI'],
  'TBIL': ['TBILI'],
  'TBMS': ['TBMSMM'],
  'TBAKI': ['TOYOAA'],
  'TBKY-B': ['TOYOBK', 'TBABBY', 'GUTHBK'],
  'TBKY-L': ['TBMKLK'],
  'TBKY-H': ['TOYOHK01'],
  'TBWK': ['TBWKHK'],
  'TBJT': ['TBDNJT', 'TBDNJT01'],
  'Head Office': ['TOYOEK'],
  'R&D': ['TOYONM'],
};

const ALL_LOCATIONS = [...new Set(Object.values(LOCATION_MAP).flat())];

export default function Monitor({ selectedLocation, darkMode }) {
  const getData = () => {
    try {
      const locations = selectedLocation === 'TBA'
        ? ALL_LOCATIONS
        : (LOCATION_MAP[selectedLocation] || [selectedLocation]);
      const locationParam = locations.map(l => `'${l}'`).join(',');
      axios
        .get(`https://engine.logikor.com/api/prod/tba.php?location=${locationParam}`)
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
  const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('');

const handleSort = (property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};
  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 300000);
    return () => clearInterval(interval);
  }, [selectedLocation]);

  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let paused = false;
    let intervalId;

    const startScroll = () => {
      intervalId = setInterval(() => {
        if (!paused && el.scrollHeight > el.clientHeight) {
          el.scrollTop += 1;
          if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
            el.scrollTop = 0;
          }
        }
      }, 50);
    };

    const handleMouseEnter = () => { paused = true; };
    const handleMouseLeave = () => { paused = false; };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    startScroll();

    return () => {
      clearInterval(intervalId);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [tableData]);

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

  const classes = useStyles({ darkMode });
  const isMobile = useMediaQuery('(max-width:768px)');

  const filteredData = tableData
    ? [...tableData].filter(
        load => load && load.planned_delivery && !load.route?.startsWith("MX")
      )
    : [];

  const sortedData = filteredData.sort((a, b) => {
    const aVal = a['planned_delivery'];
    const bVal = b['planned_delivery'];
    if (orderBy === 'planned_delivery' || orderBy === 'eta') {
      return (order === 'asc'
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal));
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const filterShipments = (shipments) =>
    shipments.filter((s) =>
      s != "TOYOTA BOSHOKU CANADA" &&
      s != "TOYOTA BOSHOKU AMERICA, INC." &&
      s != "PENSKE CROSSDOCK" &&
      s != "TBA WOODSTOCK" &&
      s != "TBA ELMIRA" &&
      s != "PENSKE CROSSDOCK C/O TBCA ELMIRA"
    );

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 16px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontSize: isMobile ? 18 : 22, color: darkMode ? '#e0e0e0' : '#1a1a1a', fontWeight: 700, letterSpacing: '-0.3px' }}>
          {selectedLocation}
        </span>
        <span style={{ fontSize: isMobile ? 13 : 16, color: darkMode ? '#888' : '#888', fontWeight: 400 }}>
          Load Monitor
        </span>
      </div>
      <span style={{
        fontSize: 13,
        color: '#fff',
        fontWeight: 600,
        backgroundColor: '#bf2126',
        borderRadius: 12,
        padding: '3px 12px',
      }}>
        {filteredData.length} load{filteredData.length !== 1 ? 's' : ''}
      </span>
    </div>

    {isMobile ? (
      <div className={classes.cardList} ref={containerRef}>
        {sortedData.map((row) => {
          if (!row) return null;
          return (
            <div key={row.load} className={classes.card}>
              <div className={classes.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={classes.cardLoad}>{row.load}</span>
                  {row.route && <span className={classes.cardRoute}>{row.route}</span>}
                </div>
                <img src={getStatus(row.status)} className={classes.cardStatusIcon} alt={row.status} />
              </div>
              <div className={classes.cardDivider} />
              <div className={classes.cardRow}>
                <span className={classes.cardLabel}>Trailer</span>
                <span className={classes.cardValue}>{row.trailer || '—'}</span>
              </div>
              <div className={classes.cardRow}>
                <span className={classes.cardLabel}>Carrier</span>
                <span className={classes.cardValue}>{row.carrier || '—'}</span>
              </div>
              <div className={classes.cardRow}>
                <span className={classes.cardLabel}>Next Stop</span>
                <span className={classes.cardValue}>{row.location_name || '—'}</span>
              </div>
              <div className={classes.cardRow}>
                <span className={classes.cardLabel}>Planned Delivery</span>
                <span className={classes.cardValue}>{row.planned_delivery || '—'}</span>
              </div>
              <div className={classes.cardRow}>
                <span className={classes.cardLabel}>ETA</span>
                <span className={classes.cardValue}>{row.eta || '—'}</span>
              </div>
              {filterShipments(row.shipments).length > 0 && (
                <>
                  <div className={classes.cardDivider} />
                  <div style={{ paddingTop: 4 }}>
                    <span className={classes.cardLabel}>Shipments</span>
                    <div style={{ marginTop: 4 }}>
                      {filterShipments(row.shipments).map((b, index) => (
                        <span key={index} className={classes.cardShipmentChip}>{b}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    ) : (
      <TableContainer component={Paper} className={classes.container} ref={containerRef} style={darkMode ? { backgroundColor: '#16213e' } : {}}>
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
      <StyledTableCell sortDirection={orderBy === 'trailer' ? order : false}>
        <TableSortLabel
          active={orderBy === 'trailer'}
          direction={orderBy === 'trailer' ? order : 'asc'}
          onClick={() => handleSort('trailer')}
        >
          Trailer
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
            {sortedData.map((row, idx) => {
                if (row) {
                  const rowBg = darkMode
                    ? (idx % 2 === 0 ? '#1a1a2e' : '#16213e')
                    : (idx % 2 === 0 ? '#fafafa' : '#ffffff');
                  const rowHover = darkMode ? '#1f2a47' : '#fff3f3';
                  const cellColor = darkMode ? '#ccc' : '#333';
                  const cellBorder = darkMode ? '1px solid #2a2a3e' : '1px solid #e8e8e8';
                  return (
                    <StyledTableRow key={row.load} style={{ backgroundColor: rowBg }}>
                      <StyledTableCell component="th" scope="row" width="10%" style={{ color: cellColor, borderBottom: cellBorder }}>
                        {row.load}
                      </StyledTableCell>
                      <StyledTableCell width="10%" style={{ color: cellColor, borderBottom: cellBorder }}>{row.route}</StyledTableCell>
                      <StyledTableCell width="10%" style={{ color: cellColor, borderBottom: cellBorder }}>{row.trailer}</StyledTableCell>
                      <StyledTableCell width="10%" style={{ color: cellColor, borderBottom: cellBorder }}>{row.location_name}</StyledTableCell>
                      <StyledTableCell width="10%" style={{ borderBottom: cellBorder }}>
                        {filterShipments(row.shipments).map((b, index) => (
                              <span key={index} className={classes.shipmentChip}>{b}</span>
                            ))}
                      </StyledTableCell>
                      <StyledTableCell width="10%" style={{ color: cellColor, borderBottom: cellBorder }}>
                        {row.planned_delivery || '—'}
                      </StyledTableCell>
                      <StyledTableCell width="10%" style={{ color: cellColor, borderBottom: cellBorder }}>{row.eta || '—'}</StyledTableCell>
                      <StyledTableCell width="10%" style={{ color: cellColor, borderBottom: cellBorder }}>{row.carrier}</StyledTableCell>
                      <StyledTableCell width="10%" style={{ borderBottom: cellBorder }}>
                        <img src={getStatus(row.status)} className={classes.statusIcon} alt={row.status}></img>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
    )}
    </>
  );
}

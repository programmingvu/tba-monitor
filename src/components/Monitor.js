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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 30,
    textAlign: "center",
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
          setTableData(loads);
        });
    } catch (e) {
      console.log(e);
    }
  };

const data2 = [{"load":"L1498897","owner":"TBA","route":"IN1000_EW-W","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-07 20:00:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","EPC Manufacturing","GECOM (DS)","IAF INDIANA AUTO FASTENERS","PENSKE CROSSDOCK","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1498903","owner":"TBA","route":"KY2040_EW-W","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-05 14:00:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","TGASK","Autoliv","PENSKE CROSSDOCK","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1498904","owner":"TBA","route":"KY2050_EW-W","carrier":"Rockwell Truckline","planned_delivery":"2023-06-05 14:15:00","dest":"TOYOEO","shipments":["NIFCO NORTH AMERICA","TBA Bardstown","BLUEGRASS METALS","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1500067","owner":"TBA","route":"MX5020_W-T","carrier":"Gigg Express Inc","planned_delivery":"2023-06-05 08:00:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1500069","owner":"TBA","route":"MX5021_W-T","carrier":"Gigg Express Inc","planned_delivery":"2023-06-05 13:30:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1500070","owner":"TBA","route":"MX5025_W-T","carrier":"Gigg Express Inc","planned_delivery":"2023-06-05 11:00:00","dest":"TBACCM","shipments":["TOYOTA BOSHOKU CANADA-US ACCT","TBA - CHAVEZ"],"eta":"","status":"Early"},
{"load":"L1500081","owner":"TBA","route":"TX6000_EW-T","carrier":"Autolinx Express Inc","planned_delivery":"2023-06-13 12:00:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","Joyson Safety","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1500083","owner":"TBA","route":"TX6010_EW-T","carrier":"Autolinx Express Inc","planned_delivery":"2023-06-05 10:00:00","dest":"PENSCO01","shipments":["PANASONIC","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1500583","owner":"TBA","route":"IN1010_EW-R","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-08 16:00:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","TRIN INC","TRMI","HI-LEX AMERICA","ROYAL TECHNOLOGIES CORP","PENSKE CROSSDOCK","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1500585","owner":"TBA","route":"IN1020_EW-R","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-05 08:15:00","dest":"TOYOEO","shipments":["AISIN USA","TBIN","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1500586","owner":"TBA","route":"IN1021_EW-R","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-05 12:45:00","dest":"TOYOEO","shipments":["AISIN USA","TBIN","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1500587","owner":"TBA","route":"IN1022_EW-R","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-03 21:30:00","dest":"TOYOEO","shipments":["AISIN USA","TBIN","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1500593","owner":"TBA","route":"MO7050_EW-R","carrier":"Rockwell Truckline","planned_delivery":"2023-06-08 11:00:00","dest":"TOYOWO","shipments":["AISIN ELECTRONICS, LLC","LEGGETT  PLATT (FLEXOLATOR)","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1500594","owner":"TBA","route":"MX5000_E-R","carrier":"Keypoint Carriers","planned_delivery":"2023-06-07 07:00:00","dest":"PENSCO01","shipments":["TBA - CHAVEZ","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1500597","owner":"TBA","route":"MX5001_E-R","carrier":"Keypoint Carriers","planned_delivery":"2023-06-07 15:00:00","dest":"PENSCO01","shipments":["TBA - CHAVEZ","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1500598","owner":"TBA","route":"MX5010_E-R","carrier":"Keypoint Carriers","planned_delivery":"2023-06-07 07:00:00","dest":"TBACCM","shipments":["TBA - CHAVEZ"],"eta":"","status":"Early"},
{"load":"L1500599","owner":"TBA","route":"MX5020_W-R","carrier":"Gigg Express Inc","planned_delivery":"2023-06-07 08:00:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1500601","owner":"TBA","route":"MX5025_W-R","carrier":"Gigg Express Inc","planned_delivery":"2023-06-07 11:00:00","dest":"TBACCM","shipments":["TOYOTA BOSHOKU CANADA","TBA - CHAVEZ"],"eta":"","status":"Early"},
{"load":"L1500602","owner":"TBA","route":"MX5030_W-H","carrier":"Keypoint Carriers","planned_delivery":"2023-06-06 19:30:00","dest":"PENSCO01","shipments":["Sumitomo Riko","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1500603","owner":"TBA","route":"MX5040_W-H","carrier":"Keypoint Carriers","planned_delivery":"2023-06-07 15:00:00","dest":"SUMIEQ","shipments":["PENSKE CROSSDOCK","Sumitomo Riko"],"eta":"","status":"Early"},
{"load":"L1500638","owner":"TBA","route":"TN5000_EW-R","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-05 12:00:00","dest":"TOYOWO","shipments":["TBTN"],"eta":"","status":"Early"},
{"load":"L1500639","owner":"TBA","route":"TN5001_EW-R","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-05 22:30:00","dest":"TOYOWO","shipments":["TBTN"],"eta":"","status":"Early"},
{"load":"L1500641","owner":"TBA","route":"VA7020_W-R","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 12:00:00","dest":"TOYOWO","shipments":["AZDEL (TOMAHAWK WAREHOUSING SERVICES"],"eta":"","status":"Early"},
{"load":"L1501117","owner":"TBA","route":"MX5000_E-F","carrier":"Keypoint Carriers","planned_delivery":"2023-06-08 07:00:00","dest":"PENSCO01","shipments":["TBA - CHAVEZ","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501119","owner":"TBA","route":"MX5000_E-T","carrier":"Keypoint Carriers","planned_delivery":"2023-06-05 07:00:00","dest":"PENSCO01","shipments":["TBA - CHAVEZ","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501120","owner":"TBA","route":"MX5000_E-W","carrier":"Keypoint Carriers","planned_delivery":"2023-06-06 07:00:00","dest":"PENSCO01","shipments":["TBA - CHAVEZ","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501122","owner":"TBA","route":"MX5001_E-F","carrier":"Keypoint Carriers","planned_delivery":"2023-06-08 15:00:00","dest":"PENSCO01","shipments":["TBA - CHAVEZ","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501124","owner":"TBA","route":"MX5001_E-T","carrier":"Keypoint Carriers","planned_delivery":"2023-06-05 15:00:00","dest":"PENSCO01","shipments":["TBA - CHAVEZ","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501126","owner":"TBA","route":"MX5001_E-W","carrier":"Keypoint Carriers","planned_delivery":"2023-06-06 15:00:00","dest":"PENSCO01","shipments":["TBA - CHAVEZ","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501127","owner":"TBA","route":"MX5020_W-F","carrier":"Gigg Express Inc","planned_delivery":"2023-06-08 08:00:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1501128","owner":"TBA","route":"MX5020_W-W","carrier":"Gigg Express Inc","planned_delivery":"2023-06-06 08:00:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1501144","owner":"TBA","route":"MX5021_W-W","carrier":"Gigg Express Inc","planned_delivery":"2023-06-06 13:30:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1501600","owner":"TBA","route":"MX5010_E-T","carrier":"Keypoint Carriers","planned_delivery":"2023-06-05 07:00:00","dest":"TBACCM","shipments":["TBA - CHAVEZ"],"eta":"","status":"Early"},
{"load":"L1501603","owner":"TBA","route":"MX5030_W-T","carrier":"Keypoint Carriers","planned_delivery":"2023-06-05 19:30:00","dest":"PENSCO01","shipments":["Sumitomo Riko","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501604","owner":"TBA","route":"MX5040_W-T","carrier":"Keypoint Carriers","planned_delivery":"2023-06-05 15:00:00","dest":"SUMIEQ","shipments":["PENSKE CROSSDOCK","Sumitomo Riko"],"eta":"","status":"Early"},
{"load":"L1501896","owner":"TBA","route":"IN1035_EW-F","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-09 11:30:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","EPC Manufacturing","RIGHTWAY FASTENERS INC.","GECOM (DS)","PENSKE CROSSDOCK","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1501897","owner":"TBA","route":"KY2010_EW-F","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 15:00:00","dest":"PENSCO01","shipments":["Inoac","Hayashi Telempu North America Corp.","NITTO DENKO AUTOMOTIVE KENTUCKY INC.","FUJITA RASHI","PENSKE CROSSDOCK","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1501899","owner":"TBA","route":"KY2020_EW-F","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-06 17:00:00","dest":"TOYOEO","shipments":["VFM","HIGHLANDS","Bluestar Plastics","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1501905","owner":"TBA","route":"MX5010_E-F","carrier":"Keypoint Carriers","planned_delivery":"2023-06-08 07:00:00","dest":"TBACCM","shipments":["TBA - CHAVEZ"],"eta":"","status":"Early"},
{"load":"L1501906","owner":"TBA","route":"MX5020_W-F","carrier":"Gigg Express Inc","planned_delivery":"2023-06-08 08:00:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1501908","owner":"TBA","route":"MX5025_W-F","carrier":"Gigg Express Inc","planned_delivery":"2023-06-08 11:00:00","dest":"TBACCM","shipments":["TOYOTA BOSHOKU CANADA-US ACCT","TBA - CHAVEZ"],"eta":"","status":"Early"},
{"load":"L1501909","owner":"TBA","route":"MX5030_W-F","carrier":"Keypoint Carriers","planned_delivery":"2023-06-08 19:30:00","dest":"PENSCO01","shipments":["Sumitomo Riko","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501911","owner":"TBA","route":"MX5040_W-F","carrier":"Keypoint Carriers","planned_delivery":"2023-06-08 15:00:00","dest":"SUMIEQ","shipments":["PENSKE CROSSDOCK","Sumitomo Riko"],"eta":"","status":"Early"},
{"load":"L1501912","owner":"TBA","route":"OH4000_E-F","carrier":"Onfreight Logistics","planned_delivery":"2023-06-05 21:00:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","BRIDGESTONE FOAM PRODUCTS DIVN","MOLTEN","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501913","owner":"TBA","route":"OH4001_E-F","carrier":"Onfreight Logistics","planned_delivery":"2023-06-06 17:30:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","BRIDGESTONE FOAM PRODUCTS DIVN","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1501914","owner":"TBA","route":"OH4003_W-F","carrier":"Rockwell Truckline","planned_delivery":"2023-06-05 19:00:00","dest":"TOYOWO","shipments":["BRIDGESTONE FOAM PRODUCTS DIVN"],"eta":"","status":"Early"},
{"load":"L1501922","owner":"TBA","route":"ON1042_E-F","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 07:00:00","dest":"TOYOEO","shipments":["TOYOTA TSUSHO WAREHOUSE"],"eta":"","status":"Early"},
{"load":"L1501926","owner":"TBA","route":"ON1070_EW-F","carrier":"MCCLAY'S TRANSPORTATION LTD","planned_delivery":"2023-06-05 19:45:00","dest":"TOYOWO","shipments":["SEWS Canada","COMMERCIAL SPRING  TOOL CO LTD","KOBAY","TUBULAR STEEL"],"eta":"","status":"Early"},
{"load":"L1502160","owner":"TBA","route":"MX5020_W-T","carrier":"Gigg Express Inc","planned_delivery":"2023-06-05 08:00:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1502274","owner":"TBA","route":"MX5020_W-R","carrier":"Gigg Express Inc","planned_delivery":"2023-06-07 08:00:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1502275","owner":"TBA","route":"MX5020_W-R","carrier":"Gigg Express Inc","planned_delivery":"2023-06-07 08:00:00","dest":"TOYOWOUS","shipments":["TBA - CHAVEZ","TOYOTA BOSHOKU CANADA-US ACCT"],"eta":"","status":"Early"},
{"load":"L1502668","owner":"TBA","route":"ON1029_EW-F","carrier":"Remex Express","planned_delivery":"2023-06-05 11:30:00","dest":"TOYOWO","shipments":["MVA STRATFORD","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1502766","owner":"TBA","route":"ON1030_EW-F","carrier":"Remex Express","planned_delivery":"2023-06-05 18:00:00","dest":"TOYOWO","shipments":["MVA STRATFORD","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1502767","owner":"TBA","route":"ON1031_EW-F","carrier":"Remex Express","planned_delivery":"2023-06-05 23:00:00","dest":"TOYOWO","shipments":["MVA STRATFORD","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1502768","owner":"TBA","route":"ON1040_W-F","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 13:15:00","dest":"TOYOWO","shipments":["MITCHELL PLASTICS","PENSKE CROSSDOCK","TOYOTA TSUSHO WAREHOUSE"],"eta":"","status":"Early"},
{"load":"L1502770","owner":"TBA","route":"ON1051_E-F","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 15:45:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","WOODBRIDGE - KIPLING","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1502771","owner":"TBA","route":"TX6010_EW-F","carrier":"Autolinx Express Inc","planned_delivery":"2023-06-08 10:00:00","dest":"PENSCO01","shipments":["PANASONIC","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503024","owner":"TBA","route":"IN1020_EW-M","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-07 08:15:00","dest":"TOYOEO","shipments":["AMBASSADOR BRIDGE","AISIN USA","TBIN","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1503025","owner":"TBA","route":"IN1021_EW-M","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-07 12:45:00","dest":"TOYOEO","shipments":["AMBASSADOR BRIDGE","AISIN USA","TBIN","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1503026","owner":"TBA","route":"IN1022_EW-M","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-07 21:30:00","dest":"TOYOEO","shipments":["AMBASSADOR BRIDGE","AISIN USA","TBIN","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1503029","owner":"TBA","route":"KY2040_EW-M","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-08 14:00:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","AMBASSADOR BRIDGE","TGASK","Autoliv","AMBASSADOR BRIDGE","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503032","owner":"TBA","route":"MI3010_W-M","carrier":"MCCLAY'S TRANSPORTATION LTD","planned_delivery":"2023-06-05 18:15:00","dest":"TOYOWO","shipments":["CGT","Shawmut Corp.","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1503040","owner":"TBA","route":"MX5030_W-M","carrier":"Keypoint Carriers","planned_delivery":"2023-06-09 19:30:00","dest":"PENSCO01","shipments":["Sumitomo Riko","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503042","owner":"TBA","route":"OH4000_E-M","carrier":"Onfreight Logistics","planned_delivery":"2023-06-06 21:00:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","AMBASSADOR BRIDGE","BRIDGESTONE FOAM PRODUCTS DIVN","MOLTEN","AMBASSADOR BRIDGE","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503044","owner":"TBA","route":"ON1029_EW-M","carrier":"Remex Express","planned_delivery":"2023-06-06 11:30:00","dest":"TOYOWO","shipments":["MVA STRATFORD","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503045","owner":"TBA","route":"ON1030_EW-M","carrier":"Remex Express","planned_delivery":"2023-06-06 18:00:00","dest":"TOYOWO","shipments":["MVA STRATFORD","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503046","owner":"TBA","route":"ON1031_EW-M","carrier":"Remex Express","planned_delivery":"2023-06-06 23:00:00","dest":"TOYOWO","shipments":["MVA STRATFORD","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503047","owner":"TBA","route":"ON1040_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-06 13:15:00","dest":"TOYOWO","shipments":["MITCHELL PLASTICS","PENSKE CROSSDOCK","TOYOTA TSUSHO WAREHOUSE"],"eta":"","status":"Early"},
{"load":"L1503048","owner":"TBA","route":"ON1041_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 20:45:00","dest":"TOYOWO","shipments":["MITCHELL PLASTICS","PENSKE CROSSDOCK","TOYOTA TSUSHO WAREHOUSE"],"eta":"","status":"Early"},
{"load":"L1503049","owner":"TBA","route":"ON1042_E-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-06 07:00:00","dest":"TOYOEO","shipments":["TOYOTA TSUSHO WAREHOUSE"],"eta":"","status":"Early"},
{"load":"L1503050","owner":"TBA","route":"ON1043_E-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 18:00:00","dest":"TOYOEO","shipments":["TOYOTA TSUSHO WAREHOUSE"],"eta":"","status":"Early"},
{"load":"L1503051","owner":"TBA","route":"ON1050_E-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-06 11:30:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","WOODBRIDGE - KIPLING","METRICAN STAMPING","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503052","owner":"TBA","route":"ON1051_E-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-06 15:45:00","dest":"PENSCO01","shipments":["PENSKE CROSSDOCK","WOODBRIDGE - KIPLING","PENSKE CROSSDOCK"],"eta":"","status":"Early"},
{"load":"L1503053","owner":"TBA","route":"ON1070_EW-M","carrier":"MCCLAY'S TRANSPORTATION LTD","planned_delivery":"2023-06-06 19:45:00","dest":"TOYOWO","shipments":["SEWS Canada","COMMERCIAL SPRING  TOOL CO LTD","KOBAY","TUBULAR STEEL"],"eta":"","status":"Early"},
{"load":"L1503054","owner":"TBA","route":"ON1081_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 05:30:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503055","owner":"TBA","route":"ON1082_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 07:00:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503056","owner":"TBA","route":"ON1083_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 08:30:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503057","owner":"TBA","route":"ON1084_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 10:00:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503058","owner":"TBA","route":"ON1085_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 11:00:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503059","owner":"TBA","route":"ON1086_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 11:30:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503060","owner":"TBA","route":"ON1087_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 13:00:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503061","owner":"TBA","route":"ON1088_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 14:30:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503062","owner":"TBA","route":"ON1089_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 16:00:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503063","owner":"TBA","route":"ON1090_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 17:00:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503064","owner":"TBA","route":"ON1091_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 17:30:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503065","owner":"TBA","route":"ON1092_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 19:00:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503066","owner":"TBA","route":"ON1093_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 20:30:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503067","owner":"TBA","route":"ON1094_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-05 23:30:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503068","owner":"TBA","route":"ON1095_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-06 01:00:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503069","owner":"TBA","route":"ON1096_W-M","carrier":"Elgin Motor Freight Inc.","planned_delivery":"2023-06-06 02:30:00","dest":"TOYOWO","shipments":["WOODBRIDGE - KIPLING"],"eta":"","status":"Early"},
{"load":"L1503070","owner":"TBA","route":"ON6010_EW-M","carrier":"MCCLAY'S TRANSPORTATION LTD","planned_delivery":"2023-06-06 08:30:00","dest":"TOYOEO","shipments":["HAWK PLASTICS","QSS (DS)","WOODBRIDGE - PLANT A"],"eta":"","status":"Early"},
{"load":"L1503071","owner":"TBA","route":"ON6011_EW-M","carrier":"MCCLAY'S TRANSPORTATION LTD","planned_delivery":"2023-06-06 13:30:00","dest":"TOYOEO","shipments":["QSS (DS)","Windsor Machine","WOODBRIDGE - PLANT A"],"eta":"","status":"Early"},
{"load":"L1503072","owner":"TBA","route":"ON6012_EW-M","carrier":"MCCLAY'S TRANSPORTATION LTD","planned_delivery":"2023-06-06 19:30:00","dest":"TOYOEO","shipments":["HAWK PLASTICS","QSS (DS)","WOODBRIDGE - PLANT A"],"eta":"","status":"Early"},
{"load":"L1503073","owner":"TBA","route":"ON6013_EW-M","carrier":"MCCLAY'S TRANSPORTATION LTD","planned_delivery":"2023-06-06 00:30:00","dest":"TOYOEO","shipments":["Bostik","HAWK PLASTICS","KB Components","Schukra","Ursa Manufacturing ULC"],"eta":"","status":"Early"},
{"load":"L1503074","owner":"TBA","route":"TN5000_EW-M","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-07 12:00:00","dest":"TOYOWO","shipments":["AMBASSADOR BRIDGE","TBTN","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1503075","owner":"TBA","route":"TN5001_EW-M","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-07 22:30:00","dest":"TOYOWO","shipments":["AMBASSADOR BRIDGE","TBTN","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L1503393","owner":"TBA","route":"IN1020_EW-F","carrier":"Charger Logistics Inc","planned_delivery":"2023-06-06 08:15:00","dest":"TOYOEO","shipments":["AISIN USA","TBIN","AMBASSADOR BRIDGE","AMBASSADOR BRIDGE"],"eta":"","status":"Early"},
{"load":"L371892","owner":"TBA","route":"TBA-EXPEDITE","carrier":"Titanium Trucking Service Inc","planned_delivery":"2019-03-08 06:30:00","dest":"TOYOWO","shipments":["IPAK INC"],"eta":"","status":"Late"},{"load":"L371921","owner":"TBA","route":"TB-OTHER","carrier":"Yrc Freight","planned_delivery":"2019-03-08 06:30:00","dest":"TOYOWO","shipments":["IPAK INC"],"eta":"2019-03-07 16:00:00","status":"Early"}]
  const data = [
    {
      loadNumber: "L1086631",
      route: "ON1030_EW-R",
      plannedDelivery: "2023-05-21 12:00:00",
      eta: null,
      createDate: "2023-02-18 15:50:00",
      status: "Late",
      shipments: [
        {
          shipmentNumber: "S880729",
          customerLoadNumber: "MVA STRATFORD",
        },
      ],
    },
    {
      loadNumber: "L1086635",
      route: "ON1040_W-F",
      plannedDelivery: "2023-05-26 15:30:00",
      eta: null,
      createDate: "2023-02-18 15:54:00",
      status: "Early",
      shipments: [
        {
          shipmentNumber: "S880759",
          customerLoadNumber: "MITCHELL PLASTICS",
        },
        {
          shipmentNumber: "S880759",
          customerLoadNumber: "TOYOTA TSUSHO WAREHOUSE",
        },
      ],
    },
    {
      loadNumber: "L1087670",
      route: "ON1051_E-T",
      plannedDelivery: "2023-05-27 09:00:00",
      eta: null,
      createDate: "2023-02-22 07:24:00",
      status: "Early",
      shipments: [
        {
          shipmentNumber: "S881615",
          customerLoadNumber: "WOODBRIDGE - KIPLING",
        },
      ],
    },
    {
      loadNumber: "L1088894",
      route: "IN1020_EW-R",
      plannedDelivery: "2023-05-28 17:00:00",
      eta: null,
      createDate: "2023-02-22 19:18:00",
      status: "Early",
      shipments: [
        {
          shipmentNumber: "S882310",
          customerLoadNumber: "AISIN USA",
        },
        {
          shipmentNumber: "S882311",
          customerLoadNumber: "TBIN",
        },
        {
          shipmentNumber: "S882313",
          customerLoadNumber: "TOYOTA BOSHOKU CANADA",
        },
      ],
    },
    {
      loadNumber: "L1093086",
      route: "IN1020_EW-F",
      customer: "TBA Adhoc",
      originLocation: "TOYOTA BOSHOKU CANADA",
      destinationLocation: "Lacero Solutions Inc",
      plannedDelivery: "2023-05-28 07:00:00",
      eta: "2023-05-27 00:00:00",
      createDate: "2023-02-28 11:30:00",
      status: "Early",
      shipments: [
        {
          shipmentNumber: "S882310",
          customerLoadNumber: "AISIN USA",
        },
        {
          shipmentNumber: "S882311",
          customerLoadNumber: "TBIN",
        },
        {
          shipmentNumber: "S882313",
          customerLoadNumber: "TOYOTA BOSHOKU CANADA",
        },
      ],
    },
    {
      loadNumber: "L1093819",
      route: "MI3010_W-F",
      plannedDelivery: "2023-05-28 08:00:00",
      eta: "2023-05-28 07:15:00",
      createDate: "2023-05-28 07:15:00",
      status: "On Time",
      shipments: [
        {
          shipmentNumber: "S886018",
          customerLoadNumber: "CGT",
        },
        {
          shipmentNumber: "S882423",
          customerLoadNumber: "Shawmut Corp.",
        },
      ],
    },
    {
      loadNumber: "L1548789",
      route: "MI3010_W-M",
      plannedDelivery: "2023-05-29 08:00:00",
      eta: "2023-05-30 14:57:00",
      createDate: "2023-05-30 14:57:00",
      status: "Late",
      shipments: [
        {
          shipmentNumber: "S886018",
          customerLoadNumber: "CGT",
        },
        {
          shipmentNumber: "S882423",
          customerLoadNumber: "Shawmut Corp.",
        },
      ],
    },
    {
      loadNumber: "L1548423",
      route: "MI3020_W-M",
      plannedDelivery: "2023-05-31 08:00:00",
      eta: "2023-05-30 06:57:00",
      createDate: "2023-05-31 06:57:00",
      status: "Early",
      shipments: [
        {
          shipmentNumber: "S886018",
          customerLoadNumber: "Shawmut Corp.",
        },
      ],
    },
  ];
  const [tableData, setTableData] = React.useState([]);
  const todaysDate = new Date().toISOString().split('T')[0];
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
            <StyledTableCell width="10%">L#</StyledTableCell>
            <StyledTableCell width="10%">Route</StyledTableCell>
            <StyledTableCell width="10%">Shipments</StyledTableCell>
            <StyledTableCell width="10%">Planned Delivery</StyledTableCell>
            <StyledTableCell width="10%">ETA</StyledTableCell>
            <StyledTableCell width="10%">Carrier</StyledTableCell>
            <StyledTableCell width="10%">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData &&
            tableData.filter((load) => {if(load){ return todaysDate >= load.planned_delivery.slice(0,10)}} ).map((row) => {
              if (row) {
                return (
                  <StyledTableRow key={row.load}>
                    <StyledTableCell component="th" scope="row" width="10%">
                      {row.load}
                    </StyledTableCell>
                    <StyledTableCell width="10%">{row.route}</StyledTableCell>
                    <StyledTableCell width="10%">
                      {" "}
                      {row.shipments.filter((shipments) => {
                            return (
                              shipments != "TOYOTA BOSHOKU CANADA" &&
                              shipments != "TOYOTA BOSHOKU AMERICA, INC." &&
                              shipments != "PENSKE CROSSDOCK" && 
                              shipments != "TBA WOODSTOCK" &&
                              shipments != "TBA ELMIRA"
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

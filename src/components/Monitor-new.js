import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Box } from "@mui/material";

import green from "../static/media/TruckSideIcon-Green.svg";
import yellow from "../static/media/TruckSideIcon-Yellow.svg";
import red from "../static/media/TruckSideIcon-Red.svg";

export default function Monitor() {
  const [tableData, setTableData] = useState([]);
  const [sortModel, setSortModel] = useState([
    { field: "planned_delivery", sort: "asc" }
  ]);

  const todaysDate = new Date().toISOString().split("T")[0];

  const getStatusImage = (status) => {
    if (status === "Early") return green;
    if (status === "On Time") return yellow;
    if (status === "Late") return red;
    return yellow;
  };

  const fetchData = () => {
    axios
      .get("https://engine.logikor.com/api/prod/tba.php?location='TOYOWO','PENSCO03','PENSCO04','TOYOEO','PENSCO02'")
      .then((response) => {
        const loads = response.data;
        setTableData(loads);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTableData((prevData) => {
        const [first, ...rest] = prevData;
        return [...rest, first];
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const filteredRows = tableData
    .filter((load) => {
      return (
        load &&
        todaysDate >= load.planned_delivery?.slice(0, 10) &&
        !load.route?.startsWith("MX")
      );
    })
    .map((load, index) => ({
      id: index,
      load: load.load,
      route: load.route,
      shipments: load.shipments?.filter(
        (s) =>
          ![
            "TOYOTA BOSHOKU CANADA",
            "TOYOTA BOSHOKU AMERICA, INC.",
            "PENSKE CROSSDOCK",
            "TBA WOODSTOCK",
            "TBA ELMIRA",
            "PENSKE CROSSDOCK C/O TBCA ELMIRA",
          ].includes(s)
      ).join(", "),
      planned_delivery: load.planned_delivery,
      eta: load.eta,
      carrier: load.carrier,
      statusImg: getStatusImage(load.status),
    }));

  const columns = [
    {
      field: "load",
      headerName: "L#",
      flex: 1,
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "route",
      headerName: "Route",
      flex: 1,
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "shipments",
      headerName: "Shipments",
      flex: 2,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "planned_delivery",
      headerName: "Planned Delivery",
      flex: 1,
      type: "dateTime",
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "eta",
      headerName: "ETA",
      flex: 1,
      type: "dateTime",
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "carrier",
      headerName: "Carrier",
      flex: 1,
      sortable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "statusImg",
      headerName: "Status",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <img src={params.value} alt="status" height="30" />,
    },
  ];

  return (
    <Box sx={{ height: "75vh", width: "100%" }}>
      <DataGridPro
        rows={filteredRows}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        disableRowSelectionOnClick
        pageSizeOptions={[25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        sx={{
          fontSize: "16px",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "18px",
            textAlign: "center",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center",
          },
        }}
      />
    </Box>
  );
}

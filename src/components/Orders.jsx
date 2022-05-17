import React, { useContext, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderProvider from "../context/UserOrderContext/Order.provider";
import { CircularProgress, Paper } from "@mui/material";
import OrderItems from "./OrderItems";

export default function Orders() {
  const { getAllOrders, orders, loading } = useContext(OrderProvider);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="m-5">
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <div className="text-center m-2">
            <Typography variant="h4">My Orders</Typography>
          </div>
          {orders.map((order) => {
            return (
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <div className="flex flex-row justify-between w-full">
                    <Typography>
                      <span className="font-bold text-primary">
                        Scheduled on :
                      </span>{" "}
                      {order.createdAt.substring(0, 10)}
                    </Typography>
                    <Typography>
                      <span className="font-bold text-primary">
                        Total Coins :
                      </span>{" "}
                      {order.totalCoins}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <OrderItems items={order.items} />
                  <div className="flex flex-row justify-end mt-4">
                    <Typography>
                      <span className="font-bold text-primary ">Status: </span>{" "}
                      {order.status}
                    </Typography>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </>
      )}
    </div>
  );
}

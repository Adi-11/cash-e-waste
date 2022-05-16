import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderProvider from "../context/UserOrderContext/Order.provider";
import { CircularProgress, Grid } from "@mui/material";
import OrderItems from "./OrderItems";

export default function Orders() {
  const { getAllOrders, orders, loading } = React.useContext(OrderProvider);
  React.useEffect(() => {
    getAllOrders();

    console.log(orders);
  }, []);
  return (
    <div className="m-5">
      {loading ? (
        <>
          <CircularProgress></CircularProgress>
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
                        Created on :
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
      {/*  */}

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}

import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const OrderItems = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        return (
          <Card variant="outlined">
            <CardContent>
              <Typography>
                <span className="font-bold text-primary">Item:</span>{" "}
                {item.itemName}
              </Typography>
              <Typography>
                <span className="font-bold text-primary">Coins:</span>{" "}
                {item.coins}
              </Typography>
              <Typography>
                <span className="font-bold text-primary">Quantity:</span>{" "}
                {item.quantity}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default OrderItems;

import React, { useContext, useEffect, useState } from "react";
import { Header } from "../Header";
import { GiCardPickup } from "react-icons/gi";
import { FaLocationArrow } from "react-icons/fa";
import { Divider } from "@mui/material";
import ProductsContext from "../../context/Products/Products.provider";

interface PickUpProps {}

type activeState = "select" | "location";

export const PickUp: React.FC<PickUpProps> = ({}) => {
  const { loading, products, getAllProducts } =
    useContext<any>(ProductsContext);

  const [pickupData, setPickupData] = useState<any>({
    items: [],
    location: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      geoLocation: {
        type: "Point",
        coordinates: [0, 0],
      },
    },
  });

  const [active, setActive] = useState<activeState>("select");

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleItemUpdate = (item: any) => {
    setPickupData({
      ...pickupData,
      items: [...pickupData.items, item],
    });
  };

  const handleInputChange = (e: any) => {
    setPickupData({
      ...pickupData,
      location: {
        ...pickupData.location,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleGeolocation = (e: any) => {
    setPickupData({
      ...pickupData,
      location: {
        ...pickupData.location,
        geoLocation: {
          ...pickupData.location.geoLocation,
          coordinates: [e.lat, e.lng],
        },
      },
    });
  };

  return (
    <>
      <Header />
      <div className="lg:h-screen flex items-center justify-center">
        <div className="shadow-2xl shadow-slate-500 rounded-md py-2 m-auto mb-4 mt-10 flex items-center flex-col-reverse lg:flex-row lg:py-8 justify-center w-3/4 schedule-bg">
          <div className="w-full flex-[0.2] h-full rounded-tl-md rounded-bl-md py-4 px-8">
            <div className="w-full sm:w-full md:w-1/2 lg:w-full flex lg:items-start lg:justify-start item-center justify-center flex-row text-black lg:text-white lg:flex-col  m-auto">
              <div
                className={`flex items-center cursor-pointer w-full py-1 px-1 rounded-sm  schedule-click ${
                  active === "select" ? "schedule-active" : ""
                }`}
                onClick={() => setActive("select")}
              >
                <GiCardPickup />
                <p className="ml-4">Select Item</p>
              </div>
              <div className="my-4 w-3/4 hidden md:hidden lg:block">
                <Divider sx={{ borderColor: "white" }} />
              </div>
              <div
                className={`flex items-center cursor-pointer w-full py-1 px-1 rounded-sm  schedule-click ${
                  active === "location" ? "schedule-active" : ""
                }`}
                onClick={() => setActive("location")}
              >
                <FaLocationArrow />
                <p className="ml-4">Pickup Location</p>
              </div>
            </div>
          </div>
          <div className="flex-[0.8] h-full rounded-tl-md rounded-bl-md p-4"></div>
        </div>
      </div>
    </>
  );
};

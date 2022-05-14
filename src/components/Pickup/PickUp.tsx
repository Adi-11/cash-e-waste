import React, { useContext, useEffect, useState } from "react";
import { Header } from "../Header";
import { GiCardPickup } from "react-icons/gi";
import { FaLocationArrow } from "react-icons/fa";
import { Divider } from "@mui/material";
import ProductsContext from "../../context/Products/Products.provider";
import { SelectItem } from "./SelectItem";
import { Location } from "./Location";

interface PickUpProps {}

type activeState = "select" | "location";

export const PickUp: React.FC<PickUpProps> = ({}) => {
  const { loading, products, getAllProducts, addOrder } =
    useContext<any>(ProductsContext);

  const [pickupData, setPickupData] = useState<any>({
    items: [
      {
        _id: "",
        quantity: 0,
      },
    ],
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPickupData({
        ...pickupData,
        location: {
          ...pickupData.location,
          geoLocation: {
            ...pickupData.location.geoLocation,
            coordinates: [position.coords.longitude, position.coords.latitude],
          },
        },
      });
    });
  }, []);

  const handleItemUpdate = (item: any, index: any) => {
    let newOrder = pickupData.items;
    newOrder[index]._id = item._id;
    newOrder[index].quantity = item.quantity;
    setPickupData({
      ...pickupData,
      items: [...newOrder, { _id: "", quantity: 0 }],
    });
  };

  const handleInputChange = (e: any) => {
    console.log(e.target.value, e.target.name);
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
          coordinates: [e.lng, e.lat],
        },
      },
    });
  };

  const handleAddItem = () => {
    console.log({ pickupData });
    addOrder(pickupData);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <div className="shadow-2xl shadow-slate-500 rounded-md py-2 m-auto mb-4 mt-10 flex items-center flex-col lg:flex-row lg:py-8 justify-center w-3/4 schedule-bg relative">
          {active === "location" && (
            <div className="absolute right-0 bottom-0 m-2 flex items-center justify-center">
              <button
                className="bg-secondary rounded-md text-white text-sm p-1 mx-2"
                onClick={() => handleAddItem()}
              >
                Done
              </button>
            </div>
          )}
          <div className="w-full flex-[0.2] h-full rounded-tl-md rounded-bl-md py-4 px-8">
            <div className="w-full sm:w-full md:w-1/2 lg:w-full flex lg:items-start lg:justify-start item-center justify-center flex-row text-black lg:text-white lg:flex-col  m-auto">
              <div
                className={`flex items-center cursor-pointer w-full py-1 px-1 rounded-md schedule-click ${
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
                className={`flex items-center cursor-pointer w-full py-1 px-1 rounded-md  schedule-click ${
                  active === "location" ? "schedule-active" : ""
                }`}
                onClick={() => setActive("location")}
              >
                <FaLocationArrow />
                <p className="ml-4">Pickup Location</p>
              </div>
            </div>
          </div>
          <div className="w-full flex-[0.8] h-full rounded-tl-md rounded-bl-md p-4">
            <div className="m-auto w-4/5">
              {active === "select" ? (
                <>
                  {pickupData.items.map((item: any, index: number) => {
                    return (
                      <SelectItem
                        key={index}
                        item={item}
                        handleItemUpdate={handleItemUpdate}
                        products={products}
                        index={index}
                      />
                    );
                  })}
                </>
              ) : (
                <Location
                  data={pickupData.location}
                  handleInputChange={handleInputChange}
                  handleGeolocation={handleGeolocation}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

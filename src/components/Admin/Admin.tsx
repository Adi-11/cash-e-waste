import React, { useContext, useEffect } from "react";
import ProductsContext from "../../context/Products/Products.provider";
import { Header } from "../Header";
import styles from "../../styles/Admin.module.css";
import { BiEdit } from "react-icons/bi";
import { AddProduct } from "./AddProducts";
import { LinearProgress } from "@mui/material";

interface AdminProps {}

export const EWasteTypes = [
  "Fridges, freezers and other cooling equipment",
  "Computers and telecommunications equipment",
  "Consumer electronic devices and solar panels",
  "TVs, monitors and screens",
  "LED bulbs",
  "Vending machines",
];

export const Admin: React.FC<AdminProps> = ({}) => {
  const { loading, getAllProducts, getCompanies, products } =
    useContext<any>(ProductsContext);

  useEffect(() => {
    getAllProducts();
    getCompanies();
  }, []);

  const handleUpdate = (data: any) => {
    console.log({ data });
  };

  return (
    <>
      <Header />
      <AddProduct />
      <div className="flex items-center justify-center flex-col mt-4">
        <p className="text-xl font-bold py-4">All Products</p>
        {loading ? (
          <LinearProgress />
        ) : (
          <table className={styles.projectsTable}>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Company</th>
                <th>Price</th>
                <th>Coins</th>
                <th>Actions</th>
              </tr>
            </thead>
            {
              <tbody className={styles.containerTlb}>
                {products.map((product: any, index: number) => {
                  return (
                    <tr key={product?._id}>
                      <td className={styles.member}>
                        <figure>
                          <img
                            src={
                              product?.avatar
                                ? product?.avatar
                                : "http://simpleicon.com/wp-content/uploads/product.png"
                            }
                            alt="avatar"
                          />
                        </figure>
                      </td>
                      <td>
                        <p> {product?.name} </p>
                      </td>
                      <td>
                        <p>{product?.company}</p>
                      </td>
                      <td>
                        <p>{product?.price}</p>
                      </td>
                      <td>
                        <p>{product?.coins}</p>
                      </td>
                      <td className={styles.center}>
                        <BiEdit
                          size={20}
                          onClick={() => handleUpdate(product)}
                        />
                        <span className={styles.space} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            }
          </table>
        )}
      </div>
    </>
  );
};

import { useEffect } from "react";
import "./Productsummary.scss";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import InforBox from "../../InforBox/InforBox";


// Icons
const earningIcon = <FaMoneyBillTrendUp size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;


const ProductSummary = ({products}) => {
  return (
    <div className="product-summary">
      <h3 className="--mt">e-ventory Statistics</h3>

      <div className="info-summary">
      <InforBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />

        <InforBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={0}
          bgColor="card2"
        />

        <InforBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={0}
          bgColor="card3"
        />

        <InforBox
          icon={categoryIcon}
          title={"All Categories"}
          count={0}
          bgColor="card4"
        />
        
      </div>
    </div>
  )
};

export default ProductSummary;

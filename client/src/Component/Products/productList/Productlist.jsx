import {useState} from 'react';
import "./productlist.scss";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from '../../loading/Loader';
import Search from '../../search/Search';
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../Redux/product/FilterSlice";
import { useEffect } from 'react';

const Productlist = ({products, isLoading}) => {

  const filteredProducts = useSelector(selectFilteredPoducts);

  const dispatch = useDispatch();


  const [search, setSearch] = useState("");


  //shorten any text to a particular length number
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };



  //handles the filter func...
  useEffect(()=>{
    dispatch(FILTER_PRODUCTS({ products, search }));
  },[products, search, dispatch]);


  return (
    <div className="product-list">
      <hr />

      <div className='table'>
      <div className="--flex-between --flex-dir-column">
          <span>
            <h3>e-ventory Items</h3>
          </span>
          <span>
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          </span>
      </div>

      {isLoading && <Loader/>}

      <div className='table'>
       {!isLoading && products.length === 0 ? (<p>-- No product found, please add a product...</p>): (
        <table>
          <thead>
               <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
          </thead>

           {/* { mapping all the items from the product} */}
          <tbody>
            {filteredProducts.map((product, index)=>{
              const { _id, name, category, price, quantity } = product;
              return (
                 <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{shortenText(name, 16)}</td>
                    <td>{category}</td>
                    <td> &#x20A6;{Number(price).toLocaleString('en-US')} </td>
                    <td>{Number(quantity)}</td>
                    <td>&#x20A6;{Number(price * quantity).toLocaleString('en-us')}</td>
                    <td className="icons">
                        <span>
                          <Link to={`#`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`#`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt size={20} color={"red"} />
                        </span>
                      </td>
                 </tr>
              )
            })}
          </tbody>
        </table>
       )}
      </div>

      </div>
      
    </div>
  )
};

export default Productlist;



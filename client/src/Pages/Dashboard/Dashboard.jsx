import { useEffect, useState } from "react";
import useRedirectLoggedOutUser from '../../customerHook/UserRedirect';
import ProductSummary from '../../Component/Products/ProductSummary/ProductSummary';
import Productlist from '../../Component/Products/productList/Productlist';
import { 
  GetProductStart,
  GetProductSuccess, 
  GetProductFailure 
} from '../../Redux/product/ProductSlice';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const Dashboard = () => {

  //from our cutom hook
  useRedirectLoggedOutUser('/login');

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => state.user);
  const {products} = useSelector(state => state.product);
  const [loading, setLoading] = useState(false);

  //fetching the product from the database
  const fetchproducts = async ()=>{

    try {
        setLoading(true)
        dispatch(GetProductStart())

        const res = await fetch('/api/product/getproduct');
        const data = await res.json();

        if (data.success === false ) {
            setLoading(false)
            dispatch(GetProductFailure(data.message))
            toast.error(data.message);
            return; 
        }
        //console.log(data);
        dispatch(GetProductSuccess(data));
        setLoading(false);
    } catch (error) {
       setError(true)
       setLoading(false)
    }

   };

  useEffect(()=>{
    if (isLoggedIn === true) {
      fetchproducts()
    };

  },[isLoggedIn, dispatch]);




  return (
    <div>
      <ProductSummary />
      <Productlist products={products} isLoading={loading} />
    </div>
  )
}

export default Dashboard;



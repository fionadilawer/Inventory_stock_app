import React, { useState } from 'react';
import ProductForm from '../../Component/productForm/ProductForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  CreateFailure, 
  CreateStart, 
  CreateSuccess 
} from '../../Redux/product/ProductSlice';
import Loader from '../../Component/loading/Loader';
import { toast } from "react-toastify";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const Addproduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);


  const { name, category, price, quantity } = product;

  //this is how you pass handlechange as a props
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };


  //previewing the image 
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0])); //allows you to get the image url
  };


  //SKU stands for "Stock Keeping Unit. 
  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };


  //handlesChanges the onSubmit passing it as a props
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);

    //console.log(...formData);

    try {
      setLoading(true);
      dispatch(CreateStart());
      const res = await fetch('/api/product/createproduct', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        setLoading(false);
        dispatch(CreateFailure(`Error: ${res.statusText}`));
        toast.error(`Error: ${res.statusText}`);
        return;
      }

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        dispatch(CreateFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(CreateSuccess(data))
      setLoading(false);
      navigate('/dashboard');
      toast.success("Created successfully");
    } catch (error) {
      setLoading(false);
      dispatch(CreateFailure(error.message));
      toast.error(data.message);
    }

  };


  return (
    <div>
      {loading && <Loader />}
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm
      product={product}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      saveProduct={saveProduct}
      productImage={productImage}
      imagePreview={imagePreview}
      description={description}
      setDescription={setDescription}
      />
    </div>
  )
}

export default Addproduct;

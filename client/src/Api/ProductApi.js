import React from 'react'
import axios from 'axios';

const ProductApi = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async() =>{
        const res = await axios.get("api/products")
        console.log(res);
    }

    useEffect(() => {
      getProducts();
    
      return () => {
        products : [products,setProducts]
      }
    }, [])
    
  return (
    <div><h1>Products</h1></div>
  )
}

export default ProductApi
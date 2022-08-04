import { useEffect, useState } from "react"
import { ProductList } from "./ProductList"

    export const ProductViews = () => {

        const [productArray, setProductArray] = useState([])
        const [productTypeArray, setProductTypeArray] = useState([])
        
        //fetch products
        useEffect(() => {
            fetch("http://localhost:8088/products")
                .then(response => response.json())
                .then(productArray => setProductArray(productArray))
                .then (() => fetch("http://localhost:8088/productTypes")
                    .then(response => response.json())
                    .then(productTypesArray => setProductTypeArray(productTypesArray)))
    
        }, [])
    
        //fetch product types
        useEffect(() => {
        }, [])

        return < ProductList products={productArray} productTypes={productTypeArray} />
        
    }
    
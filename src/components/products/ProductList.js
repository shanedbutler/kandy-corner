import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductList.css"

export const ProductList = () => {

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const [filtered, setFiltered] = useState([])
    const [showTopProducts, setShowTopProducts] = useState(false)

    const [products, setProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])
    
    //fetch products
    useEffect(() => {
        fetch("http://localhost:8088/products")
            .then(response => response.json())
            .then(productArray => setProducts(productArray))
            .then (() => fetch("http://localhost:8088/productTypes")
                .then(response => response.json())
                .then(productTypesArray => setProductTypes(productTypesArray)))

    }, [])

        //hook to toggle button and filter products
        useEffect(() => {
            if (!showTopProducts) {
                setFiltered(products)
    
            } else {
                const topPricedProducts = products.filter(product => product.price > 15)
                setFiltered(topPricedProducts)
            }
        }, [showTopProducts, productTypes])

    return (
        <>
            {
                kandyUserObject.staff ?
                    <>
                        <button onClick={() => navigate("/product/create", productTypes)}>Create Product</button>
                    </>
                    : //else user is non staff
                    <>
                        <button onClick={() => setShowTopProducts(!showTopProducts)}>{showTopProducts ? "Show All" : "Show Top"}</button>
                    </>
            }
            <article className="products">
                {filtered.map(product => {
                    return (
                        <section className="product__card" key={product.id}>
                            <div>{product.name}</div>
                            <div>Price: ${product.price}</div>
                            <div>Type: {productTypes.find(type => type.id === product.productTypeId).name}</div>
                        </section>
                    )
                })}
            </article>
        </>
    )
}

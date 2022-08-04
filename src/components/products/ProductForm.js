import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export const ProductForm = () => { //TODO = pass types through via prop through useNavigate

    const navigate = useNavigate()
    const location = useLocation()

    const [productTypes, setProductTypes] = useState([])
    const [userInput, setUserInput] = useState({
        name: "",
        price: "",
        productTypeId: ""
    })

    useEffect(() => {
        fetch("http://localhost:8088/productTypes")
        .then(response => response.json())
        .then(productTypesArray => setProductTypes(productTypesArray))
    }, [])

    const submitProduct = (product) => {
        if (product.name && product.price && product.productTypeId) {
            fetch("http://localhost:8088/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
                .then(() => navigate("/products"))
        }
        else {
            console.log("Error: please complete all three product inputs")
        }
    }

    return (
        <>
            <label>Name: </label>
            <input type="text"
                onChange={(e) => {
                    const newProduct = { ...userInput }
                    newProduct.name = e.target.value
                    setUserInput(newProduct)
                }} />
            <label>Price: </label>
            <input type="number"
                onChange={(e) => {
                    const newProduct = { ...userInput }
                    newProduct.price = +e.target.value
                    setUserInput(newProduct)
                }} />
            <label>Type: </label>
            <select
                onChange={(e) => {
                    const newProduct = { ...userInput }
                    newProduct.productTypeId = +e.target.value //TODO: value not getting set
                    setUserInput(newProduct)
                }}>
                <option value={0}>Select...</option>

                {productTypes.map((type) => {
                    return <option key={type.id} value={type.id}>{type.name}</option>
                })}
            </select>
            <button onClick={(clickEvent) => submitProduct(userInput)}>Submit Product</button>
        </>
    )
}

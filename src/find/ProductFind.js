import { useState, useEffect } from "react"

export const ProductFind = () => {

    const [products, setProducts] = useState([])
    const [userInput, setUserInput] = useState("")
    const [found, setFound] = useState()

    useEffect(() => {
        fetch("http://localhost:8088/products")
            .then(response => response.json())
            .then(productArray => setProducts(productArray))

    }, [])

    useEffect(() => {
        if (userInput) {
        const foundProduct = products.find(product => product.name.toLowerCase().startsWith(userInput.toLowerCase()))
        setFound(foundProduct)
        }

        else {
            setFound()
        }

    }, [userInput])


    return (
        <>
            <form>
                <fieldset>
                    <legend>What candy are you looking for?</legend>

                    <div className="form-group">
                        <input type="text" required autoFocus
                            onChange={(e) => {
                                setUserInput(e.target.value)
                            }} />
                    </div>
                </fieldset>
            </form>
            {/* Prevent below card from rendering if found variable is not yet set */}
            {found ?
                <section className="product__card" key={found.id}>
                    <div>{found.name}</div>
                    <div>Price: ${found.price}</div>
                </section>
                :
                <></>
            }
        </>

    )
}
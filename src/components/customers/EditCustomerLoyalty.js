import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditCustomerLoyalty = () => {

    const { customerId } = useParams()
    const navigate = useNavigate()

    const [customer, setCustomer] = useState({
        loyaltyNumber: 0
    })

    useEffect(() => {
        fetch(`http://localhost:8088/customers/${customerId}`)
            .then(response => response.json())
            .then(customerObject => setCustomer(customerObject))
    }, [customerId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const putOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        }

        fetch(`http://localhost:8088/customers/${customerId}`, putOptions)
        .then(() => navigate("/customers"))
    }

    return (
        <>
            <form className="customerForm">
                <h2 className="customerForm__title">Edit Loyalty Number</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="loyaltyNumber">Loyalty Number:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={customer.loyaltyNumber}
                            onChange={
                                (e) => {
                                    const customerCopy = { ...customer }
                                    customerCopy.loyaltyNumber = +e.target.value
                                    setCustomer(customerCopy)
                                }
                            } />
                    </div>
                </fieldset>
            </form>
            <button
                onClick={(e) => handleSaveButtonClick(e)}
                className="btn btn-primary">
                Update
            </button>
        </>
    )
}

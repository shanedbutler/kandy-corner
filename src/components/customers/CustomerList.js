import { useEffect, useState } from "react"
import "./CustomerList.css"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    const [showDetails, setShowDetails] = useState(0)

    //fetch from api
    useEffect(() => {
        fetch("http://localhost:8088/customers?_expand=user")
            .then(response => response.json())
            .then(customerArray => setCustomers(customerArray))
    }, [])

    const toggleDetails = (event, showDetails, id) => {

        event.preventDefault()
        
        if (showDetails === id) {
            setShowDetails(0)
        } else {
            setShowDetails(id)
        }
    }

    return (
        <article className="customers">
            {customers.map(customer => {
                return (
                    <section className="customer__card" key={customer.id}>
                        <div onClick={(e) => toggleDetails(e, showDetails, customer.id)}>
                            <div>{customer.user.fullName}</div>
                            <div>Email: {customer.user.email}</div>
                            {showDetails === customer.id ? 
                            <div>Loyalty Number: {customer.loyaltyNumber}</div> 
                            : null}
                        </div>
                    </section>
                )
            })}
        </article>
    )
}

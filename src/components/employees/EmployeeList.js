import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EmployeeList.css"

export const EmployeeList = () => {

    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])
    
    //fetch from api
    useEffect(() => {
        fetch("http://localhost:8088/employees?_expand=location&_expand=user")
            .then(response => response.json())
            .then(employeeArray => setEmployees(employeeArray))
    }, [])

    return (
        <>

        <button onClick={() => navigate("/employees/hire")}>Add New Employee</button>

            <article className="employees">
                {employees.map(employee => {
                    return (
                        <section className="employee__card" key={employee.id}>
                            <div>{employee.user.fullName}</div>
                            <div>Rate: ${employee.payRate}</div>
                            <div>Location: {employee.location.address}</div>
                        </section>
                    )
                })}
            </article>
        </>
    )
}

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const HireEmployee = () => {

    const navigate = useNavigate()

    const [locations, setLocations] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/locations")
         .then(response => response.json())
         .then(locationsArray => setLocations(locationsArray))
    }, [])

    const [userInput, setUserInput] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })

    const [employeeInput, setEmployeeInput] = useState({
        startDate: "",
        payRate: 0,
        userId: 0,
        locationId: 0
    })

    const submitEmployee = (event, user, employee) => {
        event.preventDefault()

        fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        
        //fetch users array, copy incoming employee data, and set newEmployee locationId to last item in user array (the new user)
        .then(() => fetch("http://localhost:8088/users")
        .then(response => response.json())
        .then(usersArray => setUsers(usersArray)))
        .then(() => {
            const newEmployee = { ...employee }
            newEmployee.locationId = (users.length - 1)
            setEmployeeInput(newEmployee)
        })

            .then(() => fetch("http://localhost:8088/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            }))
            .then(() => navigate("/employees"))
    }

    return (
        <form>
            <fieldset>
                <legend>New Employee:</legend>

                <div className="form-group">
                    <label>Full Name: </label>
                    <input type="text" required autoFocus
                        onChange={(e) => {
                            const newUser = { ...userInput }
                            newUser.fullName = e.target.value
                            setUserInput(newUser)
                        }} />
                </div>

                <div className="form-group">
                    <label>email: </label>
                    <input type="text" required
                        onChange={(e) => {
                            const newUser = { ...userInput }
                            newUser.email = e.target.value
                            setUserInput(newUser)
                        }} />
                </div>
                <div className="form-group">
                    <label>Start Date: </label>
                    <input type="text" required
                        onChange={(e) => {
                            const newEmployee = { ...employeeInput }
                            newEmployee.startDate = e.target.value
                            setEmployeeInput(newEmployee)
                        }} />
                </div>
                <div className="form-group">
                    <label>Pay Rate: </label>
                    <input type="float" required
                        onChange={(e) => {
                            const newEmployee = { ...employeeInput }
                            newEmployee.payRate = parseInt(e.target.value, 2)
                            setEmployeeInput(newEmployee)
                        }} />
                </div>

                <div className="form-group">
                    <label>Location: </label>
                    <select required
                        onChange={(e) => {
                            const newEmployee = { ...employeeInput }
                            newEmployee.locationId = +e.target.value
                            setEmployeeInput(newEmployee)
                        }}>
                        <option value={0}>Select...</option>
                        
                        {locations.map((location) => {
                            return <option key={location.id} value={location.id}>{location.address}</option>
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <button onClick={(clickEvent) => submitEmployee(clickEvent, userInput, employeeInput)}>Submit Employee</button>
                </div>
            </fieldset>
        </form>
    )
}

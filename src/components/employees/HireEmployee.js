import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const HireEmployee = () => {

    const navigate = useNavigate()

    const [locations, setLocations] = useState([])
    const [usersLength, setUsersLength] = useState()

    useEffect(() => {
        fetch("http://localhost:8088/locations")
            .then(response => response.json())
            .then(locationsArray => setLocations(locationsArray))
    }, [])

    useEffect(() => {
        fetch("http://localhost:8088/users")
            .then(response => response.json())
            .then(usersArray => setUsersLength(usersArray.length + 1))
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

    const submit = (event, user, employee) => {
        event.preventDefault()

        //post user data
        fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(() => submitEmployee(employee))
    }

    const submitEmployee = (employee) => {

        //post employee data and navigate back to employees
        fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })

            .then(() => navigate("/employees"))
    }

    return (
        <form>
            <fieldset>
                <legend>New Employee:</legend>

                <div className="form-group">
                    <div className="form-label">
                        <label>Full Name: </label>
                    </div>
                    <input type="text" required autoFocus
                        onChange={(e) => {
                            const newUser = { ...userInput }
                            newUser.fullName = e.target.value
                            setUserInput(newUser)
                        }} />
                </div>

                <div className="form-group">
                    <div className="form-label">
                        <label>Email: </label>
                    </div>

                    <input type="text" required
                        onChange={(e) => {
                            const newUser = { ...userInput }
                            newUser.email = e.target.value
                            setUserInput(newUser)
                        }} />
                </div>
                <div className="form-group">
                    <div className="form-label">
                        <label>Start Date: </label>
                    </div>
                    <input type="text" required
                        onChange={(e) => {
                            const newEmployee = { ...employeeInput }
                            newEmployee.startDate = e.target.value
                            newEmployee.userId = usersLength
                            setEmployeeInput(newEmployee)
                        }} />
                </div>
                <div className="form-group">
                    <div className="form-label">
                        <label>Pay Rate: </label>
                    </div>
                    <input type="number" required min={0}
                        onChange={(e) => {
                            const newEmployee = { ...employeeInput }
                            newEmployee.payRate = +e.target.value
                            setEmployeeInput(newEmployee)
                        }} />
                </div>

                <div className="form-group">
                    <div className="form-label">
                        <label>Location: </label>
                    </div>
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
                    <button onClick={(clickEvent) => submit(clickEvent, userInput, employeeInput)}>Submit Employee</button>
                </div>
            </fieldset>
        </form>
    )
}

//clickEvent function argument question: since userInput and userEmployeeInput are already set in state, do they need to be passed into the submit function?

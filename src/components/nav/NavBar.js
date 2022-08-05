import { CustomerNavBar } from "./CustomerNavBar"
import { EmployeeNavBar } from "./EmployeeNavBar"

export const NavBar = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        //return staff nav
        return <EmployeeNavBar />
    }

    else {
        //return customer nav
        return <CustomerNavBar />
    }

}

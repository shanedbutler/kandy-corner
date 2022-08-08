import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeList } from "../employees/EmployeeList"
import { HireEmployee } from "../employees/HireEmployee"
import { LocationList } from "../locations/LocationList"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList"


export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Candy Corner Sweets Shop</h1>
					<div className="subheading">Your wholesale sweet tooth soothers for almost 35 years</div>
			
					<Outlet />
				</>
			}>
				<Route path="/locations" element={<LocationList />} />
				<Route path="/products" element={<ProductList />} />
				<Route path="/product/create" element={<ProductForm />} />
				<Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/hire" element={<HireEmployee />} />
				<Route path="/customers" element={<CustomerList />} />
			</Route>

		</Routes>
	)
}

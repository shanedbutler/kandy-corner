import { Outlet, Route, Routes } from "react-router-dom"
import { ProductFind } from "../../find/ProductFind"
import { LocationList } from "../locations/LocationList"
import { ProductList } from "../products/ProductList"


export const CustomerViews = () => {
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
                <Route path="/find-candy" element={<ProductFind />} />
			</Route>

		</Routes>
	)
}

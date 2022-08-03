import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"


export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Corner Sweets Shop</h1>
					<div>Your sweet tooth soothers for over 35 years</div>

					<Outlet />
				</>
			}>
				<Route path="locations" element={<LocationList />} />
			</Route>

		</Routes>
	)
}


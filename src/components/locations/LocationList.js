import { useEffect, useState } from "react"
import "./LocationList.css"

export const LocationList = () => {

    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetch("http://localhost:8088/locations")
            .then(response => response.json())
            .then(locationArray => setLocations(locationArray))
    }, [])

    return (
        <article className="locations">
            {
                locations.map(location => {
                    return (
                        <section className="location__card" key={location.id}>
                            <div>Location: #{location.id}</div>
                            <div>Address: {location.address}</div>
                            <div>Size: {location.squareFootage} square feet</div>
                        </section>
                    )
                })
            }
        </article>
    )

}
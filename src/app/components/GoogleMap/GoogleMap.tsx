import { SubmitData } from "@/app/types/Types";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"

const mapStyles = {
    width: '100%',
    height: '500px',
    position: 'absolute'
};

const GoogleMap = ({ posts = [] }: { posts: SubmitData[] }) => {

    return (
        //The <Map></Map> need the following props
        //initialCenter={} will be the center on the Map
        <div className="map-wrapper">
            <Map
            google={window.google}
            zoom={12}
            style={mapStyles}
            initialCenter={
                {
                    lat: 51.499670, 
                    lng: -0.137480
                }
            }
        >
            {/* //The Maker Component have a prop positio={} 
           //in which you decide the position of it */}
           {posts.length && posts.map((post) => {
            console.log('lat', post)
            return (<Marker key={post._id}
            position={
                {
                    lat: post.coordinates.lat, 
                    lng: post.coordinates.lon
                }
            }
         />)
           })}
        </Map>
        </div>
    )
}


//Here we use GoogleApiWrapper() that we import of the package
export default GoogleApiWrapper({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
})(GoogleMap);
import { useEffect, useState } from "react";
import * as Location from 'expo-location'
import { useUserContext } from "./UseUserContext";


export const postcodeConverter = () => {
    const {user} = useUserContext()
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)


    const getGeo = async (postcode) => {
        try {
            const res = await Location.geocodeAsync(postcode)
            setLat(res[0].latitude)
            setLong(res[0].longitude)
        } catch (error) {
            (err) => console.log(err)
        }
    }
    
            
      
        


    

        return { getGeo, lat, long }  
    
    
    
}


//AIzaSyAeJOw38T5PsOuoaG-dUURNV7-twDI8tuw
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

'use client'

import { useState, useCallback, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// Make sure to set your Google Maps API key in your environment variables
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

if (!GOOGLE_MAPS_API_KEY) {
  console.error('Google Maps API key is missing. Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.')
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
}

export default function AddressSearchMap() {
  const [address, setAddress] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const autocompleteService = useRef(null)
  const placesService = useRef(null)

  const handleInputChange = (e) => {
    const value = e.target.value
    setAddress(value)

    if (value.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions)
          }
        }
      )
    } else {
      setSuggestions([])
    }
  }

  const handleSelectAddress = (placeId) => {
    if (placesService.current) {
      placesService.current.getDetails(
        { placeId: placeId },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setSelectedLocation({
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            })
            setAddress(place.formatted_address)
            setSuggestions([])
          }
        }
      )
    }
  }

  const onMapLoad = useCallback((map) => {
    autocompleteService.current = new google.maps.places.AutocompleteService()
    placesService.current = new google.maps.places.PlacesService(map)
  }, [])

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Address Search and Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter an address"
                value={address}
                onChange={handleInputChange}
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectAddress(suggestion.place_id)}
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {selectedLocation && (
              <div className="space-y-2">
                <p><strong>Selected Address:</strong> {selectedLocation.address}</p>
                <p><strong>Latitude:</strong> {selectedLocation.lat}</p>
                <p><strong>Longitude:</strong> {selectedLocation.lng}</p>
              </div>
            )}
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={selectedLocation || defaultCenter}
              zoom={selectedLocation ? 15 : 10}
              onLoad={onMapLoad}
            >
              {selectedLocation && (
                <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
              )}
            </GoogleMap>
          </div>
        </CardContent>
      </Card>
    </LoadScript>
  )
}


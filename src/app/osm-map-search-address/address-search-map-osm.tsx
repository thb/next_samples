'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: '/placeholder.svg?height=41&width=25',
  iconRetinaUrl: '/placeholder.svg?height=41&width=25',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

function MapUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 15)
  }, [center, map])
  return null
}

export default function AddressSearchMapOSM() {
  const [address, setAddress] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const timeoutRef = useRef(null)

  const handleInputChange = (e) => {
    const value = e.target.value
    setAddress(value)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (value.length > 2) {
      timeoutRef.current = setTimeout(() => {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`)
          .then(response => response.json())
          .then(data => {
            setSuggestions(data)
          })
          .catch(error => console.error('Error fetching suggestions:', error))
      }, 300)
    } else {
      setSuggestions([])
    }
  }

  const handleSelectAddress = (location) => {
    setSelectedLocation({
      address: location.display_name,
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon)
    })
    setAddress(location.display_name)
    setSuggestions([])
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Address Search and Map (OpenStreetMap)</CardTitle>
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
                    onClick={() => handleSelectAddress(suggestion)}
                  >
                    {suggestion.display_name}
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
          <div style={{ height: '400px', width: '100%' }}>
            <MapContainer
              center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [51.505, -0.09]}
              zoom={selectedLocation ? 15 : 5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {selectedLocation && (
                <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
              )}
              <MapUpdater center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [51.505, -0.09]} />
            </MapContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


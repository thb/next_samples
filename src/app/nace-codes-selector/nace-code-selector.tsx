'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import naceCodes from './nace-codes'

export default function NaceCodeSelector() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<typeof naceCodes>([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setIsOpen(true)

    const filteredSuggestions = naceCodes.filter(
      (code) =>
        code.code.toLowerCase().includes(value.toLowerCase()) ||
        code.description.toLowerCase().includes(value.toLowerCase())
    )

    setSuggestions(filteredSuggestions)
  }

  const handleSelectNaceCode = (code: string, description: string) => {
    setInputValue(`${code} - ${description}`)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        type="text"
        placeholder="Search NACE code"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {suggestions.map((naceCode) => (
            <li
              key={naceCode.code}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSelectNaceCode(naceCode.code, naceCode.description)}
            >
              <span className="font-medium">{naceCode.code}</span> - {naceCode.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


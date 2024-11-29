import NaceCodeSelector from './nace-code-selector'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">NACE Code Selector</h1>
        <NaceCodeSelector />
      </div>
    </div>
  )
}


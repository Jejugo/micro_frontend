import React from 'react'
import MarketingApp from './components/MarketingApp'

export default function App() {
  // fetch on start
  React.useEffect(() => {
    console.log(process.env.PRODUCTION_DOMAIN)
  })
  return (
    <>
      <h1>Hey there!!!!!</h1>
      <hr></hr>
      <MarketingApp></MarketingApp>
    </>
  )
}

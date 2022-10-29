import axios from "axios"
import { useState } from "react"

export const Display = () => {
  const [ data, setData ] = useState( [] )
  axios.get( 'http://localhost:4200/items')
    .then(( response ) => {
    setData( response.data )
    })

  return (
    <div>
      {
        data.map(( item: { name: string } ) => {
          return (
            <div>
              <span>{ item.name }</span>
            </div>
          )
        })
      }
    </div>
  )
}
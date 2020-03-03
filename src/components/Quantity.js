import React, { useContext } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const Quantity = props => {
  const { product } = props

  const firebase = useContext(FirebaseContext)

  const decreaseHandler = () => {
    let count = +product.quantity

    if (count === 0) return

    count -= 1

    firebase
      .updateQuanity({
        ...product,
        quantity: count,
      })
      .catch(() => {
        alert('что-то пошло не так...')
      })
  }

  const increaseHandler = () => {
    let count = +product.quantity

    count += 1

    firebase
      .updateQuanity({
        ...product,
        quantity: count,
      })
      .catch(() => {
        alert('что-то пошло не так...')
      })
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-info btn-sm"
        onClick={() => decreaseHandler()}
      >
        -
      </button>
      {product.quantity}
      <button
        type="button"
        className="btn btn-outline-info btn-sm"
        onClick={() => increaseHandler()}
      >
        +
      </button>
    </div>
  )
}

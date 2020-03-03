import React, { Fragment, useContext, useEffect } from 'react'
import { Form } from '../components/Form'
import { ProductsList } from '../components/ProductsList'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { Loader } from '../components/Loader'

export const Home = () => {
  const {
    loading,
    notes,
    fetchNotes,
    removeProduct,
    filteredProducts,
  } = useContext(FirebaseContext)

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Form />

      <hr />

      {loading ? (
        <Loader />
      ) : (
        <ProductsList
          products={notes}
          filteredProducts={filteredProducts}
          onRemove={removeProduct}
        />
      )}
    </Fragment>
  )
}

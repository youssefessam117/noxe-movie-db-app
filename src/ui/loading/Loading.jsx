import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";


export default function Loading({loading}) {
  return (
    <>
    <div className=' d-flex justify-content-center align-items-center w-100 vh-100'>
    <BeatLoader
        color={'#fff'}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </>
  )
}

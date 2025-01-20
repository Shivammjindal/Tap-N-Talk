"use client"
import React from 'react'
import { CldUploadButton } from 'next-cloudinary'

function page() {
  return (
    <div>
        <CldUploadButton uploadPreset='ml_default'>
          Hii
        </CldUploadButton>
    </div>
  )
}

export default page
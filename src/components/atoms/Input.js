import React from 'react'
import glam from 'glamorous'

const Input = glam.input({
  borderRadius: 6,
  backgroundColor: `#F6F6F6`,
  height: 40,
  border: 'none',
  padding: '10px 20px',
  fontSize: 14,
  color: '#000',
  '&::placeholder': {
    color: '#9b9b9b',
    // firefox adds a lower opacity to placeholder
    opacity: 1,
  },
})

export default Input

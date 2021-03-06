import React, { useMemo, useEffect } from 'react'
import glam, { Div } from 'glamorous'

import Dropdown from './Dropdown'

const GreyTopped = glam.div({
  paddingTop: 10,
  color: `#c8c8c8`,
})

const getOptionValue = val =>
  val.length > 20 ? `${val.substring(0, 20)}...` : val

const ContractAddressDropdown = ({
  onSelect,
  selectedNotes,
  selectedAddress,
  network,
  contract,
  getDeployedContractObjects,
}) => {
  console.log('CAD')

  const contractObjects = useMemo(
    () => getDeployedContractObjects(contract) || [],
    [contract],
  )

  console.log({
    contractObjects,
    contract,
    selectedNotes,
    selectedAddress,
  })

  const onSelect2 = ({ value }) => {
    const objToSelect = contractObjects.find(
      ({ address, notes }) => value === address || value === notes,
    )
    const { notes, address } = objToSelect
    console.log({ objToSelect })

    onSelect({ notes, address })
  }

  useEffect(
    () => {
      console.log({ contractObjects })
      if (contractObjects.length === 1) {
        const [contObj] = contractObjects
        onSelect2({ value: contObj.notes || contObj.address })
      }
    },
    [contractObjects],
  )

  return (
    <Div
      css={{
        marginTop: 25,
      }}
    >
      {!contractObjects || contractObjects.length === 0 ? (
        <GreyTopped>Not deployed on {network.name}</GreyTopped>
      ) : (
        <Dropdown
          options={contractObjects.map(({ notes, address }) => {
            const value = notes || address
            const label = getOptionValue(value)
            return {
              value,
              label,
            }
          })}
          onChange={onSelect2}
          value={selectedNotes || selectedAddress}
          placeholder="Nothing Selected"
        />
      )}
    </Div>
  )
}

export default ContractAddressDropdown

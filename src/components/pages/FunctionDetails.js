import React, { Component, memo, useState, useEffect, useMemo } from 'react'
import { Form } from 'glamorous'
import { TransactionReceipt } from '../atoms/TransactionReceipt'
import { STATE } from 'react-progress-button'
import {
  FunctionParamList,
  ParamInputDiv,
  ExecuteFunctionButton,
} from '../molecules/FunctionDetailsComponents'
import { getMethodSig } from '../molecules/FunctionsList'
import TextInput from '../atoms/TextInput'
import ResultDiv from '../atoms/ResultDiv'
import { stringify } from '../../util/JSON'
import asyncSetState from '../../util/asyncSetState'

const methodObject = (methods, sig) =>
  methods.find(method => getMethodSig(method) === sig)

const FnDetails = ({
  web3,
  network,
  match: {
    params: { contract: contractName, method: methodSig },
  },
  getContractObject,
  user,
  createContract,
  selectedAddress,
}) => {
  console.log(`FnDetails`)

  const [executeBtnState, setExecuteBtnState] = useState(STATE.NOTHING)
  const [method, setMethod] = useState(null)
  const [inputs, setInputs] = useState(null)
  const [value, setValue] = useState(0)
  const [txResult, setTxResult] = useState(null)
  const [txError, setTxError] = useState(null)
  const [txReceipt, setTxReceipt] = useState(null)
  const [contractAbi, setContractAbi] = useState(null)
  const executeContract = async (user, contract) => {
    const { stateMutability, name: methodName } = method
    console.log(`WHAT INPUTS`, inputs)
    const inputParams = method.inputs.map(({ name, type }, id) => {
      const inputVal = inputs[name || `param-${id}`]
      return type === `bytes32` ? web3.utils.padLeft(inputVal, 64) : inputVal
    })

    if (
      value === 0 &&
      (stateMutability === `view` || stateMutability === `pure`)
    ) {
      console.log(
        `Calling view or pure method \'${methodName}\' with params ${stringify(
          inputParams,
          inputs,
        )}`,
      )
      const result = await contract.methods[methodName](...inputParams).call()
      setTxResult(result)
      setExecuteBtnState(STATE.SUCCESS)
    } else {
      console.log(`Calling`, contract, methodName, `with params`, inputParams)
      console.log(`from`, user, `with`, value)
      // For debugging purposes if you need to examine the call to web3 provider:
      // contract.methods
      //   .mint(...inputParams)
      //   .send({ from: user, value: this.state.value })
      try {
        const transactionReceipt = await contract.methods[methodName](
          ...inputParams,
        )
          .send({ from: user, value })
          .on(`confirmation`, (confirmation, receipt) => {
            if (confirmation == 1) {
              console.log(`Got receipts`, receipt)
              setTxReceipt(receipt)
              setExecuteBtnState(STATE.SUCCESS)
            }
          })
      } catch (e) {
        console.error(e)
        setTxError(e)
        setExecuteBtnState(STATE.ERROR)
      }
    }
  }

  const handleExecute = async e => {
    e.preventDefault()
    setTxResult(null)
    setTxError(null)
    setTxReceipt(null)
    setExecuteBtnState(STATE.LOADING)
    try {
      if (!user) {
        throw new Error(`Please connect a wallet`)
      }

      if (!selectedAddress) {
        setTxError(
          new Error(
            `No contract address selected, contract must be deployed at address.`,
          ),
        )
        setExecuteBtnState(STATE.ERROR)
      }

      const contract = createContract(contractAbi, selectedAddress)
      await executeContract(user, contract)
    } catch (e) {
      setTxError(e)
      setExecuteBtnState(STATE.ERROR)
    }
  }

  const getInputFormatter = inputName => {
    const input = method.inputs.find(({ name }) => name === inputName)
    if (!input) return v => v
    if (!input.type) return v => v
    if (input.type.slice(-2) === `[]`) return v => v.split(`,`)
    return v => v
  }

  const handleChange = e => {
    const { name: inputName, value: rawValue } = e.target
    if (inputName === `Value`) {
      return setValue(rawValue)
    }
    const formatter = getInputFormatter(inputName)
    const value = formatter(rawValue)
    setInputs({ ...inputs, [inputName]: value })
  }

  const updateInputs = () => {
    const { abi } = getContractObject(contractName)
    if (abi) {
      const method = methodObject(abi, methodSig)
      if (method) {
        const inputs = method.inputs.reduce(
          (acc, input, index) => ({
            ...acc,
            [input.name || `param-${index}`]: ``,
          }),
          {},
        )
        setMethod(method)
        setInputs(inputs)
        setValue(0)
        setTxResult(null)
        setTxError(null)
        setTxResult(null)
        setExecuteBtnState(STATE.NOTHING)
        setContractAbi(abi)
      }
    }
  }
  useEffect(updateInputs, [contractName, methodSig])

  if (!network) return <div>Please connect a wallet</div>
  if (!method) return <div>Loading...</div>

  const getInputs = () => {
    if (!inputs || inputs.length === 0) return null
    return method.inputs.map(({ name, type }, index) => {
      const id = name || `param-${index}`
      return (
        <ParamInputDiv key={name || `param-${index}`}>
          <TextInput
            label={name}
            name={id}
            id={id}
            placeholder={type}
            onChange={handleChange}
            value={inputs[name]}
          />
        </ParamInputDiv>
      )
    })
  }

  return (
    <>
      <h2>{method.name}</h2>
      <Form
        css={{
          display: `flex`,
          flexDirection: `column`,
          paddingBottom: 40,
          width: `100%`,
        }}
        onSubmit={handleExecute}
      >
        <FunctionParamList>
          {getInputs()}
          {method.stateMutability === `payable` && (
            <ParamInputDiv key="Value">
              Value To Transfer
              <TextInput
                name="Value"
                id="value"
                placeholder="ETH (wei)"
                onChange={handleChange}
                value={value}
              />
            </ParamInputDiv>
          )}
        </FunctionParamList>
        <ExecuteFunctionButton state={executeBtnState} type="submit">
          Execute
        </ExecuteFunctionButton>
      </Form>
      {txResult && <ResultDiv title="Result">{stringify(txResult)}</ResultDiv>}
      {txError && <ResultDiv title="Error">{txError.toString()}</ResultDiv>}
      {txReceipt && <TransactionReceipt transactionReceipt={txReceipt} />}
    </>
  )
}

export default FnDetails

import abi from './abi'

let web3, contract, contractInstance
let inited = false
const address = process.env.CONTRACT_ADDRESS

/**
 * Init
 */
const init = function () {
  if (inited) return
  if (window.web3) {
    web3 = window.web3
  } else {
    const Web3 = require('web3')
    web3 = new Web3()
  }

  contract = web3.eth.contract(abi)
  contractInstance = contract.at(address)
  console.log(contractInstance, address)
  inited = true
}

export default {
  registerService (comission) {
    init()
    return new Promise((resolve, reject) => {
      contractInstance.createVendor(comission, (error, result) => {
        console.log('result', result)
        if (error) reject(error)
        resolve(result)
      })
    })
  },
  registerAgent () {
    init()
    return new Promise((resolve, reject) => {
      contractInstance.registerAgent((error, result) => {
        console.log('result', result)
        if (error) reject(error)
        resolve(result)
      })
    })
  },
  payments (service) {
    init()
    return new Promise((resolve, reject) => {
      contractInstance.payments(service, 1, (error, result) => {
        console.log('result', result)
        if (error) reject(error)
        resolve(web3.fromWei(result[0].toNumber(), 'ether'))
      })
    })
  }
}

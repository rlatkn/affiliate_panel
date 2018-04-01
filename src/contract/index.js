import _ from 'lodash'
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
  inited = true
}

export default {
  registerService (comission) {
    init()
    return new Promise((resolve, reject) => {
      contractInstance.createVendor(comission, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },
  registerAgent () {
    init()
    return new Promise((resolve, reject) => {
      contractInstance.registerAgent((error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },
  payments (service) {
    init()
    return new Promise((resolve, reject) => {
      contractInstance.payments(service, 1, (error, result) => {
        if (error) reject(error)
        resolve(web3.fromWei(result[0].toNumber(), 'ether'))
      })
    })
  },
  agentPayments (agent) {
    init()
    return new Promise((resolve, reject) => {
      contractInstance.newPayment({ agentId: agent }, { fromBlock: '2034004', toBlock: 'latest' }).get(function (error, result) {
        if (error) reject(error)
        const payments = _.map(result, (d) => {
          return {
            agent: d.args.agentId.toNumber(),
            service: d.args.vendorId.toNumber(),
            amount: web3.fromWei(d.args.amount.toNumber(), 'ether')
          }
        })
        resolve(payments)
      })
    })
  },
  servicePayments (service) {
    init()
    return new Promise((resolve, reject) => {
      contractInstance.newPayment({ vendorId: service }, { fromBlock: '2034004', toBlock: 'latest' }).get(function (error, result) {
        if (error) reject(error)
        const payments = _.map(result, (d) => {
          return {
            agent: d.args.agentId.toNumber(),
            service: d.args.vendorId.toNumber(),
            amount: d.args.amount.toNumber()
          }
        })
        resolve(payments)
      })
    })
  }
}

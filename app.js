App = {
  contracts: {},
  init: async () => {
    console.log("Cargado")
    await App.loadEthereum()
    await App.loadAccount()
    await App.loadContracts()
    await App.render()
  },

  loadEthereum: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    } else {
      console.log("No ethereum browser is installed. try it installing metamask")
    }
  },

  loadAccount: async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    App.account = accounts[0]
    console.log(accounts)
  },

  loadContracts: async () => {
    const res = await fetch("TasksContract.json")
    const tasksContractJSON = await res.json()

    App.contracts.tasksContract = TruffleContract(tasksContractJSON)

    App.contracts.tasksContract.setProvider(App.web3Provider)

    App.tasksContract = await App.contracts.tasksContract.deployed()
  },

  render: () => {
    console.log(App.account)
    document.getElementById("account").innerText = App.account
  },

  createTask: async (title, description) => {
    const result = await App.tasksContract.createTask(title, description, {
      from: App.account
    })
    console.log(result.logs[0].args)
  }
}

App.init()

const { v4: uuidv4, v4 } = require('uuid');
let { clients } = require('../data/clients');

// write your handlers here...
const getClientList = (req, res) => {
    res.status(200).json({ status: 200, data: clients });
  };

  const getClient = (req, res) =>{
      let id = req.params.id;
      let client = clients.filter(c => c.id === id)
      if(client.length > 0){
        res.status(200).json({ status: 200, data: client[0] });
      } else{
        res.status(404).json({ status: 404, data: id });
      }
  }

  const deleteClient = (req, res) =>{
    let id = req.params.id;
    let client = clients.find(c => c.id === id)
    if(client !== undefined){
        clients = clients.filter(c => c.id !== id)
      res.status(200).json({ status: 200, data: {}, message: "client deleted successfully" });
    } else{
      res.status(404).json({ status: 404, data: id, message: `id: ${id} didn't exist to begin with` });
    }
}

  const addClient = (req, res) =>{
      const {name, age, gender, company, email, phone, address} = req.params
      const prospectName = name.split("+").join(" ")
      const prospectAddress = address.split("+").join(" ")
      let client = clients.filter(c => c.email === email)
      if(client.length === 0){
          let newClient = {
              id: v4(),
              isActive: true,
              age: age,
              name: prospectName,
              gender: gender,
              company: company,
              email: email,
              phone: phone,
              address: prospectAddress
          }
          clients.push(newClient)
          res.status(200).json({ status: 200, data: newClient, message: 'client added successfully' });
      } else{
        res.status(400).json({ status: 400, data: {}, message: 'client already in DB' });
      }
  }


  module.exports = {
    getClientList,
    getClient,
    addClient,
    deleteClient
  };
import React, {useState, Fragment} from "react";
import "./App.css"
import data from "./mock-data.json"
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App =() =>{

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    
    fullName:'',
    address:''

  });

  const [editFormData, setEditFormData] = useState({
    
    fullName:'',
    address:''
  })

  const [editContactId, seteditContactId] = useState(null);

  const handleAddFormChange = (event) =>{
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);

  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      
      
      fullName: addFormData.fullName,  
      address: addFormData.address
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address
    }

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    seteditContactId(null);
    
  };

  const handleEditClick = (event, contact)=> {
    event.preventDefault();
    seteditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address
    }

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    seteditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact)=> contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return <div className='app-container'>
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact)=> (
          <Fragment>
            {editContactId === contact.id ? (
              <EditableRow 
              editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              />
            ) : (
              <ReadOnlyRow 
              contact={contact}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              />
            )}
          </Fragment>
        
        ))} 
      </tbody>
    </table>
    </form>

    <h2>Add</h2>
    <form onSubmit={handleAddFormSubmit}>
      
      <input 
      type="text" 
      name="fullName" 
      required="required" 
      placeholder="Name...." 
      onChange= {handleAddFormChange}

      />
      <input 
      type="text" 
      name="address" 
      required="required" 
      placeholder="Level...." 
      onChange= {handleAddFormChange}

      />
      <button type="submit">Add</button>
    </form>
  </div>;
};

export default App;
import { useState, useEffect, useId} from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'



const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [infoMessage, setInfoMessage] = useState(null)
    

    useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])


    const addPerson = (event) => {
        event.preventDefault()
    
        const personObject = {
            name: newName,
            number: newNumber
        }

        const user = persons.find(person => person.name === newName);

        if (user != undefined) {
            const decide = confirm(newName + ` is already added to phonebook, replace the old number with a new one?`);
            if(decide){
              //UPDATE PERSONS PHONE NUMBER
              const person = persons.find(n => n.id === user.id)
              const changedNumber = { ...person, number: newNumber}
            
              personService
                .update(user.id, changedNumber)
                  .then(returnedPerson => {
                  setPersons(persons.map(person => person.id !== user.id ? person : returnedPerson))
                  setInfoMessage(
                    `'${user.name}''s phone number was updated`
                  )
                  setTimeout(() => {
                    setInfoMessage(null)
                  }, 5000)
                })
                .catch(error => {
                  setErrorMessage(
                    `Information of ${user.name}' has already been removed from server or ${error.response.data.error}`
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
                })

            }else{
              //CANCEL
              return;
            }
            

        }else{
          //ADD NEW PERSON
          personService
          .create(personObject)
            .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setInfoMessage(
              `'${returnedPerson.name}' added to the server`
            )
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `${error.response.data.error}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })

        }

    }



    const deletePerson = id => {
      const person = persons.find(n => n.id === id)
    
      personService
        .deleteP(id)
          .then(() => {
            //needed to refresh page to see data removed
          setPersons(persons.filter(person => person.id != id))
        })
        .catch(error => {
          setErrorMessage(
            `'${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification id ="bad" message={errorMessage} />
            <Notification message={infoMessage} />
            <form onSubmit={addPerson}>
                <div>
                    name:
                    <input value={newName}
                        onChange={handleNameChange}/>
                </div>
                <div>
                    number:
                    <input value={newNumber}
                        onChange={handleNumberChange}/>
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
             {
                persons.map(person => 
                <Person 
                    key={person.name}
                    person={person}
                    deletePerson={()=>deletePerson(person.id)}
                    />
                    )
            } 
        </div>
    )
}

export default App

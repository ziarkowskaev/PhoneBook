const Person = ({person, deletePerson}) => {
    return (
        <li style={{marginBottom: '10px' }}>
        {person.name}: {person.number}  
        <button style={{marginLeft: '10px' }}onClick={deletePerson}>Delete</button>
        </li>
    )
}

export default Person
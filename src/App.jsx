import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [name, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState(null)
  const [city, setCity] = useState('')

  const [user, setUser] = useState([])
  const [selectedUsers, setSelectedUsers] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const inputHandler = () => {

    if (name && surname && age && city) {
      
      const newUser = { id: user.length, value: [name, surname, age, city] }

      const updatedUsers = [...user, newUser]
      setUser(updatedUsers)
      localStorage.setItem('user', JSON.stringify(updatedUsers))

      setFirstName('')
      setSurname('')
      setAge('')
      setCity('')
    } else {
      alert('fill in all fields')
    }


  }

  return (
    <div style={{ width: '90vw', justifyContent: 'space-between', display: 'flex', flexDirection: 'column', gap: '20px', margin: '100px auto' }}>

      {/* user inputs */}
      <div style={{ width: '60%', margin: 'auto', display: 'flex', position: 'relative' }}>

        <div style={{ display: "flex", flexDirection: 'column', gap: '2px', width: '100px' }}>

          <input style={{ border: '2px solid black', padding: '7px', borderRadius: '5px' }} value={name} onChange={(e) => (
            setFirstName(e.target.value)
          )} type="text" placeholder='name' />

          <input style={{ border: '2px solid black', padding: '7px', borderRadius: '5px' }} value={surname} onChange={(e) => (
            setSurname(e.target.value)
          )} type="text" placeholder='surname' />

          <input style={{ border: '2px solid black', padding: '7px', borderRadius: '5px' }} value={age} onChange={(e) => (
            setAge(e.target.value)
          )} type="number" placeholder='age' />

          <input style={{ border: '2px solid black', padding: '7px', borderRadius: '5px' }} value={city} onChange={(e) => (
            setCity(e.target.value)
          )} type="text" placeholder='city' />
        </div>

        <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
          <button style={{ backgroundColor: 'purple', color: 'white', padding: '7px 14px', borderRadius: '5px' }} onClick={inputHandler}>Save</button>
        </div>

      </div>
      <div style={{ border: '1px solid black' }}></div>
      {/* user button component */}

      <div style={{ gap: '15px', width: '60%', margin: 'auto', display: 'flex' }} >
        {user.map((itm) => {
          return <User key={itm.id} value={itm.value} onClick={() => setSelectedUsers(itm.value)} />
        })}
      </div>


      {/* user card */}
      <div style={{ width: '60%', margin: 'auto', display: 'flex', justifyContent: 'center' }}>
        {selectedUsers && <UserCard details={selectedUsers} />}
      </div>
    </div>
  )
}

const User = ({ value, onClick }) => {
  if(!value || value === 0){
    return null
  }

  return (
    <div>
      <button style={{ border: '2px solid black', padding: '10px', borderRadius: '5px' }} onClick={onClick}>{value[0]}</button>
    </div>
  )
}

const UserCard = ({ details }) => {
  return (
    <div style={{ border: 'none', padding: '10px', boxShadow: '1px 1px 5px black', width: '200px', backgroundColor: '#befc03', display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <p>{details[0]} {details[1]}</p>
      <p>{details[2]}</p>
      <p>{details[3]}</p>
    </div>
  )
}

export default App

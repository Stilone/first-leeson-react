import React, {useState} from 'react';



const AddTodo = ({ onCreate }) => {
    const [value, setValue] = useState('');

    const submitHandler = (event) => {
        event.preventDefault()

        if(value.trim()) {
          onCreate(value)
          setValue('')
        }
    }

    return (
        <form style={{marginBottom: '15px'}} onSubmit={submitHandler}>
            <input value={value} onChange={event => setValue(event.target.value)}/>
            <button type="submit">Add Todo</button>
        </form>
    )
}

export default AddTodo;
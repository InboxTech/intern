import React from 'react'
import './App.css'
import Todo from './components/Todo'
import List from './components/List'
import {useState} from 'react'

function App() {
  const [listTodo, setListTodo] = useState([]);

  let addList = (inputText) => {
    if(inputText !== '')
      setListTodo([...listTodo, inputText])
  }

  const deleteListItem = (key) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  }

  return (
    <div className='main-container'>
      <div className='center-container'>
       <Todo addList={addList}/>
       <h1 className='app-heading'>TODO</h1>
       <hr />
       {listTodo.map((listItem, i) => {
        return (
          <List key={i} index={i} item={listItem} deleteItem = {deleteListItem} />
        )
       })}
      </div>
    </div>
  )
}

export default App
import React, { useState } from 'react'
import "./App.css"
import TodoInput from './components/TodoInput'
import Todolist from './components/Todolist';

function App() {
  const [listTodo,setListTodo]=useState([]);
  const [favtList, setFavtList] = useState([]);

  const addList = (inputText)=>{
    if(inputText!=='') {
      const newTodo= {
        id: Date.now(),
        text: inputText,
        isFavt: false
      }
      setListTodo([...listTodo,newTodo]);
    }

  };

  const deleteListItem = (id)=>{
    const newListTodo = listTodo.filter(todo => todo.id !== id);
    setListTodo([...newListTodo])
  };

  const deleteFavtItem = (id) => {
    const newFavtList = favtList.filter(todo => todo.id !== id);
    setFavtList(newFavtList);
  };

  const favtListItem = (id) => {
    const todoItem = listTodo.find(todo => todo.id === id);
    if (todoItem) {
      setFavtList([...favtList, todoItem]);
      setListTodo(listTodo.filter(todo => todo.id !== id)); // Remove from regular list
    }
  };

  const unFavoriteItem = (id) => {
    const todoItem = favtList.find(todo => todo.id === id);
    if (todoItem) {
      setListTodo([...listTodo, todoItem]); // Add back to todo list
      setFavtList(favtList.filter(todo => todo.id !== id)); // Remove from favorites
    }
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList}/>
        <h1 className="app-heading">Your tasks</h1>
        <hr/>
        <ul>
        {listTodo.map((listItem, idx)=>{
          return (
            <Todolist 
            key={listItem.id} 
            id={listItem.id} 
            item={listItem.text} 
            deleteItem={deleteListItem}
            isFavt={listItem.isFavt}
            favtItem={favtListItem}
            index={idx + 1}
            />
          )})}
        </ul>
      </div>


      <div className="favt-container">
       {favtList.length > 0 && (
          <>
            <h1 className="app-heading">Favorite tasks</h1>
            <hr />
            <ul>
              {favtList.map((listItem) => (
                <Todolist
                  key={listItem.id}
                  id={listItem.id}
                  item={listItem.text}
                  deleteItem={deleteFavtItem} 
                  isFavorite={true}
                  unFavoriteItem={unFavoriteItem}
                />
              ))}
            </ul>
          </>
       )}
      </div>
    </div>
  )
}

export default App
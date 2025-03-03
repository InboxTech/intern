import React from 'react'

function Todolist(props) {
  return (
    <>
    <li className="list-item">
    <span className="todo-id">{props.index}</span> 
    <span className="todo-text">{props.item}</span> 
        <span className='icons'>
        <i className="fa-solid fa-trash-can icon-delete" 
        onClick={e=>{
            props.deleteItem(props.id)
        }}></i>

{!props.isFavorite && (
  <span className="favticon">
            <i className="fa-solid fa-star icon-favorite"
              onClick={() => props.favtItem(props.id)}>
            </i></span>
          )}

{props.isFavorite && (
            <span className="unfavticon">
              <i className="fa-solid fa-star icon-unfavorite"
                onClick={() => props.unFavoriteItem(props.id)}>
              </i>
            </span>
          )}

        </span>
    </li>
    
    </>
  );
}

export default Todolist
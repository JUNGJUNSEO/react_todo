import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, categories } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {

  const toDos = useRecoilValue(toDoSelector);
  const categoryList = useRecoilValue(categories)
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any)
  }

  


  return (
    <div>
      <h1>To Dos</h1>
      <CreateCategory/>
      <hr/>
      <select value={category} onInput={onInput}>
        {categoryList.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <CreateToDo/>
      
      {toDos?.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}
    </div>
  );
}
export default ToDoList;
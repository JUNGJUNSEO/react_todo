import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categories)
  const onClickChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)
        const newToDo = { text, id, category : name as any};
        const newToDos = [
            ...oldToDos.slice(0,  targetIndex),
            newToDo,
            ...oldToDos.slice(targetIndex+1),
        ]
        localStorage.setItem("toDo", JSON.stringify(newToDos))
        return newToDos;
    });
  };
  const onClickDelete = () => {

    setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)
        const newToDos = [
            ...oldToDos.slice(0, targetIndex),
            ...oldToDos.slice(targetIndex+1),
        ];
        localStorage.setItem("toDo", JSON.stringify(newToDos))
        return newToDos
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categoryList.map((element) => (
        category !== element && (
          <button key={element} name={element} onClick={onClickChange}>
            {element}
          </button>
        )
      ))}
      <button onClick={onClickDelete}> 
        delete
      </button>
    </li>
  );
}

export default ToDo;
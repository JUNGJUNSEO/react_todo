import { atom, selector } from "recoil";


let storageCategory = JSON.parse(localStorage.getItem("Categories")+"");
if (storageCategory === null) {
  storageCategory = ["TO_DO", "DOING", "DONE"]
}
export const categories = atom<string[]>({
  key: "cat",
  default: storageCategory
})

export interface IToDo {
    text: string;
    id: number;
    category: string;
  }
  
export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
})

let storageTodo = JSON.parse(localStorage.getItem("toDo")+"");
if (storageTodo === null) {
  storageTodo = []
}
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: storageTodo,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category)
  },
})
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categories} from "../atoms";

interface IForm {
    category: string;
}

function CreateCategory() {
  const setCategory = useSetRecoilState(categories);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategory((oldCategories) => [
      ...oldCategories, category
    ]);
    
    setValue("category", "");
  };

  const newcategories = useRecoilValue(categories)
  localStorage.setItem("Categories", JSON.stringify(newcategories))
  
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "Please write a To Do",
        })}
        placeholder="Write a category"
      />
      <button> ADD NEW CATEGORY </button>
    </form>
  );
}

export default CreateCategory;
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const SortMenu = () => {
  const dispatch = useDispatch();

  const changeSelect = (event) => {
    dispatch(filterChange(event.target.value));
  };

  return (
    <div>
      Sort blogs by:&nbsp;
      <select name="sort" id="sort" onChange={changeSelect}>
        <option value="likes">likes</option>
        <option value="title">title</option>
        <option value="author">author</option>
      </select>
    </div>
  );
};

export default SortMenu;

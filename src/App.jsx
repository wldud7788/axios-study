import { useEffect, useState } from "react";
import "./App.css";
import api from "./axios/api";

function App() {
  // 모든 todo들
  const [todos, setTodos] = useState(null);
  // 인풋에서 입력한 todo
  const [todo, setTodo] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [editTodo, setEditTodo] = useState({
    title: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api("/todos");
        setTodos(data);
      } catch (error) {
        console.error("페칭오류", error);
      }
    };
    fetchPost();
  }, []);
  const onSubmitHandler = async (todo) => {
    const { data } = await api.post("/todos", todo);
    setTodos([...todos, data]);
  };
  const onDeleteHandler = async (id) => {
    await api.delete("/todos/" + id);
    const deletedTodos = todos.filter((item) => item.id !== id);
    setTodos(deletedTodos);
  };
  const onEditHandler = async (targetId, editTodo) => {
    await api.patch(`/todos/${targetId}`, editTodo);
    const updateTodos = todos.map((item) =>
      item.id === targetId ? { ...item, title: editTodo.title } : item
    );
    setTodos(updateTodos);
  };
  return (
    <div>
      <h3>xptmxm </h3>
      <form
        onSubmit={(e) => {
          // submit은 기본적으로 새로고침을 default로 가지고 있기 때문에
          // 새로고침 막아줘야함
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="수정하고싶은 Todo Id 입력"
            onChange={(e) => {
              setTargetId(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정할 내용을 넣어주세요"
            onChange={(e) => {
              setEditTodo({ ...editTodo, title: e.target.value });
            }}
          />
          <button
            type="button"
            onClick={() => onEditHandler(targetId, editTodo)}
          >
            수정하기
          </button>
        </div>
        <input
          type="text"
          onChange={(e) => {
            setTodo({ ...todo, title: e.target.value });
          }}
        />
        <button type="submit">추가하기</button>
      </form>
      {todos?.map((item) => {
        return (
          <div key={item.id}>
            <span>{item.title}</span>
            <button onClick={() => onDeleteHandler(item.id)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

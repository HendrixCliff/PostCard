import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import Post from "./postCard";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [wrongAction, setWrongAction] = useState("");

  let baseURL = "https://jsonplaceholder.typicode.com/posts?limit=5";

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setWrongAction(error);
      });
  }, []);

  function handleDelete(id) {
    const synchronize = posts.filter(post => post.id !== id);
    setPosts(synchronize);
  }

  return (
    <div className="App">
      {posts.map((post) => (
        <Post key={post.id} post={post} onExpunge={handleDelete} />
      ))}
    </div>
  );
}

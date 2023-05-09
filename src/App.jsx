import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("user added successfully");
          form.reset();
        }
      });
  };

  return (
    <>
      <h1>Simple CRUD</h1>
      <form
        style={{
          border: "2px solid gray",
          padding: "60px 80px",
          borderRadius: "10px",
        }}
        onSubmit={handleAddUser}
      >
        <h2>Add a New User</h2>
        <input type="text" name="name" placeholder="Your Name" />
        <br />
        <input type="email" name="email" placeholder="Your Email" />
        <br />
        <input className="btn" type="submit" value="Add User" />
      </form>
      <Link to="/users">
        <button className="btn">See Users</button>
      </Link>
    </>
  );
}

export default App;

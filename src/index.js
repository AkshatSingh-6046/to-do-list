import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [temp, setTemp] = useState("");
  const [date, setDate] = useState("");
  const [date1, setdate1] = useState("");
  const [date2, setdate2] = useState("");

  const [category, setCategory] = useState("Home");
  const [todos, setTodos] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [searchBC, setSearchBC] = useState("");
  
  useEffect(() => {
    const t = JSON.parse(localStorage.getItem('todos'));
    if (t) {
     setTodos(t);
    }
  }, [])

  useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
  },[todos]);

  
  const addTodo = () => {
    const id = uuid();
    setTodos([...todos,{ id: id, text: todo, date: date, category: category, status: false }]); // adding todo to list todos
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const markDone = (id) => {
    setTodos(
      todos.map((t) => {
        if (id === t.id) t.status = !t.status;
        console.log(t);
        return t;
      })
    );
  };

  //  const search = (e) => {
  //     const value = e;
  //     setTodos(todos.filter(todo => {
  //       return todo.text.includes(value);
  //     }))
  //    console.log(todos)
  // }

  return (
    <div 
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className="text-dark m-2" >To-Do List</h1>
      <div className="border border-dark px-5 pb-5 pt-3 rounded " style={{ display: "flex", background:"#9ac7ceba", flexDirection: "column", alignItems: "center" }}
   ><div>Enter Details : </div><br/>
      <div style={{  display: "flex",gap:"5%" ,width:"100%" ,justifyContent:"center"}}>
        <input className="rounded-pill px-3"
          placeholder="Enter Task"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
            setTemp(todos);
          }}
          type="text"
        />
        <input className="rounded-pill"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />

        <select className="rounded-pill "
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Work">Work</option>
          <option value="School">School</option>
        </select>
      </div>
      </div>
      <br/>
      <div >< button style={{ display: "flex", borderRadius:"10%" }}className="border border-2 bg-primary px-4 py-1 btn-dark "type="submit" onClick={addTodo}>
        {" "}
        ADD{" "}
      </button>
      
      </div>
      <br />
      <input className="rounded-pill px-4 py-2 col-4" placeholder="Search Here"
        value={searchtext}
        onChange={(e) => {
          setSearchtext(e.target.value);
        }}
        type="text"
      />
     
      <br />
      <input className="rounded-pill px-4 py-2 col-4" placeholder="Search by Category"
        value={searchBC}
        onChange={(e) => {
          setSearchBC(e.target.value);
        }}
        type="text"
      />
      <br/>
      <div>
      <div>Filter by Date</div>
      <div>FROM DATE : 
        <input className="rounded-pill px-1 mx-1 " value={date1} type="date" onChange={(e)=>{setdate1(e.target.value)}}/>
        <span>TILL</span><input  className="rounded-pill px-1 " value={date2} type="date" onChange={(e)=>{setdate2(e.target.value)}}/>
        </div>
      </div>
      <br />
      <div className="todos">
        <ol style={{width:"90vw"}} >
        <li className="bg-dark p-3 my-1 rounded-pill d-flex justify-content-between text-warning">
          <div>Status</div>
          <div>Description</div>
          <div>Date</div>
          <div>Category</div>
          <div>Delete</div>
        </li>
        
          {todos
            .filter((post) => {
              // first using filter to preseve original todo list contents then renderring using map
              if (searchtext === "") {
                return post;
              } else if (post.text.toLowerCase().includes(searchtext)) {
                return post;
              }
            })
            .filter((post) => {
              // first using filter to preseve original todo list contents then renderring using map
              if (searchBC === "") {
                return post;
              } else if (post.category.toLowerCase().includes(searchBC)) {
                return post;
              }
            }).filter((post) => {
              // first using filter to preseve original todo list contents then renderring using map
              if (date1 !== "" && date2!=="") {
                return (post.date>=date1&&post.date<=date2);
              } else return post;
              
            })
            .map((todo) => {
              
              {return (
                
                <li key={todo.id} className="bg-dark p-3 my-1 text-light rounded-pill d-flex  align-items-center justify-content-between">
                  
                  <div>&nbsp;&nbsp;<input
                    type="checkbox"
                    onChange={() => {
                      markDone(todo.id);
                    }}
                  />
                  </div>
                 <div> {todo.status === true ? (
                    <s className="text-success"> {" " + todo.text + " "} </s>
                  ) : (
                    todo.text
                  )}
                  </div>
                  <div>{todo.date + " "}</div>
                  <div>{todo.category + " "}</div>
                  <button className="btn btn-danger rounded-circle" onClick={() => deleteTodo(todo.id)}> - </button>
                </li>
              );
            }
    
            })}
        </ol>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root")); // ReactDom.render injecting first argument into second argument

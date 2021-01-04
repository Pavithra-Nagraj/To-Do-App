import React, { useState, useEffect } from 'react';
import './Todo.css';


function Task({ task, index, completeTask, removeTask }) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title} 
           
           <div className="prority"> {task.priority}</div>

            <button className="cross" onClick={() => removeTask(index)}>x</button>
            <button  className="btn" onClick={() => completeTask(index)}>Complete</button>

        </div>
    );
}

function CreateTask({ addTask, addCategory }) {
    const [value, setValue] = useState("");
    const [category, setCategory] =useState("High");
    

    const AddTask = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value,category );
       
        setValue("");
        setCategory(category)   
    }
    
    

    return (
        <div className="todo">
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
            <select
            className="select"
            name="category" value={category}
             onChange={e => setCategory(e.target.value)}>
            <option id="0" >High</option>
            <option id="1" >Medium</option>
            <option id="2" >Low</option>
        </select>
           
        <button className="add-btn" onClick={AddTask}>
        ADD
      </button>

                   </div>
    );
}

function Todo() {
    var ind= ['High','Medium','Low'];
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Plan projects",
            priority: "High",
            completed: false
        },
        {
            title: "Assign tasks",
            priority: "Medium",
            completed: false
        },
        {
            title: "Track project timeline",
            priority: "Low",
            completed: false
        }
    ]);

    useEffect(() => {
         setTasksRemaining(tasks.filter(task => !task.completed).length) 
        },[]);


    const addTask = (title,priority) => {
        const newTasks = [...tasks, { title, priority, completed: false }];
        setTasks(newTasks);
    };

        const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const sortByPriority = () =>{
              var sorted = tasks.sort((a,b) => { 
           return ind.indexOf(a.priority) - ind.indexOf(b.priority)
               })
       console.log(sorted)
       setTasks(sorted)
     

    }
    return (
        <div className="todo-container">
            <div className="header">Pending tasks ({tasksRemaining})</div>
            <div>
            <button className="sort" onClick={() => sortByPriority()}>Sort based on Priority</button></div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                     sorted={sortByPriority}
                    key={index}
                    />
                ))}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}

export default Todo;
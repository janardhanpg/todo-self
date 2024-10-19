import "./App.css";
import { useState } from "react";
// import { DatePicker } from "antd";
import AddTask from "./components/AddTask";
import { Divider, List, Typography,Button } from "antd";

interface TaskList {
  taskName: string;
  completed: boolean;
}

function App() {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const handleDelete =(index:number)=>{
    setTaskLists((prevTask)=>prevTask.filter((_,i)=>i!=index))
  }
  const onAddTask = (taskName: string) => {
    setTaskLists((prevTaskLists) => [
      ...prevTaskLists,
      { taskName, completed: false },
    ]);
    console.log("Task added", taskName);
  };
  return (
    <>
      <AddTask onAddTask={onAddTask}></AddTask>

      <Divider orientation="center">To Do Tasks</Divider>
      <List
        size="large"
        bordered
        dataSource={taskLists}
        renderItem={(item,index) => (
          <List.Item style={{display: "flex", justifyContent:"center",alignItems:"center"}}> 
            <Typography.Text>{item.taskName}</Typography.Text>
            {" - "}
            <Typography.Text type={item.completed ? "success" : "danger"}>
              {item.completed ? "Completed" : "Pending"}
            </Typography.Text>
            <Button danger onClick={()=>handleDelete(index)}>Delete</Button>
          </List.Item>
        )}
      />
    </>
  );
}

export default App;

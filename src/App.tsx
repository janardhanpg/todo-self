import "./App.css";
import { useState } from "react";
import AddTask from "./components/AddTask";
import { Divider, List, Typography, Button } from "antd";

interface TaskList {
  taskName: string;
  completed: boolean;
}

function App() {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
 
  const handleComplete = (index: number) => {
    setTaskLists((prevTask) =>
      prevTask.map((task, i) =>
        i === index ? { ...task, completed: true } : task
      )
    );
  };

  
  const handleDelete = (index: number) => {
    setTaskLists((prevTask) => prevTask.filter((_, i) => i != index));
  };
  const onAddTask = (taskName: string) => {
    setTaskLists((prevTaskLists) => [
      ...prevTaskLists,
      { taskName, completed: false },
    ]);
  };
  return (
    <>
      <AddTask onAddTask={onAddTask}></AddTask>

      <Divider orientation="center">To Do Tasks</Divider>
      <List
        size="large"
        bordered
        dataSource={taskLists}
        renderItem={(item, index) => (
          <List.Item>
            <div>
              <Typography.Text>{item.taskName}</Typography.Text>
              {" - "}
              <Typography.Text type={item.completed ? "success" : "danger"}>
                {item.completed ? "Completed" : "Pending"}
              </Typography.Text>
            </div>
            <div>
            <Button  onClick={() => handleComplete(index)}>
              Complete 
            </Button>
            <Button danger onClick={() => handleDelete(index)}>
              Delete
            </Button>
            </div>
          </List.Item>
        )}
      />
    </>
  );
}

export default App;

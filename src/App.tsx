import "./App.css";
import { useState } from "react";
import AddTask from "./components/AddTask";
import DisplayList from "./components/DisplayList";
import {
  useToast,
  useColorMode,
  Button,
  Divider,
  Heading,
} from "@chakra-ui/react";

interface TaskList {
  id: number;
  taskName: string;
  completed: boolean;
}

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const toast = useToast();

  const onAddTask = (taskName: string) => {
    setTaskLists((prevTaskLists) => [
      ...prevTaskLists,
      { id: Date.now(), taskName, completed: false },
    ]);
  };

  const handleComplete = (id: number) => {
    const updatedTasks = taskLists.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    const task = taskLists.find((t) => t.id === id);

    if (task) {
      setTaskLists(updatedTasks);
      toast({
        title: task.completed ? "Marked Incomplete" : "Marked Complete",
        description: task.taskName,
        status: "info",
        duration: 800,
        isClosable: true,
      });
    }
  };

  const handleDelete = (id: number) => {
    const task = taskLists.find((t) => t.id === id);
    if (task) {
      setTaskLists((prevTask) => prevTask.filter((task) => task.id !== id));
      toast({
        title: "Task deleted",
        description: task.taskName,
        status: "warning",
        duration: 800,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
      <AddTask onAddTask={onAddTask}></AddTask>

      {taskLists.some((t) => !t.completed) && (
        <div>
          <Heading
            as="h2"
            size={"md"}
            textAlign={"center"}
            marginTop={4}
            marginBottom={2}
          >
            Pending Tasks...
          </Heading>
          <Divider orientation="horizontal" />
        </div>
      )}

      <DisplayList
        taskLists={taskLists.filter((t) => !t.completed)}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
        isEnabled={false}
      ></DisplayList>

      {taskLists.some((t) => t.completed) && (
        <div>
          <Heading
            as="h2"
            size={"md"}
            textAlign={"center"}
            marginTop={4}
            marginBottom={2}
          >
            Completed Tasks...
          </Heading>
          <Divider orientation="horizontal" />
        </div>
      )}

      <DisplayList
        taskLists={taskLists.filter((t) => t.completed)}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
        isEnabled={true}
      ></DisplayList>
    </>
  );
}

export default App;

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
  Heading,
  Button,
  Input,
  Container,
  Tooltip,
} from "@chakra-ui/react";
import { MdSave } from "react-icons/md";
const exTasks = [
  "Do my laundry",
  "Cancel milk delivery ",
  "Clean fridge",
  "Check passport",
  "Do web check-in",
  "Download a movie for the flight",
  "Recharge mobile",
  "Pack swimsuit",
];

interface AddTaskProps {
  onAddTask: (taskName: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const toast = useToast();
  const [taskName, setTaskName] = useState("");
  const randomIndex = Math.floor(Math.random() * exTasks.length);

  const handleSubmit = () => {
    if (taskName.trim() === "") {
      return;
    }
    onAddTask(taskName);

    toast({
      title: "Task added",
      description: taskName,
      status: "success",
      duration: 800,
      isClosable: true,
    });
    setTaskName("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px",
      }}
    >
      <Heading
        as={"h2"}
        size={"xl"}
        textAlign={"center"}
        marginTop={4}
        marginBottom={2}
      >
        Add Tasks Here....
      </Heading>

      <FormControl isRequired>
        <Container maxW={"md"}>
          <FormLabel>Task Name</FormLabel>
          <Input
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
          />
          <FormHelperText>e.g {exTasks[randomIndex]}</FormHelperText>
          <Tooltip label="Add Task">
            <Button
              rightIcon={<MdSave />}
              colorScheme="blue"
              type="submit"
              marginTop={3}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Tooltip>
        </Container>
      </FormControl>
    </div>
  );
};

export default AddTask;

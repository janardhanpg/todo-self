import React from "react";
import { List, ListItem, Button, Wrap, Flex,Container } from "@chakra-ui/react";

interface Task {
    id:number;
  taskName: string;
  completed: boolean;
}
interface DisplayListProps {
  taskLists: Task[];
  isEnabled: boolean;
  handleComplete: (index: number) => void;
  handleDelete: (index: number) => void;
}

const DisplayList: React.FC<DisplayListProps> = ({
  taskLists,
  isEnabled,
  handleComplete,
  handleDelete,
}) => {
  const filteredTasks = taskLists.filter((task) =>
    isEnabled ? task.completed : !task.completed
  );

  return (
    <Container maxW='container.sm'>
    <List spacing={3}>
      {filteredTasks.map((task) => (
          <ListItem key={task.id}>
          <Flex justifyContent="space-between" alignItems="center">
            <span>{task.taskName}</span>
            <Wrap spacing={4}>
              <Button onClick={() => handleComplete(task.id)}>
                {task.completed ? "Not Completed" : "Completed"}
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </Wrap>
          </Flex>
        </ListItem>
      ))}
    </List>
      </Container>
  );
};

export default DisplayList;

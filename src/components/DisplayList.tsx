import React from "react";
import {
  List,
  ListItem,
  Button,
  Wrap,
  Flex,
  Container,
  Tooltip,
} from "@chakra-ui/react";
import { MdDelete, MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface Task {
  id: number;
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
    <Container maxW="container.sm">
      <List spacing={3}>
        {filteredTasks.map((task) => (
          <ListItem key={task.id}>
            <Flex justifyContent="space-between" alignItems="center">
              <span>{task.taskName}</span>
              <Wrap spacing={4}>
                <Tooltip
                  label={task.completed ? "Mark Inomplete" : "Mark Complete"}
                  aria-label="Toggle Task Completion"
                >
                  <Button
                    leftIcon={
                      task.completed ? <MdOutlineAccessTimeFilled /> : <FaCheck />
                    }
                    onClick={() => handleComplete(task.id)}
                  >
                    {/* {task.completed ? "Not Completed" : "Completed"} */}
                  </Button>
                </Tooltip>
                <Tooltip label="Delete Task" aria-label="Delete Task">
                  <Button
                    leftIcon={<MdDelete />}
                    colorScheme="red"
                    onClick={() => handleDelete(task.id)}
                  ></Button>
                </Tooltip>
              </Wrap>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DisplayList;

import React, { useState } from "react";
import { Form, Input, Typography,Button } from "antd";
import { useToast } from "@chakra-ui/react";

const { Title } = Typography;

interface FieldType {
  taskName?: string;
}

interface AddTaskProps {
  onAddTask: (taskName: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const toast = useToast();
  const [taskName, setTaskName] = useState("");

  const handleSubmit = () => {
    if (taskName.trim() === "") {
      return;
    }
    onAddTask(taskName);
    setTaskName("");
    toast({
      title: "Task added",
      description: taskName,
      status: "success",
      duration: 800,
      isClosable: true,
    });
    // setTaskName("");
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
      <Title level={2}>Add Tasks Here....</Title>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "700px", width: "100%" }} // Make form responsive
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Task Name"
          name="taskName"
          rules={[
            { required: true, message: "Please enter the name of the task!" },
          ]}
        >
          <Input
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary"  htmlType="submit">
            Add +
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTask;

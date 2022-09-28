import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MODALS } from "../../constants";
import { ModalContext } from "../../context/ModalContext";
import { spacesSelector } from "../../features/spaces/spaceSlice";
import {
  taskSelector,
  getTasksByUserId,
  selectTask,
} from "../../features/tasks/taskSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskUpdate";

const tasks = [
  { id: "all", title: "All" },
  { id: "pending", title: "Pending" },
  { id: "completed", title: "Completed" },
];

export default function Tasks() {
  const [currentId, setCurrentId] = useState(tasks[0].id);
  const [currentTaskModal, setCurrentTaskModal] = useState("");
  const { openModal, closeModal, taskFormIsOpen, taskModalIsOpen } =
    useContext(ModalContext);
  const dispatch = useAppDispatch();
  const { selectedUserTasks } = useAppSelector(taskSelector);
  const { selectedUserId } = useAppSelector(userSelector);
  const { user } = useAppSelector(userSelector);
  const { userSpaces } = useAppSelector(spacesSelector);
  const { spaceId } = useParams();
  const currentSpace = userSpaces.find((space) => space._id === spaceId);
  const isCreator = user?.userId === currentSpace.creator;

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getTasksByUserId(selectedUserId));
    }
  }, [selectedUserId]);

  return (
    <div className="basis-1/4 h-screen px-3">
      {isCreator && (
        <button onClick={() => openModal(MODALS.taskform)} className="btn">
          Assign Task +
        </button>
      )}
      <div className="flex justify-between my-3">
        {tasks.map((task) => (
          <button
            className={`px-2 py-1 ${
              currentId === task.id ? "text-white bg-slate-700" : ""
            } text-sm rounded-md`}
            key={task.id}
            onClick={() => setCurrentId(task.id)}
          >
            {task.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 overflow-auto h-[80%]">
        {selectedUserTasks.length === 0 ? (
          selectedUserId && <p>No tasks assigned</p>
        ) : (
          selectedUserTasks.map((task) => {
            if (currentId === tasks[0].id) {
              return (
                <Task
                  openModal={() => {
                    setCurrentTaskModal(task._id);
                    openModal(MODALS.taskModal);
                    dispatch(selectTask(task));
                  }}
                  key={task._id}
                  {...task}
                />
              );
            } else if (
              currentId === tasks[1].id &&
              tasks[1].id === task.status
            ) {
              return (
                <Task
                  openModal={() => {
                    setCurrentTaskModal(task._id);
                    openModal(MODALS.taskModal);
                    dispatch(selectTask(task));
                  }}
                  key={task._id}
                  {...task}
                />
              );
            } else if (
              currentId === tasks[2].id &&
              tasks[2].id === task.status
            ) {
              return (
                <Task
                  openModal={() => {
                    setCurrentTaskModal(task._id);
                    openModal(MODALS.taskModal);
                    dispatch(selectTask(task));
                  }}
                  key={task._id}
                  {...task}
                />
              );
            }
          })
        )}
      </div>

      <TaskForm
        isOpen={taskFormIsOpen}
        onClose={() => closeModal(MODALS.taskform)}
        id={MODALS.taskform}
      />
      <TaskModal
        isOpen={taskModalIsOpen}
        onClose={() => closeModal(MODALS.taskModal)}
        id={MODALS.taskModal}
        taskId={currentTaskModal}
      />
    </div>
  );
}

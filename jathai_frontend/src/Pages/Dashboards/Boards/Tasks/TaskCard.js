import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { handleTaskAction } from "./TaskModel";
import "./TaskCard.css";
import "./TaskModel.css";

const TaskCard = ({ list, setLists }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
    if (editorInstance) {
      editorInstance.destroy();
    }
    const editor = new EditorJS({
      holder: "editorjs",
      data: task.description ? JSON.parse(task.description) : {},
      tools: {
        header: Header, // Add header tool
        list: List, // Add list tool
        quote: Quote, // Add quote tool
      },
      onReady: () => setEditorInstance(editor),
    });
  };

  const handleUpdateTask = async () => {
    if (!editorInstance || !currentTask) return;

    try {
      const outputData = await editorInstance.save();
      const payload = {
        title: currentTask.title.trim(),
        description: JSON.stringify(outputData),
        list: list.id,
        order: currentTask.order || 1,
      };
      await handleTaskAction(
        "edit",
        currentTask.id,
        payload,
        list.id,
        setLists
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to save editor data or API error:", error);
    }
  };

  return (
    <Droppable droppableId={`list-${list.id}`} type="task">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="task-container"
        >
          {list.tasks?.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={`task-${task.id}`}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="task-item"
                >
                  <span className="task-title">{task.title}</span>
                  <FiEdit
                    onClick={() => openEditModal(task)}
                    className="edit-icon"
                  />
                  <FiTrash2
                    onClick={() =>
                      handleTaskAction(
                        "delete",
                        task.id,
                        null,
                        list.id,
                        setLists
                      )
                    }
                    className="delete-icon"
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <div className="task-add-container">
            {!isAddingTask ? (
              <div
                className="add-task-btn"
                onClick={() => setIsAddingTask(true)}
              >
                <FiPlus /> Add Task
              </div>
            ) : (
              <div className="task-input">
                <input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                />
                <div className="task-actions">
                  <button
                    className="Add-actions"
                    onClick={() => {
                      handleTaskAction(
                        "add",
                        null,
                        { title: taskTitle, list: list.id },
                        list.id,
                        setLists
                      );
                      setIsAddingTask(false);
                      setTaskTitle("");
                    }}
                  >
                    Add
                  </button>
                  <button
                    className="Cancel-actions"
                    onClick={() => setIsAddingTask(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal for editing task using Bootstrap */}
          <div
            className={`modal fade ${isEditModalOpen ? "show" : ""}`}
            id="editTaskModal"
            style={{ display: isEditModalOpen ? "block" : "none", background: "rgba(0, 0, 0, 0.6)" }}
            tabIndex="-1"
            aria-labelledby="editTaskModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editTaskModalLabel">
                    Edit Task
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setIsEditModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    className="task-title-modal"
                    value={currentTask?.title || ""}
                    onChange={(e) =>
                      setCurrentTask({ ...currentTask, title: e.target.value })
                    }
                    placeholder="Task title"
                  />
                  <div id="editorjs" className="editorjs-container"></div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateTask}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskCard;

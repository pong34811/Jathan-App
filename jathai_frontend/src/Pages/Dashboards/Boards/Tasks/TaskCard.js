import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { handleTaskAction } from "./TaskModel";
import "./TaskModel.css";

const TaskCard = ({ list, setLists }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);
  const [taskColor, setTaskColor] = useState("#FFFFFF");
  const [taskTags] = useState([]);
  const [editTitle, setEditTitle] = useState(""); // เพิ่ม state ใหม่สำหรับจัดการ title ใน modal
  const [newTag, setNewTag] = useState("");

  const editorRef = useRef(null);

  useEffect(() => {
    return () => {
      if (editorInstance && typeof editorInstance.destroy === "function") {
        editorInstance.destroy();
      }
    };
  }, [editorInstance]);

  useEffect(() => {
    if (isEditModalOpen && currentTask && editorRef.current) {
      if (editorInstance && typeof editorInstance.destroy === "function") {
        editorInstance.destroy();
        setEditorInstance(null);
      }
      const editor = new EditorJS({
        holder: editorRef.current,
        data: currentTask.description
          ? JSON.parse(currentTask.description)
          : {},
        tools: {
          header: Header,
          list: List,
          quote: Quote,
        },
        onReady: () => setEditorInstance(editor),
      });
    }
  }, [isEditModalOpen, currentTask]);

  // อัปเดตค่า editTitle เมื่อ currentTask เปลี่ยน
  useEffect(() => {
    if (currentTask) {
      setEditTitle(currentTask.title || "");
      setTaskColor(currentTask.color || "#FFFFFF");
    }
  }, [currentTask]);

  const openEditModal = useCallback((task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  }, []);

  const handleUpdateTask = async () => {
    if (!editorInstance || !currentTask) return;
    try {
      const outputData = await editorInstance.save();
      const payload = {
        title: editTitle.trim(), // ใช้ค่าจาก editTitle แทน
        description: JSON.stringify(outputData),
        list: list.id,
        order: currentTask.order || 1,
        color: taskColor,
        tags: taskTags,
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
      console.error("Failed to update task:", error);
    }
  };

  

  const handleAddTask = () => {
    if (taskTitle.trim() === "") return;
    handleTaskAction(
      "add",
      null,
      { title: taskTitle.trim(), list: list.id },
      list.id,
      setLists
    );
    setTaskTitle("");
    setIsAddingTask(false);
  };

  const renderDescription = (description) => {
    if (!description) return null;
    try {
      const data = JSON.parse(description);
      if (data.blocks && data.blocks.length > 0) {
        return data.blocks.map((block, idx) => {
          if (block.type === "paragraph") {
            return (
              <p key={idx} className="mb-1 task-paragraph">
                {block.data.text}
              </p>
            );
          } else if (block.type === "header") {
            return (
              <h6 key={idx} className="mb-1 task-header">
                {block.data.text}
              </h6>
            );
          } else {
            return null;
          }
        });
      }
    } catch (e) {
      return <p>{description}</p>;
    }
    return null;
  };

  const modalContent = (
    <div
      className={`modal fade ${isEditModalOpen ? "show" : ""}`}
      id="editTaskModal"
      style={{
        display: isEditModalOpen ? "block" : "none",
        background: "rgba(0, 0, 0, 0.6)",
      }}
      tabIndex="-1"
      aria-labelledby="editTaskModalLabel"
      aria-hidden={!isEditModalOpen}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-3">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold" id="editTaskModalLabel">
              Edit Task
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setIsEditModalOpen(false)}
            ></button>
          </div>
          <div className="modal-body p-4 bg-light">
            <label className="form-label fw-semibold text-dark">
              Task Title
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={editTitle} // ใช้ค่าจาก editTitle
                onChange={(e) => setEditTitle(e.target.value)} // อัปเดต editTitle แทน currentTask
              />
            </div>
            <label className="form-label fw-semibold text-dark">
              Description
            </label>
            <div
              ref={editorRef}
              className="editorjs-container border rounded p-3 bg-white"
            ></div>

            <label className="form-label fw-semibold text-dark">
              Task Color
            </label>
            <input
              type="color"
              value={taskColor}
              onChange={(e) => setTaskColor(e.target.value)}
              className="form-control mb-3"
            />
          </div>
          <div className="modal-footer d-flex justify-content-between p-3 bg-light border-top">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary fw-bold px-4"
              onClick={handleUpdateTask}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Droppable droppableId={`list-${list.id}`} type="task">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-container shadow p-3 mb-3 bg-light"
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
                  >
                    <div
                      className="task-item card mb-2 p-2"
                      style={{ backgroundColor: task.color || "#fff" }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className="badge bg-primary fs-6"
                          onClick={() => openEditModal(task)}
                        >
                          {task.title}
                        </span>
                        <div>
                          <button
                            type="button"
                            className="btn btn-light p-1 me-1 shadow-sm"
                            onClick={() => openEditModal(task)}
                            title="Edit Task"
                          >
                            <FiEdit size={16} className="text-primary" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-light p-1 shadow-sm"
                            onClick={() =>
                              handleTaskAction(
                                "delete",
                                task.id,
                                null,
                                list.id,
                                setLists
                              )
                            }
                            title="Delete Task"
                          >
                            <FiTrash2 size={16} className="text-danger" />
                          </button>
                        </div>
                      </div>
                      <div
                        className="task-description mt-2 bg-white p-2 rounded"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {renderDescription(task.description)}
                      </div>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {task.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="badge rounded-pill bg-info text-white"
                            style={{
                              minWidth: "70px",
                              height: "24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "6px 12px",
                              fontSize: "10px",
                              textAlign: "center",
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div className="task-add-container mt-3">
              {!isAddingTask ? (
                <div
                  className="add-task-btn btn btn-outline-primary"
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
                    className="form-control mb-2"
                  />
                  <div className="task-actions">
                    <button
                      className="btn btn-primary me-2"
                      onClick={handleAddTask}
                    >
                      Add
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsAddingTask(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
      {isEditModalOpen && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
};

export default TaskCard;
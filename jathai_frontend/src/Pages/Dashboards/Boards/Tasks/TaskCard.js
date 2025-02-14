import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { handleTaskAction } from "./TaskModel";
import DeleteTaskModal from "./modal/DeleteTaskModal";
import "./TaskModel.css";
import "./TaskCard.css";

const TaskCard = ({ list, setLists }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);
  const [taskColor, setTaskColor] = useState("#FFFFFF");
  // เก็บ tags เป็น array ของ object (เช่น { name: "tag1" })
  const [taskTags, setTaskTags] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [newTag, setNewTag] = useState("");

  // state สำหรับ modal delete task
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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
        data: currentTask.description ? JSON.parse(currentTask.description) : {},
        tools: {
          header: Header,
          list: List,
          quote: Quote,
        },
        onReady: () => setEditorInstance(editor),
      });
    }
  }, [isEditModalOpen, currentTask]);

  // เมื่อ currentTask เปลี่ยน ให้อัปเดตข้อมูลใน modal
  useEffect(() => {
    if (currentTask) {
      setEditTitle(currentTask.title || "");
      setTaskColor(currentTask.color || "#FFFFFF");
      if (currentTask.tags) {
        setTaskTags(currentTask.tags);
      }
    }
  }, [currentTask]);

  const openEditModal = useCallback((task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  }, []);

  // ฟังก์ชัน deduplicate tags ก่อนส่ง payload
  const deduplicateTags = (tags) => {
    const uniqueNames = Array.from(new Set(tags.map((tag) => tag.name.toLowerCase())));
    return uniqueNames.map((name) => ({ name }));
  };

  const handleUpdateTask = async () => {
    if (!editorInstance || !currentTask) return;
    try {
      const outputData = await editorInstance.save();
      // ทำการ deduplicate tags ก่อนส่งไปยัง backend
      const uniqueTags = deduplicateTags(
        taskTags.map((tag) => (typeof tag === "string" ? { name: tag } : tag))
      );
      const payload = {
        title: editTitle.trim(),
        description: JSON.stringify(outputData),
        list: list.id,
        order: currentTask.order || 1,
        color: taskColor,
        tags: uniqueTags,
      };
      await handleTaskAction("edit", currentTask.id, payload, list.id, setLists);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // เพิ่ม tag ใหม่ โดยตรวจสอบว่าชื่อ tag ซ้ำกับ tag ที่มีอยู่ใน state หรือไม่
  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (
      trimmedTag &&
      !taskTags.some((tag) => tag.name.toLowerCase() === trimmedTag.toLowerCase())
    ) {
      setTaskTags([...taskTags, { name: trimmedTag }]);
      setNewTag("");
    }
  };

  // ลบ tag โดยอิงจากตำแหน่ง index
  const handleRemoveTag = (index) => {
    setTaskTags(taskTags.filter((_, i) => i !== index));
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === "") return;
    handleTaskAction("add", null, { title: taskTitle.trim(), list: list.id }, list.id, setLists);
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
            <label className="form-label fw-semibold text-dark">Task Title</label>
            <div className="input-group mb-3">
              <span className="input-group-text">@</span>
              <input
                type="text"
                className="form-control"
                placeholder="Task Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <label className="form-label fw-semibold text-dark">Description</label>
            <div
              ref={editorRef}
              className="editorjs-container border rounded p-3 bg-white"
            ></div>

            <label className="form-label fw-semibold text-dark">Task Color</label>
            <input
              type="color"
              value={taskColor}
              onChange={(e) => setTaskColor(e.target.value)}
              className="form-control mb-3"
            />

            <label className="form-label fw-semibold text-dark">Tags</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button className="btn btn-secondary" onClick={handleAddTag}>
                Add Tag
              </button>
            </div>
            <div className="mb-3">
              {taskTags.map((tag, index) => (
                <span key={index} className="badge bg-primary me-2">
                  {tag.name}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => handleRemoveTag(index)}
                    aria-label="Remove tag"
                  ></button>
                </span>
              ))}
            </div>
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
              <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      className="task-item card mb-2 p-2"
                      style={{
                        backgroundColor: task.color || "#fff",
                        transition: "box-shadow 0.2s, transform 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className="task-title-container text-truncate d-inline-block"
                            style={{ maxWidth: "150px" }}
                            title={task.title}
                          >
                            <span
                              className="badge bg-primary fs-6 text-truncate w-100"
                              onClick={() => openEditModal(task)}
                            >
                              {task.title}
                            </span>
                          </div>
                        </div>
                        <div className="task-action-buttons">
                          <button
                            type="button"
                            className="edit-btn ps-2"
                            onClick={() => openEditModal(task)}
                            title="Edit Task"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => {
                              setTaskToDelete(task);
                              setIsDeleteModalOpen(true);
                            }}
                            title="Delete Task"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                      {task.description && (
                        <div
                          className="task-description mt-2 p-2 rounded"
                          style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            maxHeight: "4.5em",
                            lineHeight: "1.5em",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                          }}
                          title={task.description}
                          onClick={() => openEditModal(task)}
                        >
                          {renderDescription(task.description)}
                        </div>
                      )}
                      {!task.description && (
                        <div
                          className="task-description mt-2 p-2 rounded"
                          style={{ backgroundColor: "transparent" }}
                        />
                      )}
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {task.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="badge rounded-pill"
                            style={{
                              minWidth: "45px",
                              height: "25px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px 8px",
                              fontSize: "10px",
                              backgroundColor: tag.color || "#0d6efd",
                              color: "#fff",
                              cursor: "pointer",
                              transition: "opacity 0.2s",
                            }}
                            title={tag.name}
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
                    <button className="btn btn-primary me-2" onClick={handleAddTask}>
                      Add
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsAddingTask(false)}>
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
      {isDeleteModalOpen &&
        ReactDOM.createPortal(
          <DeleteTaskModal
            taskId={taskToDelete?.id}
            onDelete={(taskId) => {
              handleTaskAction("delete", taskId, null, list.id, setLists);
              setIsDeleteModalOpen(false);
            }}
            onClose={() => setIsDeleteModalOpen(false)}
          />,
          document.body
        )}
    </>
  );
};

export default TaskCard;

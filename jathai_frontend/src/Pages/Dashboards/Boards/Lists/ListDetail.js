import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { FiPlus } from "react-icons/fi";
import ListCard from "./ListCard";
import { URL_AUTH } from "../../../../Apis/ConfigApis";
import "./ListDetail.css";
import useBoards from "../hooks/useBoards";

const ListDetail = () => {
  const { boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [isAddingList, setIsAddingList] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const { boards, loading } = useBoards(); // ใช้ hook เพื่อดึงข้อมูล boards

  // ดึง board ตาม boardId
  const board = boards.find((b) => b.id === parseInt(boardId));

  const fetchLists = useCallback(async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Authentication token missing");

      const { data } = await axios.get(
        `${URL_AUTH.ListsAPI}?board=${boardId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLists(data.sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error("Error fetching lists:", err);
    }
  }, [boardId]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const onDragEnd = async ({ destination, source, type }) => {
    if (!destination) return;

    const updatedLists = [...lists];
    const movedTask =
      type === "task"
        ? updatedLists
            .find((list) => list.id === +source.droppableId.split("-")[1])
            ?.tasks.splice(source.index, 1)
        : null;

    if (type === "list" && source.index !== destination.index) {
      const [movedList] = updatedLists.splice(source.index, 1);
      updatedLists.splice(destination.index, 0, movedList);
      setLists(updatedLists);
      await updateListOrder(updatedLists);
    } else if (movedTask) {
      const destListId = +destination.droppableId.split("-")[1];
      const destList = updatedLists.find((list) => list.id === destListId);
      destList.tasks.splice(destination.index, 0, movedTask[0]);
      setLists(updatedLists);
      await updateTaskPosition(movedTask[0].id, destListId, destination.index);
    }
  };

  const updateListOrder = async (updatedLists) => {
    const token = localStorage.getItem("access");
    if (!token) return;

    await Promise.all(
      updatedLists.map((list, index) =>
        axios.patch(
          `${URL_AUTH.ListsAPI}${list.id}/`,
          { order: index + 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      )
    );
  };

  const updateTaskPosition = async (taskId, listId, order, taskTitle) => {
    const token = localStorage.getItem("access");
    if (!token) {
      return;
    }

    try {
      const { data: currentTask } = await axios.get(
        `${URL_AUTH.TasksAPI}${taskId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedTitle = taskTitle || currentTask.title;
      if (!updatedTitle) throw new Error("Task title cannot be empty");

      const response = await axios.patch(
        `${URL_AUTH.TasksAPI}${taskId}/`,
        {
          title: updatedTitle,
          list: listId,
          order: order + 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      console.error(`Failed to update task position: ${errorMessage}`);
      throw new Error(`Failed to update task position: ${errorMessage}`);
    }
  };

  const addList = async () => {
    if (!listTitle.trim()) return;

    try {
      const token = localStorage.getItem("access");
      const { data } = await axios.post(
        URL_AUTH.ListsAPI,
        { title: listTitle, board: boardId, order: lists.length + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLists((prev) => [...prev, data]);
      setListTitle("");
      setIsAddingList(false);
    } catch (err) {
      console.error("Error adding list:", err);
    }
  };

  return (
    <>
      <main
        className="d-flex flex-column align-items-start p-2 bg-light"
        style={{ height: "100vh" }}
      >
        <div className="row g-3 mb-3">
          <div className="col-lg-4 col-md-6 col-sm-12 w-100">
            <div className="p-3 bg-white rounded shadow-sm border">
              <h5 className="text-primary text-center fw-bold">
              📌 Current Board: {loading ? "Loading..." : board ? board.title : "Board not found"}
              </h5>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="lists"
            direction="horizontal"
            type="list"
            key="lists"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                id="lists-container"
                className="lists-container bg-light"
              >
                {lists.map((list, index) => (
                  <ListCard
                    key={list.id}
                    list={list}
                    index={index}
                    setLists={setLists}
                  />
                ))}
                {provided.placeholder}

                {isAddingList ? (
                  <div className="add-list-card" style={{height:"65px"}}>
                    <input
                      className="list-card-input"
                      value={listTitle}
                      onChange={(e) => setListTitle(e.target.value)}
                      placeholder="Enter list title..."
                      autoFocus
                    />
                    <button className="btn btn-primary me-2" onClick={addList}>
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setIsAddingList(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-list-button"
                    onClick={() => setIsAddingList(true)}
                  >
                    <FiPlus /> Add List
                  </button>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </>
  );
};

export default ListDetail;

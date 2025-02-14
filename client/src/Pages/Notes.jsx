import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Define search state

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/api/notes", {
          headers: { "x-auth-token": token },
        });
        setNotes(response.data);
      } catch (err) {
        console.error(
          "Error fetching notes:",
          err.response?.data || err.message
        );
      }
    };
    fetchNotes();
  }, []);

  // ✅ Use filteredNotes to display only searched notes
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/notes/add",
        { title, content },
        {
          headers: { "x-auth-token": token },
        }
      );
      setNotes([...notes, response.data]);
      setTitle("");
      setContent("");
    } catch (err) {
      alert("Please login to add notes");
      console.error("Error adding note:", err.response?.data || err.message);
    }
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCurrentNoteId(note._id);
    setEditMode(true);
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:3000/api/notes/update/${currentNoteId}`,
        { title, content },
        {
          headers: { "x-auth-token": token },
        }
      );
      setNotes(
        notes.map((note) => (note._id === currentNoteId ? response.data : note))
      );
      setTitle("");
      setContent("");
      setEditMode(false);
      setCurrentNoteId(null);
    } catch (err) {
      console.error("Error updating note:", err.response?.data || err.message);
    }
  };

  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/notes/delete/${id}`, {
        headers: { "x-auth-token": token },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      {/* ✅ Pass setSearchQuery to Navbar */}
      <Navbar setSearchQuery={setSearchQuery} />

      <div className="container mt-4">
        <h3 className="text-center">Manage Your Notes</h3>

        <form
          onSubmit={editMode ? handleUpdateNote : handleAddNote}
          className="mb-4"
        >
          <div className="row">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button
                type="submit"
                className={`btn ${
                  editMode ? "btn-warning" : "btn-success"
                } w-100`}
              >
                {editMode ? "Update Note" : "Add Note"}
              </button>
            </div>
          </div>
        </form>

        <div className="container mt-3">
          {filteredNotes.length === 0 ? (
            <h5 className="text-center text-muted">No notes found</h5>
          ) : (
            <div className="row g-3">
              {filteredNotes.map((note) => (
                <div className="col-md-4" key={note._id}>
                  <div className="card h-100 p-3 d-flex flex-column shadow-sm">
                    <h4 className="fw-bold">{note.title}</h4>
                    <div className="note-content flex-grow-1 overflow-auto">
                      <p>{note.content}</p>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .note-content {
          max-height: 150px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default Notes;

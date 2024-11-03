// src/pages/notesPage/NotesPage.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotesBlock from "./../../components/noteBlock/NoteBlock";
import { addNote, fetchNotes } from "../../store/slices/notesSlice";
import Modal from "react-modal";
import "./model.css";  // Ensure the CSS file path is correct

// Set the root for react-modal
Modal.setAppElement("#root");

function NotesPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [subject, setSubject] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);

    // Fetch notes only once when the component mounts
    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    const handleAddNote = (e) => {
        e.preventDefault();
        
        if (!user || !user.uid) {
            toast.error("Please log in to add notes.");
            return;
        }

        if (!title || !content || !subject) {
           
            return;
        }

        dispatch(addNote({
            title,
            content,
            subject,
            createdBy: user.uid,
            creatorName: user.displayName || "Anonymous"
        }));

        // Clear input fields and close modal after adding
        setTitle("");
        setContent("");
        setSubject("");
        setIsModalOpen(false);
        
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Your Notes</h2>

            {/* Button to open the modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
            >
                Create Note
            </button>

            {/* Modal for Add Note Form */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Add Note Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h3 className="text-2xl font-semibold mb-4">Add a New Note</h3>
                <form onSubmit={handleAddNote}>
                    <input
                        type="text"
                        placeholder="Note Title"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Note Content"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded w-full"
                    >
                        Add Note
                    </button>
                </form>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 bg-gray-500 text-white py-2 px-4 rounded w-full"
                >
                    Close
                </button>
            </Modal>

            {/* Notes Display Section */}
            <NotesBlock />
        </div>
    );
}

export default NotesPage;

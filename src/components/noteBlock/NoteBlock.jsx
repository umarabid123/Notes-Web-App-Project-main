// src/components/NotesBlock.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNote } from "../../store/slices/notesSlice";
import { fetchComments, addComment } from "../../store/slices/commentsSlice";
import { toast } from "react-toastify";

function NotesBlock() {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.notesList);
    console.log('notes: ', notes);
    const comments = useSelector((state) => state.comments);

    // Local state for handling new comment input for each note
    const [newCommentText, setNewCommentText] = useState({});

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    useEffect(() => {
        // Fetch comments for all notes after fetching notes
        notes.forEach(note => {
            dispatch(fetchComments(note.id));
        });
    }, [notes, dispatch]);

    const handleAddComment = (noteId) => {
        const commentText = newCommentText[noteId]?.trim();
        if (!commentText) {
            toast.error("Comment cannot be empty.");
            return;
        }
        
        dispatch(addComment({ noteId, text: commentText, userId: "currentUserId" }))
            .then(() => {
                setNewCommentText((prev) => ({ ...prev, [noteId]: "" }));
                dispatch(fetchComments(noteId)); 
            })
            .catch((error) => {
                toast.error("Failed to add comment: " + error.message);
            });
    };

    const handleCommentInputChange = (noteId, value) => {
        setNewCommentText((prev) => ({ ...prev, [noteId]: value }));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-teal-600">All Notes</h2>
            {notes.map((note) => (
                
                <div key={note.id} className="bg-white shadow-xl rounded-lg p-8 mb-10 border border-teal-100 transform transition">
                    <div className="note-header text-center mb-6">
                        <h3 className="text-3xl font-extrabold text-teal-600 mb-2">{note.title}</h3>
                        <p className="text-md text-gray-700 mb-4">{note.content}</p>
                        <p className="text-sm text-gray-500 italic">Subject: {note.subject}</p>
                        <p className="text-sm text-gray-500 italic">Created by: {note.creatorName || "Anonymous"}</p>
                    </div>

                    <div className="flex justify-center mb-4">
                        <button
                            onClick={() => dispatch(deleteNote(note.id))}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                        >
                            Delete
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section mt-6">
                        <h4 className="text-2xl font-semibold mb-4 text-center text-teal-600">Comments</h4>
                        <div className="mb-6 p-4 border border-gray-300 rounded-lg">
                            {comments[note.id] && comments[note.id].length > 0 ? (
                                comments[note.id].map((comment) => (
                                    <div key={comment.id} className="p-2 mb-2 border-b border-gray-200">
                                        <p className="text-gray-800 text-center">{comment.text}</p>
                                        <p className="text-sm text-gray-500 text-center">By User ID: {comment.userId}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No comments yet.</p>
                            )}
                        </div>

                        {/* Add Comment Input */}
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Add a comment"
                                className="w-full p-3 border border-gray-300 rounded-l-lg text-gray-800"
                                value={newCommentText[note.id] || ""}
                                onChange={(e) => handleCommentInputChange(note.id, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddComment(note.id);
                                    }
                                }}
                            />
                            <button
                                onClick={() => handleAddComment(note.id)}
                                className="px-4 py-[.8rem] bg-teal-600 text-white rounded-r-lg font-semibold hover:bg-teal-700 transition duration-300"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NotesBlock;

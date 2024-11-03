// src/components/NotesBlock.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNote } from "../../store/slices/notesSlice";
import { fetchComments, addComment } from "../../store/slices/commentsSlice";
import { toast } from "react-toastify";

function NotesBlock() {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.notesList);
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
                // Clear the input text for this note
                setNewCommentText((prev) => ({ ...prev, [noteId]: "" }));
                // Fetch comments for this note again to refresh the comment list
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
            <h2 className="text-3xl font-semibold mb-6 text-center">All Notes</h2>
            {notes.map((note) => (
                <div key={note.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <div className="note-header mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">{note.title}</h3>
                        <p className="text-gray-600 mb-2">{note.content}</p>
                        <p className="text-sm text-gray-500 italic">Subject: {note.subject}</p>
                        <p className="text-sm text-gray-500 italic">Created by: {note.creatorName || "Anonymous"}</p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => dispatch(deleteNote(note.id))}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Delete
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section mt-6">
                        <h4 className="text-xl font-semibold mb-2">Comments</h4>
                        <div className="mb-4 p-4 border border-gray-300 rounded">
                            {comments[note.id] && comments[note.id].length > 0 ? (
                                comments[note.id].map((comment) => (
                                    <div key={comment.id} className="p-2 mb-2 border-b border-gray-200">
                                        <p className="text-gray-800">{comment.text}</p>
                                        <p className="text-sm text-gray-500">By User ID: {comment.userId}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No comments yet.</p>
                            )}
                        </div>

                        {/* Add Comment Input */}
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Add a comment"
                                className="w-full p-2 border border-gray-300 rounded mb-2"
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
                                className="ml-2 bg-blue-600 text-white px-4 rounded"
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

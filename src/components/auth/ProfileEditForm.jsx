// src/components/ProfileEditForm.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { logoutUser } from "../../store/slices/userSlice"; // Import logoutUser action
import { toast } from "react-toastify";

function ProfileEditForm() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [initial, setInitial] = useState("");

    // Fetch and set initial profile data
    useEffect(() => {
        if (userInfo) {
            const fetchUserProfile = async () => {
                try {
                    const userDoc = await getDoc(doc(db, "users", userInfo.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setDisplayName(data.displayName || "");
                        setBio(data.bio || "");
                        setLocation(data.location || "");
                        setWebsite(data.website || "");
                        setInitial(data.displayName?.charAt(0).toUpperCase() || "");
                    }
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                }
            };
            fetchUserProfile();
        }
    }, [userInfo]);

    const handleSaveProfile = async () => {
        if (!userInfo) return;
        try {
            await setDoc(doc(db, "users", userInfo.uid), {
                displayName,
                bio,
                location,
                website,
            }, { merge: true });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Error saving profile.");
            console.error("Error saving profile:", error);
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            dispatch(logoutUser());
            toast.info("You have been logged out.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

            {/* Display Initials */}
            {initial && (
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-4 text-4xl font-bold text-white">
                    {initial}
                </div>
            )}

            <input
                type="text"
                placeholder="Display Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />

            <textarea
                placeholder="Bio"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <input
                type="text"
                placeholder="Location"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                type="url"
                placeholder="Website or Social Link"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
            />

            {/* Save Profile Button */}
            <button
                onClick={handleSaveProfile}
                className="bg-green-500 text-white py-2 px-4 rounded w-full mb-4"
            >
                Save Profile
            </button>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded w-full"
            >
                Logout
            </button>
        </div>
    );
}

export default ProfileEditForm;

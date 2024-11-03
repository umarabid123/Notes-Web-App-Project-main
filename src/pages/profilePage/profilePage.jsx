// src/pages/profilePage/ProfilePage.jsx
import { useSelector } from "react-redux";
import ProfileEditForm from "../../components/auth/ProfileEditForm"; // Import ProfileEditForm

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Profile Page</h2>

      {/* Display only the Profile Edit Form */}
      <div className="mt-8">
        <ProfileEditForm userInfo={userInfo} /> {/* Pass userInfo to ProfileEditForm if needed */}
      </div>
    </div>
  );
}

export default ProfilePage;

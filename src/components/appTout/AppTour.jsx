// src/components/AppTour.jsx
import  { useState, useEffect } from "react";
import Joyride from "react-joyride";
import { useSelector, useDispatch } from "react-redux";
import { updateUserTourStatus } from "../store/slices/userSlice"; // Import action to update tour status

function AppTour() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [tour, setTour] = useState({
    run: !userInfo?.hasCompletedTour, // Run tour if user hasn't completed it
    steps: [
      {
        target: ".welcome-message",
        content: "Welcome to your notes app! Let's take a quick tour.",
      },
      {
        target: ".create-note-button",
        content: "This button allows you to create a new note.",
      },
      {
        target: ".notes-list",
        content: "Here's where all your notes are displayed.",
      },
      {
        target: ".profile-page-link",
        content: "Visit your profile here to edit your information.",
      },
    ],
  });

  // Mark tour as completed after it finishes or is skipped
  useEffect(() => {
    if (!tour.run && userInfo) {
      dispatch(updateUserTourStatus(userInfo.uid, { hasCompletedTour: true }));
    }
  }, [tour.run, userInfo, dispatch]);

  return (
    <Joyride
      steps={tour.steps}
      run={tour.run}
      continuous
      showSkipButton
      styles={{
        options: {
          zIndex: 1000,
        },
      }}
      callback={(data) => {
        if (data.status === "finished" || data.status === "skipped") {
          setTour((prev) => ({ ...prev, run: false }));
        }
      }}
    />
  );
}

export default AppTour;

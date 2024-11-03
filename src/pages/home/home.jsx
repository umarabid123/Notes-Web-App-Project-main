// src/pages/home/Home.jsx

import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="container mx-auto px-4 py-10 text-center">
			{/* Welcome Message */}
			<h1 className="text-5xl font-extrabold text-teal-600 mb-6">
				Welcome to Our Notes Application!
			</h1>
			<p className="text-lg text-gray-700 mb-10">
				🌟 Transform your ideas into reality! Collaborate and create
				stunning notes with ease.
			</p>

			{/* Getting Started Section */}
			<div className="bg-teal-600 text-white shadow-md rounded-lg p-8 mb-10">
				<h2 className="text-3xl font-semibold mb-4">
					Embark on Your Note-Exploration Journey
				</h2>
				<p className="mb-6">
					Dive into a world of organized thoughts and creativity!{" "}
					<Link to="/signup" className="underline">
						Create your account
					</Link>{" "}
					or{" "}
					<Link to="/login" className="underline">
						log in
					</Link>{" "}
					to start discovering your notes today!
				</p>
				<Link
					to="/notes"
					className="bg-white text-teal-600 hover:bg-teal-200 px-6 py-3 rounded-full transition duration-300"
				>
					Explore Notes and Make It More Attractive
				</Link>
			</div>

			{/* Features Section */}
			<h2 className="text-3xl font-semibold text-teal-600 mb-6">
				Discover Our Exciting Features
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				<div className="bg-teal-200 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
					<h3 className="text-xl font-bold text-teal-800 mb-2">
						Effortless Note Taking
					</h3>
					<p className="text-gray-700">
						Quickly jot down your thoughts and ideas with our
						user-friendly interface. Your canvas is ready!
					</p>
				</div>
				<div className="bg-teal-300 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
					<h3 className="text-xl font-bold text-teal-800 mb-2">
						Organize with Ease
					</h3>
					<p className="text-gray-700">
						Keep everything tidy and accessible with intuitive
						categorization and editing tools.
					</p>
				</div>
				<div className="bg-teal-400 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
					<h3 className="text-xl font-bold text-teal-800 mb-2">
						Collaborate Seamlessly
					</h3>
					<p className="text-gray-700">
						Work together effortlessly with your team, share
						insights, and comment on notes in real-time.
					</p>
				</div>
			</div>

			{/* Call to Action Section */}
			<div className="bg-teal-100 shadow-lg rounded-lg p-8 mb-10 transition-transform transform hover:scale-105">
				<h2 className="text-4xl font-semibold text-teal-700 mb-4">
					Join the Collaboration Revolution
				</h2>
				<p className="text-gray-700 mb-6">
					Collaborate, brainstorm, and innovate with your team. Create
					a space where ideas flourish!
				</p>
				<Link
					to="/profile"
					className="text-white bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-full shadow transition duration-300"
				>
					Customize Your Profile
				</Link>
			</div>
		</div>
	);
}

export default Home;

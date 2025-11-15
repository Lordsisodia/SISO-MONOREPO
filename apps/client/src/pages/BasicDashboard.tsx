import React from 'react';
import { Link } from 'react-router-dom';

export default function BasicDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8">
        <Link to="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">
          🎉 Welcome to Your Dashboard!
        </h1>
        <p className="text-gray-400 text-lg">
          This is your simplified SISO dashboard - no complex auth required!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-green-400">✅ Projects</h3>
          <p className="text-gray-300 mb-4">Manage your active projects</p>
          <div className="text-2xl font-bold text-white">3 Active</div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">👥 Team</h3>
          <p className="text-gray-300 mb-4">Collaborate with teammates</p>
          <div className="text-2xl font-bold text-white">5 Members</div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-purple-400">📊 Analytics</h3>
          <p className="text-gray-300 mb-4">View performance metrics</p>
          <div className="text-2xl font-bold text-white">89% Growth</div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/projects" 
            className="block p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <div className="font-semibold">Create New Project</div>
            <div className="text-blue-100 text-sm">Start building your next MVP</div>
          </Link>
          
          <Link 
            to="/team" 
            className="block p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <div className="font-semibold">Invite Team Members</div>
            <div className="text-green-100 text-sm">Collaborate with others</div>
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-white">Getting Started</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
            <span className="text-gray-300">Dashboard access successful</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">2</div>
            <span className="text-gray-400">Set up your profile (optional)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">3</div>
            <span className="text-gray-400">Create your first project</span>
          </div>
        </div>
      </div>
    </div>
  );
}
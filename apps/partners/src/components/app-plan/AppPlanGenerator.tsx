import React from 'react';
import { motion } from 'framer-motion';

export function AppPlanGenerator() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-[#ea384c] to-[#d42c47] rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">AI App Plan Generator</h2>
        <p className="text-white/90">
          Generate comprehensive app development plans for your clients using AI-powered analysis.
        </p>
      </div>
      
      <div className="bg-white/5 rounded-lg border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Partner Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">🎯 Client Value</h4>
            <p className="text-gray-300 text-sm">
              Provide detailed project scopes and timelines that showcase your expertise.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">💰 Commission Boost</h4>
            <p className="text-gray-300 text-sm">
              Higher-value projects mean increased 30% commission earnings.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">⚡ Speed Advantage</h4>
            <p className="text-gray-300 text-sm">
              Generate professional plans in minutes, not hours.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">🤖 AI-Powered</h4>
            <p className="text-gray-300 text-sm">
              Leverage SISO's AI technology to create comprehensive proposals.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 rounded-lg border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Coming Soon</h3>
        <p className="text-gray-300">
          The App Plan Generator is being enhanced for the partner portal. 
          This tool will help you create detailed project proposals that demonstrate 
          SISO's AI development capabilities to your clients.
        </p>
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">In Development</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-300">Partner-Focused Design</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AppPlanGenerator;
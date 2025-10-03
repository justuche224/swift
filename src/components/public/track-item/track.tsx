"use client"

import Image from 'next/image';
import { Phone, MessageSquare, MapPin } from 'lucide-react';

export const Track = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
            <div className="w-full max-w-7xl flex gap-8 items-center">
                {/* Left Card Section */}
                <div className="w-full max-w-sm bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-800/50 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Shipment number</p>
                            <h2 className="text-white text-2xl font-semibold tracking-tight">SV-9029303930</h2>
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-500 text-sm font-medium">Active</span>
                        </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative w-full aspect-video mb-6 rounded-2xl overflow-hidden border border-gray-800/50">
                        <Image
                            src="/images/product-laptop.jpg"
                            alt="Shipment product"
                            fill
                            className="object-cover"
                            onError={(e) => {
                                // Fallback gradient if image doesn't exist
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-gray-900/40" 
                             style={{ display: 'none' }}
                             onLoad={(e) => e.currentTarget.style.display = 'block'}>
                        </div>
                    </div>

                    {/* Delivery Time */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-800/50">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="flex items-center gap-2 text-white">
                            <span className="text-xl font-semibold">2 days</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-xl font-semibold">12 hrs</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-xl font-semibold">35 mins</span>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <MapPin className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-1">8520 Preston</h3>
                            <p className="text-gray-400 text-sm">Rd. Inglewood, Maine 9478</p>
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-800">
                                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600"></div>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1">Receiver</p>
                                <p className="text-white font-semibold">Harry Benard</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 bg-green-500/20 hover:bg-green-500/30 rounded-full flex items-center justify-center transition-colors border border-green-500/30">
                                <Phone className="w-5 h-5 text-green-500" />
                            </button>
                            <button className="w-10 h-10 bg-green-500/20 hover:bg-green-500/30 rounded-full flex items-center justify-center transition-colors border border-green-500/30">
                                <MessageSquare className="w-5 h-5 text-green-500" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Map Section */}
                <div className="flex-1 relative h-[600px] flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/globe.png"
                            alt="World map"
                            fill
                            className="object-contain"
                            priority
                        />

                        {/* Tracking Points */}
                        {/* North America Point */}
                        <div className="absolute top-[35%] left-[20%]">
                            <div className="relative">
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-blue-500/30 rounded-full animate-ping"></div>
                            </div>
                        </div>

                        {/* Europe/Africa Point */}
                        <div className="absolute top-[45%] left-[48%]">
                            <div className="relative">
                                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-orange-500/30 rounded-full animate-ping"></div>
                            </div>
                        </div>

                        {/* Asia Point */}
                        <div className="absolute top-[38%] left-[72%]">
                            <div className="relative">
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-blue-500/30 rounded-full animate-ping"></div>
                            </div>
                        </div>

                        {/* Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
                            <line x1="20%" y1="35%" x2="48%" y2="45%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                            <line x1="48%" y1="45%" x2="72%" y2="38%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
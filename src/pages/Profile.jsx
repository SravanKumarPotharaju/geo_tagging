import React from "react";
import {
    User,
    Mail,
    MapPin,
    Shield,
    Settings,
    Bell,
    Lock,
    LogOut,
    ChevronRight,
    Camera,
    Award
} from "lucide-react";
import { Card } from "../components/common/Card";

export const Profile = () => {
    const user = {
        name: "John Farmer",
        role: "Head Agronomist",
        email: "john.farmer@geotag.ai",
        location: "Green Valley Farm, CA",
        joined: "January 2024",
        plantsTracked: 1254,
        healthScore: 98
    };

    const sections = [
        {
            title: "Account Settings",
            items: [
                { icon: User, label: "Personal Information", detail: "Edit your name and avatar" },
                { icon: Mail, label: "Email Notifications", detail: "Manage your alert preferences" },
                { icon: MapPin, label: "Farm Locations", detail: "Configure your primary farm zones" },
            ]
        },
        {
            title: "Security",
            items: [
                { icon: Lock, label: "Password & Security", detail: "Update your password and 2FA" },
                { icon: Shield, label: "Privacy Settings", detail: "Control what data is shared" },
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Profile Header */}
            <div className="relative">
                <div className="h-48 bg-gradient-to-r from-green-600 to-emerald-700 rounded-[2.5rem] shadow-lg overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }}></div>
                </div>

                <div className="px-8 -mt-20">
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center md:items-end gap-8 relative overflow-hidden">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-green-500 to-emerald-600 p-1 shadow-2xl relative z-10">
                                <div className="w-full h-full rounded-[2.3rem] bg-white flex items-center justify-center overflow-hidden">
                                    <User size={64} className="text-gray-200" />
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 p-2.5 bg-gray-900 text-white rounded-2xl shadow-xl hover:bg-green-600 transition-all z-20 group-hover:scale-110">
                                <Camera size={18} />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{user.name}</h1>
                                <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-green-100">
                                    Premium Member
                                </span>
                            </div>
                            <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mb-4">
                                <span className="text-green-600 font-bold">{user.role}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                {user.location}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4 border-t border-gray-50">
                                <div className="text-center md:text-left">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Memeber Since</p>
                                    <p className="text-sm font-bold text-gray-800">{user.joined}</p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Plants Tracked</p>
                                    <p className="text-sm font-bold text-gray-800">{user.plantsTracked.toLocaleString()}</p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Overall Health</p>
                                    <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                                        <Award size={14} />
                                        {user.healthScore}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">{section.title}</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {section.items.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <button key={i} className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                            <div className="flex items-center gap-5">
                                                <div className="p-3 bg-gray-50 rounded-2xl text-gray-500 group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                                                    <Icon size={20} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors">{item.label}</p>
                                                    <p className="text-xs text-gray-400 font-medium">{item.detail}</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Award className="text-green-400" />
                            Achievement
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            You've successfully tracked over 1,000 plants this season. Keep it up!
                        </p>
                        <button className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition-all shadow-lg shadow-green-600/20 text-sm">
                            View All Badges
                        </button>
                    </Card>

                    <button className="w-full group flex items-center justify-center gap-3 p-5 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold transition-all border border-red-100 overflow-hidden relative">
                        <div className="absolute inset-y-0 left-0 w-1 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Search, 
  Bell, 
  School, 
  Filter, 
  ChevronDown, 
  CheckCircle, 
  AlertCircle, 
  Home, 
  Compass, 
  Bookmark, 
  User, 
  PlusCircle, 
  FileText, 
  Upload, 
  Megaphone, 
  BarChart2, 
  Edit2, 
  Trash2, 
  ChevronRight,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Role = 'Student' | 'Admin';

interface Announcement {
  id: string;
  title: string;
  description: string;
  category: string;
  tag: string;
  time: string;
  isUrgent: boolean;
  isRead: boolean;
  isSaved: boolean;
}

// --- Components ---

const UnderConstruction = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-6">
    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
      <Megaphone className="w-10 h-10 text-primary" />
    </div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-slate-500 max-w-xs">We're working hard to bring this feature to you. Stay tuned for updates!</p>
    <div className="mt-8 flex gap-2">
      {[1, 2, 3].map(i => (
        <div key={i} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  </div>
);

const LoginScreen = ({ onLogin }: { onLogin: (role: Role) => void }) => {
  const [role, setRole] = useState<Role>('Student');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto border-x border-slate-100 dark:border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="flex items-center p-4">
        <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center text-lg font-bold pr-10">FUTO Connect</h2>
      </div>

      {/* Hero Image */}
      <div className="px-4 py-2">
        <div 
          className="w-full h-60 rounded-2xl bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBka40KlbZ0xzuZQ65WLda_y80p6A8tLQheHHO2QchGzwNUid8sAuH8UDxkeVFIFPsvKFr7H1pyMatVT3I7P-ukg68kqK-IkP2tdJfqJFSfhuVZD5UWTWc0uaD4GRPVguW9DSdn3-NQEFt7zNarvlkIt9SFa3AI0MmIhROqa9c2L0NC5dyYY2DPnu2F-_NZ5ECxnHB-ipU-1rSBy3nrXKBeUCnbDAizMlMI6XWafXSP8tLyyYiVwhNHhwxccm9Yj7T9zTwiEVRUiGCn")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="px-6 -mt-8 relative z-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-slate-500 dark:text-slate-400">Stay informed, stay ahead.</p>
      </div>

      {/* Role Toggle */}
      <div className="px-6 py-6">
        <div className="flex bg-primary/10 p-1.5 rounded-xl border border-primary/20">
          <button 
            onClick={() => setRole('Student')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === 'Student' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setRole('Admin')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === 'Admin' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500'}`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">FUTO Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="email" 
              placeholder={role === 'Student' ? 'student@futo.edu.ng' : 'admin@futo.edu.ng'}
              className="w-full bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <button className="text-xs font-medium text-primary hover:underline">Forgot?</button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="••••••••"
              className="w-full bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button 
          onClick={() => onLogin(role)}
          className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4"
        >
          Login to Portal
          <LogIn className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 py-4">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">or</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
        </div>

        <button className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with School Account
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 py-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          New to FUTO? <button className="text-primary font-bold hover:underline">Get Access</button>
        </p>
        <div className="mt-8 flex justify-center gap-6 text-slate-400">
          <button className="text-[10px] uppercase font-bold tracking-tighter hover:text-primary">Help Center</button>
          <button className="text-[10px] uppercase font-bold tracking-tighter hover:text-primary">Privacy Policy</button>
          <button className="text-[10px] uppercase font-bold tracking-tighter hover:text-primary">Terms of Use</button>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = ({ announcements, onMarkRead, onToggleSave, onLogout }: { 
  announcements: Announcement[], 
  onMarkRead: (id: string) => void,
  onToggleSave: (id: string) => void,
  onLogout: () => void 
}) => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Discover' | 'Saved' | 'Profile'>('Home');
  const [activeSetting, setActiveSetting] = useState<string | null>(null);

  const renderContent = () => {
    if (activeTab === 'Profile' && activeSetting) {
      const renderSettingPanel = () => {
        switch (activeSetting) {
          case 'Personal Information':
            return (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                    <input type="text" defaultValue="Chinedu Okafor" className="w-full bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                    <input type="tel" defaultValue="+234 801 234 5678" className="w-full bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Department</label>
                    <select className="w-full bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary">
                      <option>Software Engineering</option>
                      <option>Computer Science</option>
                      <option>Electrical Engineering</option>
                    </select>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20">Save Changes</button>
              </div>
            );
          case 'Notification Settings':
            return (
              <div className="space-y-4">
                {[
                  { label: 'Push Notifications', desc: 'Receive alerts on your device', icon: Bell },
                  { label: 'Email Notifications', desc: 'Get updates in your inbox', icon: Mail },
                  { label: 'Urgent Only', desc: 'Only notify for critical updates', icon: AlertCircle },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-bold text-sm">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                    <div className="w-10 h-5 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            );
          case 'Security & Password':
            return (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Two-Factor Authentication</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">Add an extra layer of security to your account.</p>
                    <button className="mt-2 text-xs font-bold text-blue-700 dark:text-blue-300 underline">Enable Now</button>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary text-slate-900 font-bold rounded-xl shadow-lg shadow-primary/20">Update Password</button>
              </div>
            );
          case 'Help & Support':
            return (
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="font-bold text-sm">Contact Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-bold text-sm">Frequently Asked Questions</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="font-bold text-sm mb-2">Report a Problem</p>
                  <textarea placeholder="Describe the issue you're facing..." className="w-full bg-white dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-lg p-3 text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-primary" />
                  <button className="w-full mt-3 py-2 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 text-xs font-bold rounded-lg">Submit Report</button>
                </div>
              </div>
            );
          default:
            return null;
        }
      };

      return (
        <div className="space-y-6 pb-24">
          <div className="flex items-center gap-4 pt-4">
            <button onClick={() => setActiveSetting(null)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">{activeSetting}</h2>
          </div>
          {renderSettingPanel()}
        </div>
      );
    }

    switch (activeTab) {
      case 'Home':
        return (
          <>
            {/* Filters */}
            <div className="flex gap-3 mb-6 overflow-x-auto hide-scrollbar pb-2">
              <button className="flex shrink-0 items-center gap-2 px-4 py-2 bg-primary/20 text-slate-900 dark:text-slate-100 rounded-full text-sm font-medium border border-primary/30">
                <Filter className="w-4 h-4" />
                Faculty
              </button>
              <button className="flex shrink-0 items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700">
                Level
              </button>
              <button className="flex shrink-0 items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700">
                Category
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Latest Updates</h2>
              <div className="text-sm text-slate-500">Showing {announcements.length} announcements</div>
            </div>

            {/* Grid */}
            <div className="space-y-6 pb-24">
              {announcements.map((announcement) => (
                <motion.article 
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1 ${
                      announcement.isUrgent ? 'bg-red-100 text-red-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {announcement.isUrgent && <AlertCircle className="w-3 h-3" />}
                      {announcement.category}
                    </span>
                    <span className="text-xs text-slate-400">{announcement.time}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 leading-tight">{announcement.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
                    {announcement.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[11px] font-semibold rounded">
                      {announcement.tag}
                    </span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onToggleSave(announcement.id)}
                        className={`p-1 transition-colors ${announcement.isSaved ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
                      >
                        <Bookmark className={`w-5 h-5 ${announcement.isSaved ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={() => onMarkRead(announcement.id)}
                        className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                          announcement.isRead ? 'text-primary' : 'text-slate-400 hover:text-primary'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {announcement.isRead ? 'Read' : 'Mark'}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        );
      case 'Discover':
        return <UnderConstruction title="Discover FUTO" />;
      case 'Saved':
        return <UnderConstruction title="Saved Announcements" />;
      case 'Profile':
        return (
          <div className="space-y-8 pb-24">
            <div className="flex flex-col items-center text-center pt-6">
              <div className="w-24 h-24 rounded-full border-4 border-primary/30 p-1 mb-4">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoHXaGuxoa3itr9jjqn0ZIE4N4v2NrFaqjH347WiZrOFyoD8b3F0PzaH_rJIiFK8LiSi_NOcIKiaJrJIEWvDWYlM_zGZwFu35zfqtXt1tkhh94d3GoX7vCn5yC1wkmCylIQJjbLwVXRzQJ2ZBDJW00kVjCKiD72oel6I_q5_WB_xBPiKfKXkTq1LlDl3jKjXZTin8VKz_ivfelakmL-d-AIFzsrje8PVBWxu7MEnlk4qV3813kqSk2Gu9q7OKnStXW1kAWVfsLCOWK" 
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold">Chinedu Okafor</h2>
              <p className="text-slate-500">20211234567 • 300L • SEET</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Settings</h3>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { label: 'Personal Information', icon: User },
                  { label: 'Notification Settings', icon: Bell },
                  { label: 'Security & Password', icon: Lock },
                  { label: 'Help & Support', icon: School },
                ].map((item, i) => (
                  <button key={i} onClick={() => setActiveSetting(item.label)} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-slate-400" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={onLogout}
              className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all"
            >
              Logout
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto border-x border-slate-100 dark:border-slate-800 shadow-2xl relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <School className="w-5 h-5 text-background-dark" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">FUTO</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-600 dark:text-slate-300">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            <button 
              onClick={() => setActiveTab('Profile')}
              className="w-8 h-8 rounded-full overflow-hidden border border-primary/30"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoHXaGuxoa3itr9jjqn0ZIE4N4v2NrFaqjH347WiZrOFyoD8b3F0PzaH_rJIiFK8LiSi_NOcIKiaJrJIEWvDWYlM_zGZwFu35zfqtXt1tkhh94d3GoX7vCn5yC1wkmCylIQJjbLwVXRzQJ2ZBDJW00kVjCKiD72oel6I_q5_WB_xBPiKfKXkTq1LlDl3jKjXZTin8VKz_ivfelakmL-d-AIFzsrje8PVBWxu7MEnlk4qV3813kqSk2Gu9q7OKnStXW1kAWVfsLCOWK" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 w-full overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 pb-6 pt-2 z-50">
        <div className="flex justify-around">
          <button 
            onClick={() => setActiveTab('Home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'Home' ? 'text-primary' : 'text-slate-400'}`}
          >
            <Home className={`w-6 h-6 ${activeTab === 'Home' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('Discover')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'Discover' ? 'text-primary' : 'text-slate-400'}`}
          >
            <Compass className={`w-6 h-6 ${activeTab === 'Discover' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">Discover</span>
          </button>
          <button 
            onClick={() => setActiveTab('Saved')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'Saved' ? 'text-primary' : 'text-slate-400'}`}
          >
            <Bookmark className={`w-6 h-6 ${activeTab === 'Saved' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">Saved</span>
          </button>
          <button 
            onClick={() => setActiveTab('Profile')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'Profile' ? 'text-primary' : 'text-slate-400'}`}
          >
            <User className={`w-6 h-6 ${activeTab === 'Profile' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

const AdminDashboard = ({ announcements, onPublish, onUpdate, onDelete, onLogout }: { 
  announcements: Announcement[], 
  onPublish: (data: any) => void,
  onUpdate: (id: string, data: any) => void,
  onDelete: (id: string) => void,
  onLogout: () => void 
}) => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Manage' | 'Analytics' | 'Profile'>('Home');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Academic');
  const [tag, setTag] = useState('GENERAL');

  const startEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setCategory(announcement.category);
    setTag(announcement.tag);
    setIsUrgent(announcement.isUrgent);
    setActiveTab('Manage');
  };

  const handleSubmit = () => {
    if (!title || !description) return;
    const data = { title, description, category, tag, isUrgent };
    if (editingId) {
      onUpdate(editingId, data);
      setEditingId(null);
    } else {
      onPublish(data);
    }
    setTitle('');
    setDescription('');
    setIsUrgent(false);
    setActiveTab('Home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <div className="space-y-6 pb-24">
            <div className="flex items-center justify-between px-4 mt-6">
              <h2 className="text-xl font-bold">Recent Announcements</h2>
              <span className="text-xs font-medium text-slate-500">Total: {announcements.length}</span>
            </div>
            <div className="space-y-4 px-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm line-clamp-1">{announcement.title}</h3>
                    <span className="text-[10px] text-slate-400">{announcement.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">{announcement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded">{announcement.tag}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(announcement)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(announcement.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Manage':
        return (
          <section className="px-4 py-6 pb-24">
            <div className="flex items-center gap-2 mb-6">
              <PlusCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">{editingId ? 'Edit Announcement' : 'New Announcement'}</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Semester Registration Deadline"
                  className="w-full rounded-xl border-primary/20 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary text-base px-4 py-3 outline-none ring-1 ring-primary/10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed information for students..."
                  className="w-full rounded-xl border-primary/20 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary text-base px-4 py-3 min-h-[120px] outline-none ring-1 ring-primary/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                  <div className="relative">
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border-primary/20 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm px-4 py-3 appearance-none outline-none ring-1 ring-primary/10"
                    >
                      <option>Academic</option>
                      <option>Social</option>
                      <option>Admin</option>
                      <option>Exam</option>
                      <option>Urgent</option>
                      <option>Events</option>
                      <option>General</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Tag</label>
                  <div className="relative">
                    <select 
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full rounded-xl border-primary/20 bg-white dark:bg-slate-900 focus:border-primary focus:ring-primary text-sm px-4 py-3 appearance-none outline-none ring-1 ring-primary/10"
                    >
                      <option>GENERAL</option>
                      <option>EXAMS</option>
                      <option>SPORTS</option>
                      <option>RESULTS</option>
                      <option>WORKSHOP</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-primary/10">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="font-semibold text-sm">Mark as Urgent</p>
                    <p className="text-xs text-slate-500">Sends immediate notification</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${isUrgent ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isUrgent ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex gap-3 mt-2">
                {editingId && (
                  <button 
                    onClick={() => {
                      setEditingId(null);
                      setTitle('');
                      setDescription('');
                      setActiveTab('Home');
                    }}
                    className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 font-bold py-4 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  onClick={handleSubmit}
                  className="flex-[2] bg-primary hover:bg-primary/90 text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  {editingId ? 'Update' : 'Publish'}
                </button>
              </div>
            </div>
          </section>
        );
      case 'Analytics':
        return <UnderConstruction title="Admin Analytics" />;
      case 'Profile':
        return (
          <div className="space-y-8 pb-24 px-4 pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Admin Portal</h2>
              <p className="text-slate-500">University Administration</p>
            </div>
            <button 
              onClick={onLogout}
              className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all"
            >
              Logout
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto border-x border-slate-100 dark:border-slate-800 shadow-2xl relative">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
            <School className="w-5 h-5 text-background-dark" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">Admin</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
          <Bell className="w-6 h-6" />
        </button>
      </div>

      <main className="flex-1 w-full overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 pb-6 pt-2 z-50">
        <div className="flex justify-around">
          <button 
            onClick={() => setActiveTab('Home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'Home' ? 'text-primary' : 'text-slate-400'}`}
          >
            <Home className={`w-6 h-6 ${activeTab === 'Home' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('Manage')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'Manage' ? 'text-primary' : 'text-slate-400'}`}
          >
            <Megaphone className={`w-6 h-6 ${activeTab === 'Manage' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">Manage</span>
          </button>
          <button 
            onClick={() => setActiveTab('Analytics')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'Analytics' ? 'text-primary' : 'text-slate-400'}`}
          >
            <BarChart2 className={`w-6 h-6 ${activeTab === 'Analytics' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">Analytics</span>
          </button>
          <button 
            onClick={() => setActiveTab('Profile')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'Profile' ? 'text-primary' : 'text-slate-400'}`}
          >
            <User className={`w-6 h-6 ${activeTab === 'Profile' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<'Login' | 'Student' | 'Admin'>('Login');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
  };

  const handleLogin = (role: Role) => {
    setScreen(role);
  };

  const handleLogout = () => {
    setScreen('Login');
  };

  const handlePublish = async (data: any) => {
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) fetchAnnouncements();
    } catch (err) {
      console.error('Failed to publish:', err);
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) fetchAnnouncements();
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAnnouncements();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch(`/api/announcements/${id}/read`, { method: 'PATCH' });
      if (res.ok) fetchAnnouncements();
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const handleToggleSave = async (id: string) => {
    try {
      const res = await fetch(`/api/announcements/${id}/toggle-save`, { method: 'PATCH' });
      if (res.ok) fetchAnnouncements();
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <AnimatePresence mode="wait">
        {screen === 'Login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        )}
        {screen === 'Student' && (
          <motion.div
            key="student"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StudentDashboard 
              announcements={announcements} 
              onMarkRead={handleMarkRead}
              onToggleSave={handleToggleSave}
              onLogout={handleLogout} 
            />
          </motion.div>
        )}
        {screen === 'Admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AdminDashboard 
              announcements={announcements} 
              onPublish={handlePublish}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onLogout={handleLogout} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

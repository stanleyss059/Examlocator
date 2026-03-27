import { Shield, Users, Calendar, BookOpen, TrendingUp, Activity, AlertCircle, Search, Plus, Filter, ArrowRight, LayoutDashboard, FileText, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

export const Route = {
    component: AdminDashboardPage,
}

export function AdminDashboardPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState('all')

    // Sample data
    const stats = {
        totalUsers: 1234,
        totalExams: 89,
        activeExams: 12,
        totalStaff: 45,
        totalStudents: 1189
    }

    const recentActivity = [
        { id: 1, type: 'exam_created', message: 'New exam "CS 301 Midterm" created', time: '2 hours ago', user: 'John Smith' },
        { id: 2, type: 'user_registered', message: 'New student registration: Emily Davis', time: '3 hours ago', user: 'System' },
        { id: 3, type: 'request_approved', message: 'Profile edit request approved for Aseda Nyamekye', time: '4 hours ago', user: 'Admin' },
        { id: 4, type: 'exam_completed', message: 'Exam "Math 101 Final" completed', time: '5 hours ago', user: 'Sarah Johnson' },
        { id: 5, type: 'request_pending', message: 'New profile edit request from Kofi Mensah', time: '6 hours ago', user: 'System' },
        { id: 6, type: 'user_updated', message: 'Staff profile updated: Michael Brown', time: '1 day ago', user: 'Admin' },
        { id: 7, type: 'request_rejected', message: 'Profile edit request rejected for Yaw Boateng', time: '1 day ago', user: 'Admin' },
        { id: 8, type: 'exam_created', message: 'New exam "PHYS 201 Quiz" created', time: '1 day ago', user: 'Dr. Wilson' },
    ]

    const upcomingExams = [
        { id: 1, course: 'CS 301', title: 'Data Structures Midterm', date: '2026-02-15', time: '09:00', students: 45, room: 'A-102' },
        { id: 2, course: 'MATH 201', title: 'Calculus Final', date: '2026-02-16', time: '14:00', students: 62, room: 'Hall B' },
        { id: 3, course: 'PHYS 101', title: 'Physics Quiz', date: '2026-02-17', time: '10:00', students: 38, room: 'Lab 3' },
        { id: 4, course: 'CHEM 201', title: 'Organic Chemistry', date: '2026-02-18', time: '13:00', students: 55, room: 'Lab 5' },
    ]

    const getActivityIcon = (type) => {
        switch (type) {
            case 'exam_created': return <BookOpen size={16} />
            case 'user_registered': return <Users size={16} />
            case 'exam_completed': return <Calendar size={16} />
            case 'user_updated': return <Activity size={16} />
            case 'request_pending': return <FileText size={16} />
            case 'request_approved': return <CheckCircle size={16} />
            case 'request_rejected': return <XCircle size={16} />
            default: return <AlertCircle size={16} />
        }
    }

    const getActivityStyle = (type) => {
        switch (type) {
            case 'exam_created': return 'activity-exam'
            case 'user_registered': return 'activity-user'
            case 'exam_completed': return 'activity-complete'
            case 'user_updated': return 'activity-update'
            case 'request_pending': return 'activity-request-pending'
            case 'request_approved': return 'activity-request-approved'
            case 'request_rejected': return 'activity-request-rejected'
            default: return 'activity-default'
        }
    }

    const filteredActivity = recentActivity.filter(activity => {
        const matchesSearch = activity.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             activity.user.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterType === 'all' || activity.type === filterType
        return matchesSearch && matchesFilter
    })

    return (
        <div className="admin-dashboard-page">
            {/* Header */}
            <div className="admin-header">
                <LayoutDashboard size={26} />
                <div className="headercontent">
                    <h1>Admin Dashboard</h1>
                    <p className='subtext'>System overview and management center</p>
                </div>
            </div>

            <div className="main-content">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card primary">
                        <div className="stat-icon">
                            <Users size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.totalUsers}</h3>
                            <p>Total Users</p>
                            <div className="stat-breakdown">
                                <span className="staff-count">{stats.totalStaff} Staff</span>
                                <span className="student-count">{stats.totalStudents} Students</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div className="stat-icon">
                            <BookOpen size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.totalExams}</h3>
                            <p>Total Exams</p>
                            <div className="stat-breakdown">
                                <span className="active-count">{stats.activeExams} Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card secondary">
                        <div className="stat-icon">
                            <TrendingUp size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>87%</h3>
                            <p>Completion Rate</p>
                            <div className="stat-breakdown">
                                <span className="trend-up">↑ 5% from last week</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="action-bar">
                    <div className="search-filter-group">
                        <div className="search-box">
                            <Search size={18} />
                            <input 
                                type="text" 
                                placeholder="Search activity..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="filter-dropdown">
                            <Filter size={18} />
                            <select 
                                value={filterType} 
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="all">All Activity</option>
                                <option value="exam_created">Exam Created</option>
                                <option value="user_registered">User Registered</option>
                                <option value="exam_completed">Exam Completed</option>
                                <option value="request_pending">Request Pending</option>
                                <option value="request_approved">Request Approved</option>
                                <option value="request_rejected">Request Rejected</option>
                            </select>
                        </div>
                    </div>
                    <button className="add-student-btn">
                        <Plus size={18} />
                        Create Exam
                    </button>
                </div>

                {/* Content Sections */}
                <div className="content-grid dashboard-grid">
                    {/* Recent Activity */}
                    <div className="content-section activity-section">
                        <div className="section-header">
                            <h2>Recent Activity</h2>
                            <span className="activity-count">{filteredActivity.length} activities</span>
                        </div>
                        <div className="activity-list">
                            {filteredActivity.map((activity) => (
                                <div key={activity.id} className={`activity-item ${getActivityStyle(activity.type)}`}>
                                    <div className="activity-icon">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="activity-content">
                                        <p className="activity-message">{activity.message}</p>
                                        <div className="activity-meta">
                                            <span className="activity-user">{activity.user}</span>
                                            <span className="activity-time">{activity.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Exams */}
                    <div className="content-section exams-section">
                        <div className="section-header">
                            <h2>Upcoming Exams</h2>
                            <span className="exam-count">{upcomingExams.length} exams</span>
                        </div>
                        <div className="upcoming-exams-list">
                            {upcomingExams.map((exam) => (
                                <div key={exam.id} className="exam-card">
                                    <div className="exam-info">
                                        <div className="exam-header-row">
                                            <span className="exam-course">{exam.course}</span>
                                            <span className="exam-date">{exam.date}</span>
                                        </div>
                                        <div className="exam-title">{exam.title}</div>
                                        <div className="exam-details">
                                            <span className="exam-time">{exam.time}</span>
                                            <span className="exam-room">{exam.room}</span>
                                            <span className="exam-students">
                                                <Users size={12} />
                                                {exam.students}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="info-cards-grid">
                    <div className="info-card">
                        <div className="info-icon users">
                            <Shield size={20} />
                        </div>
                        <div className="info-content">
                            <h4>Manage Users</h4>
                            <p>View and manage all system users</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon export">
                            <FileText size={20} />
                        </div>
                        <div className="info-content">
                            <h4>View Reports</h4>
                            <p>Access system reports and analytics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
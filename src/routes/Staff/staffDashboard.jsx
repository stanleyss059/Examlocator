import { Shield, Search, Plus, MapPin, Calendar, Clock, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const Route = {
  component: StaffdashboardPage,
}

const examData = [
  {
    id: 1,
    code: 'CS 301',
    name: 'Data Structures and Algorithms',
    date: '2026-02-15',
    time: '09:00 – 12:00',
    room: 'A-102',
    status: 'upcoming'
  },
  {
    id: 2,
    code: 'CS 305',
    name: 'Operating Systems',
    date: '2026-02-18',
    time: '14:00 – 17:00',
    room: 'Lab 3',
    status: 'upcoming'
  },
  {
    id: 3,
    code: 'CS 310',
    name: 'Database Management Systems',
    date: '2026-02-20',
    time: '09:00 – 12:00',
    room: 'Hall B',
    status: 'upcoming'
  },
  {
    id: 4,
    code: 'CS 203',
    name: 'Introduction to Programming',
    date: '2026-02-03',
    time: '14:00 – 17:00',
    room: 'C-205',
    status: 'ongoing'
  },
  {
    id: 5,
    code: 'CS 201',
    name: 'Discrete Mathematics',
    date: '2026-01-25',
    time: '14:00 – 17:00',
    room: 'A-101',
    status: 'completed'
  }
]

export function StaffdashboardPage(){
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const totalExams = examData.length
    const upcomingExams = examData.filter(e => e.status === 'upcoming').length
    const ongoingExams = examData.filter(e => e.status === 'ongoing').length
    const completedExams = examData.filter(e => e.status === 'completed').length

    const filteredExams = examData.filter(exam =>
        exam.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.room.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <div className="staff-dashboard">
            {/* HEADER */}
            <div className="staff-header">
                <Shield size={26} />
                <div className="headercontent">
                    <h1>Exam Location Assignment</h1>
                    <p className='subtext'>Assign and manage exam rooms and locations for all courses</p>
                </div>
            </div>
            {/* main */}
            <div className="main-content">
                {/* Search and Actions */}
                <div className="exam-controls">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search courses, rooms, buildings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="assign-exam-btn" onClick={() => navigate({ to: '/staff/assignNewExam' })}>
                        <Plus size={18} />
                        Assign New Exam
                    </button>
                </div>

                {/* Stats */}
                <div className="exam-stats">
                    <div className="stat-item">
                        <MapPin size={16} />
                        <span className="stat-value">{totalExams}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-item stat-upcoming">
                        <Calendar size={16} />
                        <span className="stat-value">{upcomingExams}</span>
                        <span className="stat-label">Upcoming</span>
                    </div>
                    <div className="stat-item stat-ongoing">
                        <Clock size={16} />
                        <span className="stat-value">{ongoingExams}</span>
                        <span className="stat-label">Ongoing</span>
                    </div>
                    <div className="stat-item stat-completed">
                        <Calendar size={16} />
                        <span className="stat-value">{completedExams}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </div>

                {/* Exam Table */}
                <div className="exam-table-container">
                    <table className="exam-table">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Date & Time</th>
                                <th>Room</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExams.map((exam) => (
                                <tr key={exam.id}>
                                    <td>
                                        <div className="course-info">
                                            <span className="course-codes">{exam.code}</span>
                                            <span className="course-name">{exam.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="datetime-info">
                                            <span className="exam-date">{exam.date}</span>
                                            <span className="exam-time">{exam.time}</span>
                                        </div>
                                    </td>
                                    <td>{exam.room}</td>
                                    <td>
                                        <span className={`status-badge status-${exam.status}`}>
                                            {exam.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="action-btn edit-btn" onClick={() => navigate({ to: '/staff/editExam' })}>
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="action-btn delete-btn">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
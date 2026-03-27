import { Users, GraduationCap, Search, Plus, Filter, MoreVertical, Edit, Trash2, Mail, Calendar, CheckCircle, X } from 'lucide-react'
import { useState } from 'react'

export const Route = {
    component: AdminStudPage,
}

export function AdminStudPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deletingStudent, setDeletingStudent] = useState(null)
    const [editingStudent, setEditingStudent] = useState(null)
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        level: '',
        status: 'active'
    })

    // Sample student data
    const students = [
        { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '+1 234-567-8901', course: 'Computer Science', level: '300', status: 'active', lastActive: '2 hours ago', examsTaken: 12 },
        { id: 2, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1 234-567-8902', course: 'Mathematics', level: '200', status: 'active', lastActive: '5 hours ago', examsTaken: 8 },
        { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '+1 234-567-8903', course: 'Physics', level: '400', status: 'inactive', lastActive: '3 days ago', examsTaken: 15 },
        { id: 4, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', phone: '+1 234-567-8904', course: 'Chemistry', level: '100', status: 'active', lastActive: '1 hour ago', examsTaken: 5 },
        { id: 5, name: 'David Wilson', email: 'david.wilson@example.com', phone: '+1 234-567-8905', course: 'Biology', level: '300', status: 'suspended', lastActive: '1 week ago', examsTaken: 0 },
        { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@example.com', phone: '+1 234-567-8906', course: 'Engineering', level: '200', status: 'active', lastActive: '30 minutes ago', examsTaken: 10 },
    ]

    const stats = {
        totalStudents: 1189,
        activeStudents: 1056,
        newThisMonth: 45,
        averageExams: 8.5
    }

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             student.course.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterStatus === 'all' || student.status === filterStatus
        return matchesSearch && matchesFilter
    })

    const openEditModal = (student) => {
        setEditingStudent(student)
        setEditForm({
            name: student.name,
            email: student.email,
            phone: student.phone,
            course: student.course,
            level: student.level,
            status: student.status
        })
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
        setEditingStudent(null)
    }

    const openAddModal = () => {
        setEditForm({
            name: '',
            email: '',
            phone: '',
            course: '',
            level: '',
            status: 'active'
        })
        setIsAddModalOpen(true)
    }

    const closeAddModal = () => {
        setIsAddModalOpen(false)
    }

    const openDeleteModal = (student) => {
        setDeletingStudent(student)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setDeletingStudent(null)
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()
        console.log('New student:', editForm)
        closeAddModal()
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Updated student:', { ...editingStudent, ...editForm })
        closeEditModal()
    }

    const styles = {
        active: 'status-active',
        inactive: 'status-inactive',
        suspended: 'status-suspended'
    }
    const getStatusBadge = (status) => {
        return <span className={`status-badge ${styles[status]}`}>{status}</span>
    }

    return (
        <div className="admin-student-page">
            {/* Header */}
            <div className="admin-header">
                <GraduationCap size={26} />
                <div className="headercontent">
                    <h1>Student Management</h1>
                    <p className='subtext'>Manage student accounts and monitor activity</p>
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
                            <h3>{stats.totalStudents}</h3>
                            <p>Total Students</p>
                            <div className="stat-breakdown">
                                <span className="trend-up">↑ {stats.newThisMonth} new this month</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div className="stat-icon">
                            <CheckCircle size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.activeStudents}</h3>
                            <p>Active Students</p>
                            <div className="stat-breakdown">
                                <span className="active-count">{Math.round((stats.activeStudents/stats.totalStudents)*100)}% of total</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card secondary">
                        <div className="stat-icon">
                            <Calendar size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.averageExams}</h3>
                            <p>Avg. Exams/Student</p>
                            <div className="stat-breakdown">
                                <span className="trend-up">↑ 12% from last month</span>
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
                                placeholder="Search students..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="filter-dropdown">
                            <Filter size={18} />
                            <select 
                                value={filterStatus} 
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                    </div>
                    <button className="add-student-btn" onClick={openAddModal}>
                        <Plus size={18} />
                        Add Student
                    </button>
                </div>

                {/* Students Table */}
                <div className="content-section">
                    <div className="section-header">
                        <h2>All Students</h2>
                        <span className="student-count">{filteredStudents.length} students</span>
                    </div>
                    
                    <div className="students-table-container">
                        <table className="students-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Course</th>
                                    <th>Level</th>
                                    <th>Status</th>
                                    <th>Last Active</th>
                                    <th>Exams</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>
                                            <div className="student-info">
                                                <div className="student-avatar">
                                                    {student.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="student-details">
                                                    <p className="student-name">{student.name}</p>
                                                    <p className="student-email">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{student.course}</td>
                                        <td>{student.level}</td>
                                        <td>{getStatusBadge(student.status)}</td>
                                        <td>{student.lastActive}</td>
                                        <td>{student.examsTaken}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn" title="Edit" onClick={() => openEditModal(student)}>
                                                    <Edit size={16} />
                                                </button>
                                                <button className="action-btn delete-btn" title="Delete" onClick={() => openDeleteModal(student)}>
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="action-btn" title="More">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="info-cards-grid">
                    <div className="info-card">
                        <div className="info-icon email">
                            <Mail size={20} />
                        </div>
                        <div className="info-content">
                            <h4>Bulk Email</h4>
                            <p>Send announcements to all students</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon export">
                            <Users size={20} />
                        </div>
                        <div className="info-content">
                            <h4>Export Data</h4>
                            <p>Download student records as CSV</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Student Modal */}
            {isEditModalOpen && (
                <div className="modal-overlay" onClick={closeEditModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Student</h2>
                            <button className="modal-close-btn" onClick={closeEditModal}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="modal-form">
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="edit-name">Full Name</label>
                                    <input
                                        type="text"
                                        id="edit-name"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label htmlFor="edit-email">Email</label>
                                    <input
                                        type="email"
                                        id="edit-email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="edit-phone">Phone Number</label>
                                    <input
                                        type="text"
                                        id="edit-phone"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label htmlFor="edit-course">Course</label>
                                    <input
                                        type="text"
                                        id="edit-course"
                                        value={editForm.course}
                                        onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="edit-level">Level</label>
                                    <select
                                        id="edit-level"
                                        value={editForm.level}
                                        onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                                        required
                                    >
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                        <option value="300">300</option>
                                        <option value="400">400</option>
                                    </select>
                                </div>
                                <div className="modal-form-group">
                                    <label htmlFor="edit-status">Status</label>
                                    <select
                                        id="edit-status"
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="modal-cancel-btn" onClick={closeEditModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="modal-save-btn">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Student Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay" onClick={closeAddModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Student</h2>
                            <button className="modal-close-btn" onClick={closeAddModal}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="modal-form">
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="add-name">Full Name</label>
                                    <input
                                        type="text"
                                        id="add-name"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label htmlFor="add-email">Email</label>
                                    <input
                                        type="email"
                                        id="add-email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="add-phone">Phone Number</label>
                                    <input
                                        type="text"
                                        id="add-phone"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label htmlFor="add-course">Course</label>
                                    <input
                                        type="text"
                                        id="add-course"
                                        value={editForm.course}
                                        onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                                        placeholder="Enter course"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="add-level">Level</label>
                                    <select
                                        id="add-level"
                                        value={editForm.level}
                                        onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                                        required
                                    >
                                        <option value="">Select level</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                        <option value="300">300</option>
                                        <option value="400">400</option>
                                    </select>
                                </div>
                                <div className="modal-form-group">
                                    <label htmlFor="add-status">Status</label>
                                    <select
                                        id="add-status"
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="modal-cancel-btn" onClick={closeAddModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="modal-save-btn">
                                    Add Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="modal-overlay" onClick={closeDeleteModal}>
                    <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Confirm Delete</h2>
                            <button className="modal-close-btn" onClick={closeDeleteModal}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="delete-modal-body">
                            <p className="delete-message">
                                Are you sure you want to delete <strong>{deletingStudent?.name}</strong>?
                            </p>
                            <p className="delete-warning">This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="modal-cancel-btn" onClick={closeDeleteModal}>
                                Cancel
                            </button>
                            <button type="button" className="modal-delete-btn" onClick={handleDeleteConfirm}>
                                Delete Student
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
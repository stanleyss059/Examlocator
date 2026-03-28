import { Users, Briefcase, Search, Plus, Filter, MoreVertical, Edit, Trash2, Mail, Calendar, CheckCircle, Shield, X, AlertTriangle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export const Route = {
    component: AdminStaffPage,
}

export function AdminStaffPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterRole, setFilterRole] = useState('all')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deletingStaff, setDeletingStaff] = useState(null)
    const [editingStaff, setEditingStaff] = useState(null)
    const [editForm, setEditForm] = useState({
        fullName: '',
        staffId: '',
        number: '',
        email: '',
        department: '',
        status: 'active'
    })

    // Sample staff data
    const staff = [
        { id: 1, fullName: 'Dr. Robert Chen', staffId: 'STF001', number: '+1 234-567-8901', email: 'robert.chen@example.com', department: 'Computer Science', course: 'CS 301', status: 'active' },
        { id: 2, fullName: 'Prof. Maria Garcia', staffId: 'STF002', number: '+1 234-567-8902', email: 'maria.garcia@example.com', department: 'Mathematics', course: 'MATH 201', status: 'active' },
        { id: 3, fullName: 'Dr. James Wilson', staffId: 'STF003', number: '+1 234-567-8903', email: 'james.wilson@example.com', department: 'Physics', course: 'PHYS 101', status: 'inactive' },
        { id: 4, fullName: 'Prof. Amanda Lee', staffId: 'STF004', number: '+1 234-567-8904', email: 'amanda.lee@example.com', department: 'Chemistry', course: 'CHEM 201', status: 'active' },
        { id: 5, fullName: 'Dr. Michael Brown', staffId: 'STF005', number: '+1 234-567-8905', email: 'michael.brown@example.com', department: 'Biology', course: 'BIO 101', status: 'suspended' },
        { id: 6, fullName: 'Prof. Sarah Johnson', staffId: 'STF006', number: '+1 234-567-8906', email: 'sarah.johnson@example.com', department: 'Engineering', course: 'ENG 301', status: 'active' },
    ]

    const stats = {
        totalStaff: 45,
        activeStaff: 40,
        newThisMonth: 3,
        averageExams: 10.5
    }

    const filteredStaff = staff.filter(member => {
        const matchesSearch = member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             member.staffId.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterRole === 'all' || member.status === filterRole
        return matchesSearch && matchesFilter
    })

    const getStatusBadge = (status) => {
        const styles = {
            active: 'status-active',
            inactive: 'status-inactive',
            suspended: 'status-suspended'
        }
        return <span className={`status-badge ${styles[status]}`}>{status}</span>
    }

    const getRoleBadge = (role) => {
        const roleStyles = {
            'HOD': 'role-hod',
            'Professor': 'role-professor',
            'Lecturer': 'role-lecturer'
        }
        return <span className={`role-badge ${roleStyles[role] || 'role-default'}`}>{role}</span>
    }

    const openEditModal = (member) => {
        setEditingStaff(member)
        setEditForm({
            fullName: member.fullName,
            staffId: member.staffId,
            number: member.number,
            email: member.email,
            department: member.department,
            status: member.status
        })
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
        setEditingStaff(null)
    }

    const openAddModal = () => {
        setEditForm({
            fullName: '',
            staffId: '',
            number: '',
            email: '',
            department: '',
            status: 'active'
        })
        setIsAddModalOpen(true)
    }

    const closeAddModal = () => {
        setIsAddModalOpen(false)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        console.log('Updated staff:', { ...editingStaff, ...editForm })
        closeEditModal()
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()
        console.log('New staff:', editForm)
        closeAddModal()
    }

    const openDeleteModal = (member) => {
        setDeletingStaff(member)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setDeletingStaff(null)
    }

    const handleDeleteConfirm = () => {
        console.log('Deleted staff:', deletingStaff)
        closeDeleteModal()
    }

    return (
        <div className="admin-staff-page">
            {/* Header */}
            <div className="admin-header">
                <Shield size={26} />
                <div className="headercontent">
                    <h1>Staff Management</h1>
                    <p className='subtext'>Manage staff accounts and monitor activities</p>
                </div>
            </div>

            <div className="main-content">

                {/* Action Bar */}
                <div className="action-bar">
                    <div className="search-filter-group">
                        <div className="search-box">
                            <Search size={18} />
                            <input 
                                type="text" 
                                placeholder="Search staff..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="filter-dropdown">
                            <Filter size={18} />
                            <select 
                                value={filterRole} 
                                onChange={(e) => setFilterRole(e.target.value)}
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
                        Add Staff
                    </button>
                </div>

                {/* Staff Table */}
                <div className="content-section">
                    <div className="section-header">
                        <h2>All Staff</h2>
                        <span className="student-count">{filteredStaff.length} staff members</span>
                    </div>
                    
                    <div className="students-table-container">
                        <table className="students-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Staff ID</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStaff.map((member) => (
                                    <tr key={member.id}>
                                        <td>
                                            <div className="student-info">
                                                <div className="staff-avatar">
                                                    {member.fullName.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="student-details">
                                                    <p className="student-name">{member.fullName}</p>
                                                    
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="staff-id">{member.staffId}</span></td>
                                        <td className='numbers'>{member.number}</td>
                                        <td>{member.email}</td>
                                        <td>{member.department}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn" title="Edit" onClick={() => openEditModal(member)}>
                                                    <Edit size={16} />
                                                </button>
                                                <button className="action-btn delete-btn" title="Delete" onClick={() => openDeleteModal(member)}>
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
                            <p>Send announcements to all staff</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon export">
                            <Calendar size={20} />
                        </div>
                        <div className="info-content">
                            <h4>Assign Exam</h4>
                            <p>Assign exam creation to staff</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Staff Modal */}
            {isEditModalOpen && (
                <div className="modal-overlay" onClick={closeEditModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Staff</h2>
                            <button className="modal-close-btn" onClick={closeEditModal}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="modal-form">
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="edit-fullName">Full Name</label>
                                    <input
                                        type="text"
                                        id="edit-fullName"
                                        value={editForm.fullName}
                                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label htmlFor="edit-staffId">Staff ID</label>
                                    <input
                                        type="text"
                                        id="edit-staffId"
                                        value={editForm.staffId}
                                        onChange={(e) => setEditForm({ ...editForm, staffId: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="edit-number">Phone Number</label>
                                    <input
                                        type="text"
                                        id="edit-number"
                                        value={editForm.number}
                                        onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
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
                                    <label htmlFor="edit-department">Department</label>
                                    <input
                                        type="text"
                                        id="edit-department"
                                        value={editForm.department}
                                        onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                                        required
                                    />
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

            {/* Add Staff Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay" onClick={closeAddModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Staff</h2>
                            <button className="modal-close-btn" onClick={closeAddModal}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="modal-form">
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="add-fullName">Full Name</label>
                                    <input
                                        type="text"
                                        id="add-fullName"
                                        value={editForm.fullName}
                                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label htmlFor="add-staffId">Staff ID</label>
                                    <input
                                        type="text"
                                        id="add-staffId"
                                        value={editForm.staffId}
                                        onChange={(e) => setEditForm({ ...editForm, staffId: e.target.value })}
                                        placeholder="Enter staff ID"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label htmlFor="add-number">Phone Number</label>
                                    <input
                                        type="text"
                                        id="add-number"
                                        value={editForm.number}
                                        onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
                                        placeholder="Enter phone number"
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
                                    <label htmlFor="add-department">Department</label>
                                    <input
                                        type="text"
                                        id="add-department"
                                        value={editForm.department}
                                        onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                                        placeholder="Enter department"
                                        required
                                    />
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
                                    Add Staff
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
                        <div className="delete-modal-header">
                            <div className="delete-modal-icon">
                                <AlertTriangle size={32} />
                            </div>
                            <h2 className="delete-modal-title">Confirm Delete</h2>
                        </div>
                        <div className="delete-modal-body">
                            <p className="delete-message">
                                Are you sure you want to delete <strong>{deletingStaff?.fullName}</strong>?
                            </p>
                            <p className="delete-warning">
                                <AlertCircle size={14} />
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="delete-modal-footer">
                            <button type="button" className="modal-cancel-btn" onClick={closeDeleteModal}>
                                Cancel
                            </button>
                            <button type="button" className="modal-delete-btn" onClick={handleDeleteConfirm}>
                                Delete Staff
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

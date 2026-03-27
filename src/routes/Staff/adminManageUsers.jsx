import { Shield, Users, UserCheck, Plus, Edit2, Trash2, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const Route = {
  component: AdminManageUsersPage,
}

// Sample data
const userData = [
  { id: 1, name: 'John Smith', email: 'john.smith@university.edu', role: 'staff', department: 'Computer Science', status: 'active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@university.edu', role: 'staff', department: 'Mathematics', status: 'active' },
  { id: 3, name: 'Michael Brown', email: 'michael.b@university.edu', role: 'staff', department: 'Physics', status: 'inactive' },
  { id: 4, name: 'Emily Davis', email: 'emily.d@university.edu', role: 'student', department: 'Computer Science', level: '300', status: 'active' },
  { id: 5, name: 'James Wilson', email: 'james.w@university.edu', role: 'student', department: 'Mathematics', level: '200', status: 'active' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa.a@university.edu', role: 'student', department: 'Computer Science', level: '400', status: 'active' },
  { id: 7, name: 'Robert Taylor', email: 'robert.t@university.edu', role: 'student', department: 'Physics', level: '100', status: 'inactive' },
]

export function AdminManageUsersPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredUsers = userData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalUsers = userData.length
  const staffCount = userData.filter(u => u.role === 'staff').length
  const studentCount = userData.filter(u => u.role === 'student').length
  const activeUsers = userData.filter(u => u.status === 'active').length

  const handleEditUser = (userId) => {
    // TODO: Navigate to edit user page
    console.log('Edit user:', userId)
  }

  const handleDeleteUser = (userId) => {
    // TODO: Handle user deletion
    console.log('Delete user:', userId)
  }

  const handleAddUser = () => {
    // TODO: Navigate to add user page
    console.log('Add new user')
  }

  return (
    <div className="admin-manage-users-page">
      {/* Header */}
      <div className="admin-header">
        <Shield size={26} />
        <div className="headercontent">
          <h1>Manage Users</h1>
          <p className='subtext'>Manage students and staff accounts</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Controls */}
        <div className="user-controls">
          <div className="search-filters">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search users by name, email, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-dropdowns">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Roles</option>
                <option value="staff">Staff</option>
                <option value="student">Student</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button className="add-user-btn" onClick={handleAddUser}>
            <Plus size={18} />
            Add User
          </button>
        </div>

        {/* Stats */}
        <div className="user-stats">
          <div className="stat-item">
            <Users size={16} />
            <span className="stat-value">{totalUsers}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-item stat-staff">
            <UserCheck size={16} />
            <span className="stat-value">{staffCount}</span>
            <span className="stat-label">Staff</span>
          </div>
          <div className="stat-item stat-student">
            <Users size={16} />
            <span className="stat-value">{studentCount}</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="stat-item stat-active">
            <UserCheck size={16} />
            <span className="stat-value">{activeUsers}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>

        {/* Users Table */}
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-name">
                      <span className="name-text">{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="email-text">{user.email}</span>
                  </td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.department}</td>
                  <td>{user.level || '-'}</td>
                  <td>
                    <span className={`status-badge status-${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteUser(user.id)}
                      >
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

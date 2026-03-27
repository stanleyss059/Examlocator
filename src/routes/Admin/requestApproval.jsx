import { useState } from 'react'
import { CheckCircle, XCircle, User, Clock, Search, Filter, FileText, ChevronDown, ChevronUp, Eye } from 'lucide-react'

export const Route = {
    component: RequestApprovalPage,
}

export function RequestApprovalPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [expandedRequest, setExpandedRequest] = useState(null)

    // Sample edit requests data
    const [requests, setRequests] = useState([
        {
            id: 1,
            userId: '21028066',
            name: 'Aseda Nyamekye',
            email: 'aseda@example.com',
            role: 'Student',
            requestedChanges: {
                phone: '+233 20 123 4567',
                department: 'Electrical Engineering',
            },
            currentValues: {
                phone: '+233 24 987 6543',
                department: 'Computer Science',
            },
            status: 'pending',
            requestedAt: '2026-03-25T10:30:00',
            reason: 'Changed my major at the beginning of the semester',
        },
        {
            id: 2,
            userId: '21028067',
            name: 'Kofi Mensah',
            email: 'kofi.mensah@example.com',
            role: 'Student',
            requestedChanges: {
                email: 'kofi.newemail@example.com',
            },
            currentValues: {
                email: 'kofi.mensah@example.com',
            },
            status: 'pending',
            requestedAt: '2026-03-26T14:15:00',
            reason: 'Previous email is no longer accessible',
        },
        {
            id: 3,
            userId: 'STF102',
            name: 'Dr. Abena Osei',
            email: 'abena.osei@uni.edu',
            role: 'Staff',
            requestedChanges: {
                department: 'Computer Science',
                phone: '+233 50 111 2222',
            },
            currentValues: {
                department: 'Mathematics',
                phone: '+233 24 000 1111',
            },
            status: 'approved',
            requestedAt: '2026-03-20T09:00:00',
            approvedAt: '2026-03-21T11:30:00',
            approvedBy: 'Admin User',
            reason: 'Department transfer approved by HR',
        },
        {
            id: 4,
            userId: '21028068',
            name: 'Yaw Boateng',
            email: 'yaw.boateng@example.com',
            role: 'Student',
            requestedChanges: {
                level: '400',
            },
            currentValues: {
                level: '300',
            },
            status: 'rejected',
            requestedAt: '2026-03-22T16:45:00',
            rejectedAt: '2026-03-23T10:00:00',
            rejectedBy: 'Admin User',
            rejectionReason: 'Level advancement is handled automatically by the system at the end of academic year',
            reason: 'Completed all 300 level courses',
        },
        {
            id: 5,
            userId: '21028069',
            name: 'Akua Serwaa',
            email: 'akua.serwaa@example.com',
            role: 'Student',
            requestedChanges: {
                phone: '+233 55 999 8888',
                email: 'akua.s.new@example.com',
            },
            currentValues: {
                phone: '+233 20 444 5555',
                email: 'akua.serwaa@example.com',
            },
            status: 'pending',
            requestedAt: '2026-03-27T08:20:00',
            reason: 'Updated contact information',
        },
    ])

    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === 'pending').length,
        approved: requests.filter(r => r.status === 'approved').length,
        rejected: requests.filter(r => r.status === 'rejected').length,
    }

    const filteredRequests = requests.filter(request => {
        const matchesSearch = 
            request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.userId.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterStatus === 'all' || request.status === filterStatus
        return matchesSearch && matchesFilter
    })

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getStatusBadge = (status) => {
        const styles = {
            pending: { background: '#FEF3C7', color: '#D97706' },
            approved: { background: '#D1FAE5', color: '#059669' },
            rejected: { background: '#FEE2E2', color: '#DC2626' },
        }
        return styles[status] || styles.pending
    }

    const handleApprove = (requestId) => {
        setRequests(prev => prev.map(req => 
            req.id === requestId 
                ? { 
                    ...req, 
                    status: 'approved', 
                    approvedAt: new Date().toISOString(),
                    approvedBy: 'Admin User'
                }
                : req
        ))
    }

    const handleReject = (requestId, reason) => {
        setRequests(prev => prev.map(req => 
            req.id === requestId 
                ? { 
                    ...req, 
                    status: 'rejected', 
                    rejectedAt: new Date().toISOString(),
                    rejectedBy: 'Admin User',
                    rejectionReason: reason || 'Request rejected by admin'
                }
                : req
        ))
    }

    const toggleExpand = (requestId) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId)
    }

    return (
        <div className="admin-request-page">
            {/* Header */}
            <div className="admin-request-header">
                <div className="header-title-section">
                    <FileText size={28} className="header-icon" />
                    <div>
                        <h1>Edit Request Approvals</h1>
                        <p>Review and manage profile edit requests from users</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="request-stats-grid">
                <div className="request-stat-card total">
                    <div className="stat-icon"><FileText size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.total}</span>
                        <span className="stat-label">Total Requests</span>
                    </div>
                </div>
                <div className="request-stat-card pending">
                    <div className="stat-icon"><Clock size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.pending}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                </div>
                <div className="request-stat-card approved">
                    <div className="stat-icon"><CheckCircle size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.approved}</span>
                        <span className="stat-label">Approved</span>
                    </div>
                </div>
                <div className="request-stat-card rejected">
                    <div className="stat-icon"><XCircle size={20} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.rejected}</span>
                        <span className="stat-label">Rejected</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="request-filters">
                <div className="request-search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="request-filter-dropdown">
                    <Filter size={18} />
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Requests List */}
            <div className="requests-container">
                {filteredRequests.length === 0 ? (
                    <div className="no-requests">
                        <FileText size={48} />
                        <p>No requests found</p>
                    </div>
                ) : (
                    filteredRequests.map(request => (
                        <div key={request.id} className={`request-card ${request.status}`}>
                            <div className="request-card-header" onClick={() => toggleExpand(request.id)}>
                                <div className="request-user-info">
                                    <div className="request-avatar">
                                        <User size={20} />
                                    </div>
                                    <div className="request-details">
                                        <h3>{request.name}</h3>
                                        <p className="request-meta">
                                            {request.role} • ID: {request.userId} • {request.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="request-status-section">
                                    <span 
                                        className="request-status-badge"
                                        style={getStatusBadge(request.status)}
                                    >
                                        {request.status}
                                    </span>
                                    <span className="request-date">
                                        {formatDate(request.requestedAt)}
                                    </span>
                                    <button className="expand-btn">
                                        {expandedRequest === request.id ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {expandedRequest === request.id && (
                                <div className="request-card-body">
                                    <div className="request-reason">
                                        <strong>Reason:</strong>
                                        <p>{request.reason}</p>
                                    </div>

                                    <div className="changes-comparison">
                                        <h4>Requested Changes:</h4>
                                        <div className="changes-table">
                                            <div className="changes-header">
                                                <span>Field</span>
                                                <span>Current Value</span>
                                                <span>New Value</span>
                                            </div>
                                            {Object.entries(request.requestedChanges).map(([field, newValue]) => (
                                                <div key={field} className="change-row">
                                                    <span className="field-name">{field}</span>
                                                    <span className="current-value">{request.currentValues[field]}</span>
                                                    <span className="new-value">{newValue}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {request.status === 'pending' && (
                                        <div className="request-actions">
                                            <button 
                                                className="approve-btn"
                                                onClick={() => handleApprove(request.id)}
                                            >
                                                <CheckCircle size={18} />
                                                Approve
                                            </button>
                                            <button 
                                                className="reject-btn"
                                                onClick={() => handleReject(request.id)}
                                            >
                                                <XCircle size={18} />
                                                Reject
                                            </button>
                                        </div>
                                    )}

                                    {request.status === 'approved' && (
                                        <div className="request-resolution">
                                            <CheckCircle size={16} className="resolution-icon approved" />
                                            <span>
                                                Approved by {request.approvedBy} on {formatDate(request.approvedAt)}
                                            </span>
                                        </div>
                                    )}

                                    {request.status === 'rejected' && (
                                        <div className="request-resolution">
                                            <XCircle size={16} className="resolution-icon rejected" />
                                            <div>
                                                <span>
                                                    Rejected by {request.rejectedBy} on {formatDate(request.rejectedAt)}
                                                </span>
                                                {request.rejectionReason && (
                                                    <p className="rejection-reason">Reason: {request.rejectionReason}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

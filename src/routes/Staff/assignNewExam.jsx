import { Shield, ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const Route = {
  component: AssignNewExamPage,
}

export function AssignNewExamPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    startDate: '',
    startTime: '',
    endTime: '',
    departmentCode: '',
    program: '',
    level: '',
    examType: ''
  })

  const [roomAllocations, setRoomAllocations] = useState([
    { id: 1, startIndexNumber: '', endIndexNumber: '', roomAllocated: '', roomLocation: '' }
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRoomAllocationChange = (id, field, value) => {
    setRoomAllocations(prev => 
      prev.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      )
    )
  }

  const addRoomAllocation = () => {
    const newId = Math.max(...roomAllocations.map(r => r.id)) + 1
    setRoomAllocations(prev => [
      ...prev,
      { id: newId, startIndexNumber: '', endIndexNumber: '', roomAllocated: '', roomLocation: '' }
    ])
  }

  const removeRoomAllocation = (id) => {
    if (roomAllocations.length > 1) {
      setRoomAllocations(prev => prev.filter(row => row.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { ...formData, roomAllocations })
    // TODO: Handle form submission
  }

  const handleBack = () => {
    // TODO: Navigate back to dashboard
    navigate({ to: '/staff/staffdashboard' })
  }

  return (
    <div className="assign-exam-page">
      {/* Header */}
      <div className="assign-exam-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="header-content">
          <Shield size={26} />
          <div className="header-text">
            <h1>Assign New Exam</h1>
            <p className="subtext">Create a new exam assignment with location details</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="assign-exam-form-container">
        <form className="assign-exam-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Course Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="courseCode">Course Code</label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  placeholder="e.g., CS 301"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  type="text"
                  id="courseTitle"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Data Structures and Algorithms"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Schedule</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Department & Program</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departmentCode">Department Code</label>
                <input
                  type="text"
                  id="departmentCode"
                  name="departmentCode"
                  value={formData.departmentCode}
                  onChange={handleInputChange}
                  placeholder="e.g., CS"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="program">Program</label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Program</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Postgraduate</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="level">Level</label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="100">100 Level</option>
                  <option value="200">200 Level</option>
                  <option value="300">300 Level</option>
                  <option value="400">400 Level</option>
                  <option value="500">500 Level</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Exam Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="examType">Exam Type</label>
                <select
                  id="examType"
                  name="examType"
                  value={formData.examType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Exam Type</option>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final</option>
                  <option value="quiz">Quiz</option>
                  <option value="practical">Practical</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Room Allocations</h2>
            <div className="room-allocations-table">
              <table className="allocation-table">
                <thead>
                  <tr>
                    <th>Start Index Number</th>
                    <th>End Index Number</th>
                    <th>Room Allocated</th>
                    <th>Room Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomAllocations.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="text"
                          value={row.startIndexNumber}
                          onChange={(e) => handleRoomAllocationChange(row.id, 'startIndexNumber', e.target.value)}
                          placeholder="e.g., 001"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.endIndexNumber}
                          onChange={(e) => handleRoomAllocationChange(row.id, 'endIndexNumber', e.target.value)}
                          placeholder="e.g., 050"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.roomAllocated}
                          onChange={(e) => handleRoomAllocationChange(row.id, 'roomAllocated', e.target.value)}
                          placeholder="e.g., A-102"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.roomLocation}
                          onChange={(e) => handleRoomAllocationChange(row.id, 'roomLocation', e.target.value)}
                          placeholder="e.g., Main Building"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="table-action-btn add-btn"
                            onClick={addRoomAllocation}
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            type="button"
                            className="table-action-btn delete-btn"
                            onClick={() => removeRoomAllocation(row.id)}
                            disabled={roomAllocations.length === 1}
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

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleBack}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Assign Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

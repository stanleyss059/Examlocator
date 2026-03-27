import { useState } from "react";
import { User, Mail, Hash, GraduationCap, School, Edit2, Check, X, Camera } from "lucide-react";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Aseda Nyamekye",
    role: "Student",
    email: "aseda@example.com",
    id: "21028066",
    department: "Computer Science",
    level: "300",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated user:", user);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "student":
        return "#2A6F68";
      case "staff":
        return "#4A72A6";
      case "admin":
        return "#8B5CF6";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header-section">
          <div className="profile-cover"></div>
          <div className="profile-avatar-wrapper">
            <div 
              className="profile-avatar"
              style={{ backgroundColor: getRoleColor(user.role) }}
            >
              <span className="avatar-initials">{getInitials(user.name)}</span>
              <button className="avatar-camera-btn" title="Change Photo">
                <Camera size={14} />
              </button>
            </div>
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">{user.name}</h1>
            <span 
              className="profile-role-badge"
              style={{ backgroundColor: getRoleColor(user.role) }}
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Info Card */}
          <div className="profile-info-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button 
                  className="profile-edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="profile-action-btns">
                  <button 
                    className="profile-save-btn"
                    onClick={handleSave}
                  >
                    <Check size={16} />
                    Save
                  </button>
                  <button 
                    className="profile-cancel-btn"
                    onClick={handleCancel}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-fields">
              {/* Full Name */}
              <div className="profile-field">
                <div className="field-icon">
                  <User size={18} />
                </div>
                <div className="field-content">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="profile-input"
                    />
                  ) : (
                    <p className="field-value">{user.name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="profile-field">
                <div className="field-icon">
                  <Mail size={18} />
                </div>
                <div className="field-content">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="profile-input"
                    />
                  ) : (
                    <p className="field-value">{user.email}</p>
                  )}
                </div>
              </div>

              {/* ID */}
              <div className="profile-field">
                <div className="field-icon">
                  <Hash size={18} />
                </div>
                <div className="field-content">
                  <label>ID Number</label>
                  <p className="field-value">{user.id}</p>
                </div>
              </div>

              {/* Department */}
              <div className="profile-field">
                <div className="field-icon">
                  <GraduationCap size={18} />
                </div>
                <div className="field-content">
                  <label>Department</label>
                  {isEditing ? (
                    <select
                      name="department"
                      value={user.department}
                      onChange={handleChange}
                      className="profile-select"
                    >
                      <option>Computer Science</option>
                      <option>Civil Engineering</option>
                      <option>Mechanical Engineering</option>
                      <option>Business Administration</option>
                      <option>Electrical Engineering</option>
                    </select>
                  ) : (
                    <p className="field-value">{user.department}</p>
                  )}
                </div>
              </div>

              {/* Level */}
              <div className="profile-field">
                <div className="field-icon">
                  <School size={18} />
                </div>
                <div className="field-content">
                  <label>Level</label>
                  {isEditing ? (
                    <select
                      name="level"
                      value={user.level}
                      onChange={handleChange}
                      className="profile-select"
                    >
                      <option>100</option>
                      <option>200</option>
                      <option>300</option>
                      <option>400</option>
                    </select>
                  ) : (
                    <p className="field-value">Level {user.level}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="profile-stats-card">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-number">12</span>
                <span className="stat-label">Exams Taken</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">3</span>
                <span className="stat-label">Upcoming</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">85%</span>
                <span className="stat-label">Average</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
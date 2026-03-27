import { useState } from "react";

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

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">👤</div>

          <div>
            <h2>{user.name}</h2>
            <p className="role">{user.role}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="profile-details">

          {/* NAME */}
          <div className="profile-row">
            <span>Full Name</span>
            {isEditing ? (
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="profile-row">
            <span>Email</span>
            {isEditing ? (
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          {/* ID */}
          <div className="profile-row">
            <span>ID</span>
            <p>{user.id}</p>
          </div>

          {/* DEPARTMENT */}
          <div className="profile-row">
            <span>Department</span>
            {isEditing ? (
              <select
                name="department"
                value={user.department}
                onChange={handleChange}
              >
                <option>Computer Science</option>
                <option>Civil Engineering</option>
                <option>Mechanical Engineering</option>
                <option>Business Administration</option>
                <option>Electrical Engineering</option>
              </select>
            ) : (
              <p>{user.department}</p>
            )}
          </div>

          {/* LEVEL */}
          <div className="profile-row">
            <span>Level</span>
            {isEditing ? (
              <select
                name="level"
                value={user.level}
                onChange={handleChange}
              >
                <option>100</option>
                <option>200</option>
                <option>300</option>
                <option>400</option>
              </select>
            ) : (
              <p>{user.level}</p>
            )}
          </div>

        </div>

        {/* BUTTONS */}
        {!isEditing ? (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default ProfilePage;
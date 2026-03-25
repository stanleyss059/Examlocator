import { UserPlus } from 'lucide-react'
import { Link as RouterLink } from '@tanstack/react-router'

export const Route = {
  component: StudSignupPage,
}

export function StudSignupPage() {
  return (
    <div className="stud-signup-page">
      <div className="signupform">
        <div className="header">
          <h2>Student Registration</h2>
          <p className="subtext">Create your account to access the exam locator</p>
        </div>
        <div className="form-content-signup">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your active email" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="indexNumber">Index Number</label>
              <input type="text" id="indexNumber" placeholder="Enter your index number" />
            </div>
            <div className="form-group">
              <label htmlFor="departmentCode">Department Code</label>
              <input type="text" id="departmentCode" placeholder="Enter department code" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="program">Program</label>
              <input type="text" id="program" placeholder="Enter your program" />
            </div>
            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select id="level">
                <option value="">Select level</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" />
          </div>
        </div>
        <div className="footer">
          <button className="formbtn"><UserPlus /> Sign Up</button>
          <p>Already have an account? <RouterLink to="/student/login" className='forgotpass'>Login here</RouterLink></p>
        </div>
      </div>
    </div>
  )
}

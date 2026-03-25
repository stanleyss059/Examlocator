import { LogIn } from 'lucide-react'
import { Link } from 'lucide-react'

export const Route = {
  component: StudIndexPage,
}

export function StudIndexPage() {
  return (
    <div className="stud-index-page">
      <div className="form">
        <div className="header">
          <h2>Student Login</h2>
          <p className="subtext">Enter your index number and password to access your exams</p>
        </div>
        <div className="form-content">
            <div className="formcon">
                <label htmlFor="Index Number">Index Number</label>
                <input className="forminp" type="text" id="Index Number" placeholder="e.g 9041723" />
            </div>
            <div className="formcon">
                <div className="passlabel">
                    <label htmlFor="Password">Password</label>
                    <a href="#" className='forgotpass'>Forgot password?</a>
                </div>
                <input className="forminp" type="password" id="Password" placeholder="Enter your password" />
            </div>
        </div>
        <div className="footer">
          <button className="formbtn"><LogIn /> Sign In</button>
          <p>Don't have an account? <a href="#" className='forgotpass'>Register here</a></p>
        </div>
      </div>
    </div>
  )
}
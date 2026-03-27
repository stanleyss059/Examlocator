import { Hash, GraduationCap, User, Search, Filter, ChevronDown, Calendar, Clock, MapPin, Building2 } from 'lucide-react'
import { useState } from 'react'

export function StudDashboardPage() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("All Exams")
    const [searchQuery, setSearchQuery] = useState("")

    const options = ["All Exams", "Upcoming", "In Progress", "Completed"]

    const examSchedule = [
        {
            id:       "CS301",
            course:   "Data Structures and Algorithms",
            date:     "2026-02-15",
            start:    "09:00",
            end:      "12:00",
            room:     "Room A-102",
            building: "Engineering Block, 1st Floor",
            status:   "upcoming",
        },
        {
            id:       "CS305",
            course:   "Operating Systems",
            date:     "2026-02-18",
            start:    "14:00",
            end:      "17:00",
            room:     "Lab 3",
            building: "Computer Science Building, 2nd Floor",
            status:   "in_progress",
        },
        {
            id:       "CS310",
            course:   "Database Management Systems",
            date:     "2026-02-20",
            start:    "09:00",
            end:      "12:00",
            room:     "Hall B",
            building: "Main Examination Hall",
            status:   "upcoming",
        },
        {
            id:       "CS203",
            course:   "Computer Networks",
            date:     "2026-02-03",
            start:    "09:00",
            end:      "12:00",
            room:     "Room C-205",
            building: "Engineering Block, 2nd Floor",
            status:   "in_progress",
        },
        {
            id:       "CS401",
            course:   "Artificial Intelligence",
            date:     "2026-02-22",
            start:    "10:00",
            end:      "13:00",
            room:     "Room B-201",
            building: "Engineering Block, 2nd Floor",
            status:   "upcoming",
        },
        {
            id:       "CS215",
            course:   "Discrete Mathematics",
            date:     "2026-02-24",
            start:    "09:00",
            end:      "11:00",
            room:     "Hall A",
            building: "Main Examination Hall",
            status:   "in_progress",
        },
        {
            id:       "CS320",
            course:   "Software Engineering",
            date:     "2026-02-26",
            start:    "14:00",
            end:      "17:00",
            room:     "Lab 1",
            building: "Computer Science Building, 1st Floor",
            status:   "upcoming",
        },
        {
            id:       "CS410",
            course:   "Computer Graphics",
            date:     "2026-02-28",
            start:    "11:00",
            end:      "14:00",
            room:     "Lab 2",
            building: "Computer Science Building, 2nd Floor",
            status:   "upcoming",
        },
        {
            id:       "CS350",
            course:   "Theory of Computation",
            date:     "2026-03-02",
            start:    "09:00",
            end:      "12:00",
            room:     "Room A-104",
            building: "Engineering Block, 1st Floor",
            status:   "Completed",
        },
        {
            id:       "CS280",
            course:   "Computer Architecture",
            date:     "2026-03-05",
            start:    "13:00",
            end:      "16:00",
            room:     "Room D-301",
            building: "Engineering Block, 3rd Floor",
            status:   "Completed",
        },
    ];

    const upcomingCount = examSchedule.filter(exam => exam.status === "upcoming").length
    const inProgressCount = examSchedule.filter(exam => exam.status === "in_progress").length
    const completedCount = examSchedule.filter(exam => exam.status === "Completed").length

    return (
        <div className="stud-dashboard-page">

            {/* HEADER */}
            <div className="dashheader">
                <h1>Welcome back, John Doe!</h1>
                <p className="headersubtext">Here's your exam schedule and locations.</p>

                <div className="userinfor">
                    <div className="infos">
                        <Hash size={18} /> 9041723
                    </div>
                    <div className="infos">
                        <GraduationCap size={18} /> Computer Science
                    </div>
                    <div className="infos">
                        <User size={18} /> John Doe
                    </div>
                </div>
            </div>

            {/* EXAM INFO */}
            <div className="examinfo">
                <div className="examinfoS">
                    <p className="toptxt1">{upcomingCount}</p>
                    <p className="btntxt">Upcoming Exams</p>
                </div>

                <div className="examinfoS">
                    <p className="toptxt2">{inProgressCount}</p>
                    <p className="btntxt">In Progress</p>
                </div>

                <div className="examinfoS">
                    <p className="toptxt3">{completedCount}</p>
                    <p className="btntxt">Completed</p>
                </div>
            </div>

            {/* MAIN */}
            <div className="main">

                {/* FILTER */}
                <div className="filter">

                    <div className="search">
                        <Search size={18} className="search-icon" />

                        <input
                            type="text"
                            placeholder="Search exams..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="exam-filter" onClick={() => setOpen(!open)}>
                        <Filter size={16} className="icon" />

                        <span className="selected">{selected}</span>

                        <ChevronDown size={16} className={`chevron ${open ? 'rotate' : ''}`} />

                        {open && (
                            <div className="dropdown">
                                {options.map((item) => (
                                    <div
                                        key={item}
                                        className={`dropdown-item ${selected === item ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelected(item)
                                            setOpen(false)
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* CONTENT */}
                <div className="exam-cards-container">
                    {examSchedule
                        .filter(exam => {
                            const matchesFilter = selected === "All Exams" || 
                                (selected === "Upcoming" && exam.status === "upcoming") ||
                                (selected === "In Progress" && exam.status === "in_progress") ||
                                (selected === "Completed" && exam.status === "Completed")
                            
                            const matchesSearch = !searchQuery || 
                                exam.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                exam.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                exam.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                exam.building.toLowerCase().includes(searchQuery.toLowerCase())
                            
                            return matchesFilter && matchesSearch
                        })
                        .map((exam) => (
                            <div key={exam.id} className={`exam-card ${exam.status}`}>
                                <div className="exam-card-content">
                                    <div className="exam-card-left">
                                        <div className="course-code">{exam.id}</div>
                                        <h3 className="exam-title">{exam.course}</h3>
                                        <div className="exam-details">
                                            <div className="exam-detail-item">
                                                <Calendar size={16} />
                                                <span>{new Date(exam.date).toLocaleDateString('en-US', { 
                                                    weekday: 'short', 
                                                    month: 'short', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                })}</span>
                                            </div>
                                            <div className="exam-detail-item">
                                                <Clock size={16} />
                                                <span>{exam.start} - {exam.end}</span>
                                            </div>
                                            <div className="exam-location">
                                                <div className="exam-detail-item">
                                                    <MapPin size={16} />
                                                    <span className="exam-location-text">
                                                        {exam.room} {exam.building}
                                                    </span>
                                                </div>
                                                <div className="exam-detail-item">
                                                    <Building2 size={16} />
                                                    <span className="exam-location-text">
                                                        {exam.building}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="exam-card-right">
                                        <div className={`exam-status ${exam.status}`}>
                                            {exam.status === 'in_progress' ? 'In Progress' : 'Upcoming'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

const studProfileRoute = new Route({
  getParentRoute: () => studRootRoute,
  path: 'profile',
  component: ProfilePage,
})
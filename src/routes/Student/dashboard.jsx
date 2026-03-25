import { Hash, GraduationCap, User, Search, Filter, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function StudDashboardPage() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("All Exams")

    const options = ["All Exams", "Upcoming", "Completed"]

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
            status:   "upcoming",
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
            status:   "upcoming",
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
            status:   "upcoming",
        },
        {
            id:       "CS280",
            course:   "Computer Architecture",
            date:     "2026-03-05",
            start:    "13:00",
            end:      "16:00",
            room:     "Room D-301",
            building: "Engineering Block, 3rd Floor",
            status:   "upcoming",
        },
    ];

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
                    <p className="toptxt1">3</p>
                    <p className="btntxt">Upcoming Exams</p>
                </div>

                <div className="examinfoS">
                    <p className="toptxt2">1</p>
                    <p className="btntxt">In Progress</p>
                </div>

                <div className="examinfoS">
                    <p className="toptxt3">2</p>
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
                            placeholder="Search..."
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
                <div className="contents">
                    <div className="contcon">
                        <div className="head">
                        <p className='courseID'>CS 301</p>
                        <p className='status upcoming'>Upcoming</p>
                        </div>
                        <div className="cardBody">
                        <h3 className="courseTitle">Data Structures and Algorithms</h3>
                        <div className="metaRow">
                            <span className="metaItem">
                            <CalendarIcon /> Feb 15, 2026
                            </span>
                            <span className="metaItem">
                            <ClockIcon /> 9:00 AM - 12:00 PM
                            </span>
                        </div>
                        <div className="locationBox">
                            <span className="locItem"><PinIcon /> Room A-102</span>
                            <span className="locItem"><BuildingIcon /> Engineering Block, 1st Floor</span>
                        </div>
                        </div>
                    </div>
                    <div className="contcon"></div>
                    <div className="contcon"></div>
                </div>

            </div>
        </div>
    )
}
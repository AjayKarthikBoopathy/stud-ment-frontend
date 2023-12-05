import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Base from "../Base/Base";


function Users({students,setStudents}) {
    
    console.log(students);
    
    const history = useHistory();

    //delete
    const deleteUser = async (studentId)=>{
        
          const res = await fetch(`https://stud-ment-backend.onrender.com/students/delete/${studentId}`, {
            method:"DELETE"
          });
          const data = await res.json()
          console.log(data)
  
            const removedStudent = students.filter(student=>student._id !== studentId);
            setStudents(removedStudent)
            console.log(students)
          
        
      }

    return (
        <Base>
        <div className="newuser">
        <button className="newuser-button"
        onClick={()=>history.push("/students/add")}
        >Click to add Student</button></div>

        <div className="card-container">
            
            {students && (
                <div className="card-outer">
                  {students?.map((stud, idx) => (
                  <div className="card" key={idx}>
                        <div className="content">
                            <h3>{stud.name}</h3>
                            <p>{stud.batch}</p>
                            <p>{stud.gender}</p>
                            <p>{stud.education}</p>
                        </div>

                        <div className="control">
                          <div>
                            <button className="my-btn" onClick={()=>history.push(`/students/my-mentors/${stud._id}`)}>View Mentor</button>
                          </div>

                            <button className="btn" onClick={()=>history.push(`/students/edit/${stud._id}`)}>Edit</button> {" "}
                            <button className="btn" onClick={()=>deleteUser(stud._id)}>Delete</button>
                        </div>
                        
                  </div>
                  ))}
                </div>
            )}


        </div>
        </Base>
        
    );
}

export default Users;

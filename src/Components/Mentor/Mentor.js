import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Base/Base";


function Mentors({mentors,setMentors}) {

    console.log(mentors);
    
    const history = useHistory();
   

    //delete
    const deleteMentor= async (studentId)=>{
        try {
          const res = await fetch(`https://stud-ment-backend.onrender.com/mentors/delete/${studentId}`, {
            method:"DELETE"
          });
          const data = await res.json()
          console.log(data)
  
            const removedMentor = mentors.filter(student=>student._id !== studentId);
            await setMentors(removedMentor)
          
        } catch (error) {
          console.log(error)
        }
      }

    return (
        <Base>
        <div className="newuser">
        <button className="newuser-button"
        onClick={()=>history.push("/mentors/add")}
        >Click to add Mentor</button></div>

        <div className="card-container">
            
            {mentors && (
                <div className="card-outer">
                  {mentors?.map((stud, idx) => (
                  <div className="card2" key={idx}>
                        <div className="content">
                            <h3>{stud.name}</h3>
                            <p>{stud.batch}</p>
                            <p>{stud.gender}</p>
                            <p>{stud.education}</p>
                        </div>

                        <div className="control">
                          <div>
                            <button className="my-btn" onClick={()=>history.push(`/mentors/my-students/${stud._id}`)}>View Students</button>
                          </div>

                            <button className="btn" onClick={()=>history.push(`/mentors/edit/${stud._id}`)}>Edit</button> {" "}
                            <button className="btn" onClick={()=>deleteMentor(stud._id)}>Delete</button>
                        </div>
                        
                  </div>
                  ))}
                </div>
            )}


        </div>
        </Base>
        
    );
}

export default Mentors;

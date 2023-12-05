import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Base from "../../Base/Base";


function AddMentor({mentors,setMentors}) {
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
    const history = useHistory()


    const addMentor = async (studentId)=>{
        try {
            const newMentor = {
                name:name,
                batch:batch,
                gender,
                education:qualification
            }
            //console.log(newUser)


          const res = await fetch(`https://stud-ment-backend.onrender.com/mentors/add`, {
            method:"POST",
            body:JSON.stringify(newMentor),
            headers:{
                "Content-Type":"application/json"
            }
          });


          const data = await res.json()
          console.log(data)
  
            //const removedStudent = students.filter(student=>student.id !== studentId);
            setMentors([...mentors, newMentor])
            history.push("/mentors/all")
          
        } catch (error) {
          console.log(error)
        }
      }

   

    return (
        <Base>
        <div className="addentry">
            
            <input
            placeholder="Enter Name"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            placeholder="Enter Batch"
            type="text"
            value={batch}
            onChange={(e)=>setBatch(e.target.value)}
            />
            <input
            placeholder="Enter Gender"
            type="text"
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            />
            <input
            placeholder="Enter Qualification"
            type="text"
            value={qualification}
            onChange={(e)=>setQualification(e.target.value)}
            />

            <button className="add-button"
            onClick={addMentor}
            >Add Mentor</button>
        </div>
        </Base>
        
    );
}

export default AddMentor
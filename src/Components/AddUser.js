import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Base from "../Base/Base";


function AddUser({students,setStudents}) {
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
    const history = useHistory()


    const addUser = async (studentId)=>{
        try {
            const newUser = {
                name:name,
                batch:batch,
                gender,
                education:qualification
            }
            //console.log(newUser)


          const res = await fetch(`http://localhost:9090/students/add`, {
            method:"POST",
            body:JSON.stringify(newUser),
            headers:{
                "Content-Type":"application/json"
            }
          });


          const data = await res.json()
          console.log(data)
  
            //const removedStudent = students.filter(student=>student.id !== studentId);
            setStudents([...students, newUser])
            history.push("/students/all")
          
        } catch (error) {
          console.log(error)
        }
      }


    // const createUser = () => {
    //     //creating object from input states
    //     const newUser = {
    //         name:name,
    //         batch:batch,
    //         gender,
    //         education:qualification
    //     }
    //     //console.log(newUser)
    //     setS([...userdata, newUser])
    //     setName("")
    //     setBatch("")
    //     setGender("")
    //     setQualification("")
    //     history.push("/")
    

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
            onClick={addUser}
            >Add Student</button>
        </div>
        </Base>
        
    );
}

export default AddUser
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Base from "../Base/Base";


function UpdateUser({students, setStudents}) {
    const {id} = useParams();
   
    // const editUser = userdata[id]
    const history = useHistory()

    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [education, setEducation] = useState("")

    useEffect(()=>{
        const data = students?.find((data)=>data._id === id)
       if(data){
        console.log(id)
        setName(data.name)
        setBatch(data.batch)
        setGender(data.gender)
        setEducation(data.education)

        
       }
    }, [id, students])

    // function updateUser() {
    //     const updatedObject = {
    //         name : name,
    //         batch : batch,
    //         gender : gender,
    //         qualification : qualification
    //     }
    //     console.log(updatedObject)
    //     userdata[id] = updatedObject
    //     setUserdata([...userdata])
    //     history.push("/")
    // }

//
const updateUser = async ()=>{
    try {
    //fetch and update data 
    const updatedStudent = {
        name : name,
        batch : batch,
        gender : gender,
        education : education
    }

    const response = await fetch(`http://localhost:9090/students/edit/${id}`,{
      method:"PUT",
      body:JSON.stringify(updatedStudent),
      headers:{
        "Content-Type":"application/json"
      }
    });
    
    const data = await response.json()
    console.log(data)
    //update the studenet
    const studIndex = students?.findIndex((stud)=>stud.id === id);
    //console.log(updatedStudent)

    students[studIndex] = data

    await setStudents([...students])
    //navigate("/students/all")
    history.push("/students/all")

      
    } catch (error) {
      console.log(error)
    }
  }

    return (
        <Base>
        <div className="editentry">
            
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
            value={education}
            onChange={(e)=>setEducation(e.target.value)}
            />

            <button className="edit-button"
            onClick={updateUser}
            >Update Student</button>
        </div>
        </Base>
        
    );
}

export default UpdateUser
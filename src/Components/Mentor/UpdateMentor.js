import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Base from "../../Base/Base";


function UpdateMentor({mentors, setMentors}) {
    const {id} = useParams();
   
    // const editUser = userdata[id]
    const history = useHistory()

    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [education, setEducation] = useState("")

    useEffect(()=>{
        const data = mentors?.find((data)=>data._id === id)
       if(data){
        console.log(id)
        setName(data.name)
        setBatch(data.batch)
        setGender(data.gender)
        setEducation(data.education)

        
       }
    }, [id, mentors])

    

//
const updateMentor = async ()=>{
    try {
    //fetch and update data 
    const updatedMentor = {
        name : name,
        batch : batch,
        gender : gender,
        education : education
    }

    const response = await fetch(`https://stud-ment-backend.onrender.com/mentors/edit/${id}`,{
      method:"PUT",
      body:JSON.stringify(updatedMentor),
      headers:{
        "Content-Type":"application/json"
      }
    });
    
    const data = await response.json()
    console.log(data)
    //update the studenet
    const studIndex = mentors?.findIndex((stud)=>stud.id === id);
    //console.log(updatedStudent)

    mentors[studIndex] = data

    await setMentors([...mentors])
    //navigate("/students/all")
    history.push("/mentors/all")

      
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
            onClick={updateMentor}
            >Update Mentor</button>
        </div>
        </Base>
        
    );
}

export default UpdateMentor
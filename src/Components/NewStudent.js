import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Base from "../Base/Base";
//import data from './Data/data';
import { useParams } from "react-router-dom";

function NewStudent({students,setStudents, mentors}) {
    const { id } = useParams(); //mentor Id

    //const [userdata, setUserdata] = useState(data)
    //console.log(students);
    //const [editIdx, setEditIdx] = useState();
    
    const history = useHistory();

    useEffect(()=>{
        const getStudentDetails = async()=>{
          
          const res = await fetch(`http://localhost:9090/students/all`, {       
            method: "GET",
        }); 
          const data = await res.json();
          //console.log(data.data)
          setStudents(data.data)
        }
        
          getStudentDetails()
        
    
      }, [])

      //add/update array
      const [data, setData] = useState(null);
  
  useEffect(() => {
    const datas = mentors?.find((data) => data._id === id);
    setData(datas);
  }, [id, mentors]);



  const updateArray = async (studidx) => {
    try {
        console.log(data.myStudents)
        const old_array = data.myStudents.map((value)=>value);
        console.log(old_array)
        const updated_array = old_array.push(studidx)
        console.log(updated_array)
      //const updated_array = data.myStudents.filter((current_id) => current_id !== studidx);
      const same_stud = data.myStudents.find((current_id) => current_id == studidx);
    if(!same_stud){

      const response = await fetch(`http://localhost:9090/mentors/new-student/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          myStudents: updated_array
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseData = await response.json();
      console.log(responseData);

      // If you want to update the state after a successful API call:
      setData((prevData) => ({
        ...prevData,
        myStudents: updated_array
      }));
    }
    } catch (error) {
      console.log(error);
    }
  };
    

    

    return (
        <Base>
        <div className="newuser">
            <h3>Choose your Student...</h3>
        </div>

        <div className="card-container">
            
            {students && (
                <div className="mycard-outer">
                  {students?.map((stud, idx) => (
                  <div className="mycard2" key={idx}>
                        <div className="content">
                            
                            <h3 className="my-stud">{stud.name} - {stud._id}</h3>
                        </div>
                        <div>
                            <button className="btn" onClick={() => updateArray(stud._id)}>Add</button>
                        </div>

                        
                        
                  </div>
                  ))}
                </div>
            )}


        </div>

        </Base>
        
    );
}

export default NewStudent;

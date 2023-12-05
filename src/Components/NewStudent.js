import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Base from "../Base/Base";
import { useParams } from "react-router-dom";

function NewStudent({ students, setStudents, mentors }) {
  const { id } = useParams(); //mentor Id
  console.log(id)
  console.log(mentors)

  const history = useHistory();

  useEffect(() => {
    const getStudentDetails = async () => {

      const res = await fetch(`https://stud-ment-backend.onrender.com/students/all`, {
        method: "GET",
      });
      const all_students = await res.json();
      console.log(all_students.data)
      setStudents(all_students.data)
    }

    getStudentDetails()


  }, [])

  //add/update array
  const [data, setData] = useState(null);



  useEffect(() => {
    const mentor_id = mentors?.find((ment) => ment._id === id);
    console.log(mentor_id)
    setData(mentor_id); //mentor id
    console.log(data)
  }, [id, mentors]);



  const updateArray = async (studidx) => {
    try {
      console.log(data)
      const old_array = data.myStudents.map((value) => value);
      console.log(old_array)
      const updated_count = old_array.push(studidx)
      console.log(updated_count)  //push method returns length/count
      
      const same_stud = data.myStudents.find((current_id) => current_id === studidx);
      if (!same_stud) {

        const response = await fetch(`https://stud-ment-backend.onrender.com/mentors/new-student/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            myStudents: old_array
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
          myStudents: old_array
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <Base>
      <div className="newuser">
        <button className="newuser-button" onClick={() => history.push(`/mentors/my-students/${id}`)}>
          Go Back
        </button>
      </div>

      <div className="newuser2">
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

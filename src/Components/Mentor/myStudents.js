import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Base/Base";
import { useParams } from "react-router-dom";

function MyStudents({ mentors, setMentors, students }) {
  const { id } = useParams(); //mentor Id

  const [data, setData] = useState(null);
  
  useEffect(() => {
    const datas = mentors?.find((data) => data._id === id);
    setData(datas);
  }, [id, mentors]);

  const history = useHistory();

  const updateArray = async (studidx) => {
    try {
      const updated_array = data.myStudents.filter((current_id) => current_id !== studidx);

      const response = await fetch(`http://localhost:9090/mentors/my-students/${id}`, {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Base>
      <div className="newuser">
        <button className="newuser-button" onClick={() => history.push("/mentors/all")}>
          Go Back
        </button>
      </div>

      <div className="newuser">
        <button className="newuser-button2" onClick={() => history.push(`/mentors/new-student/${id}`)}>
          Add more Students
        </button>
      </div>

      <div className="card-container">
        {data && (
          <div className="mycard-outer">
            {data.myStudents?.map((stud, idx) => (
              <div className="mycard2" key={idx}>
                <div className="content">
                  {/* Uncomment the line below if 'stud' is an ID */}
                  {/* <h3 className="my-stud">{students[stud]?.name}</h3> */}
                  <h3 className="my-stud">Student Id : {stud}</h3>
                </div>
                <div>
                  <button className="btn" onClick={() => updateArray(stud)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Base>
  );
}

export default MyStudents;


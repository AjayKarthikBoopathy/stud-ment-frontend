import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Base from "../Base/Base";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function MyMentors({students,setStudents}) {
    const {id} = useParams();

    const data = students?.find((data)=>data._id === id)
       if(data){
        var nameData = data.my_mentors;
        console.log(nameData)
       }

    
    const history = useHistory();

    
    
    return (
        <Base>
        <div className="newuser">
        <button className="newuser-button"
        onClick={()=>history.push("/students/all")}
        >Go Back</button></div>

        <div className="card-container">
            
            {nameData && (
                <div className="mycard-outer">
                  {nameData?.map((stud, idx) => (
                  <div className="mycard3" key={idx}>
                        <div className="content">
                            
                            <h3 className="my-stud">{stud}</h3>
                        </div>
                    
                  </div>
                  ))}
                </div>
            )}


        </div>
        </Base>
        
    );
}

export default MyMentors;

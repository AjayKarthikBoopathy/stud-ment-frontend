import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Base from "../../Base/Base";
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Button, IconButton, Snackbar } from "@mui/material";



function MyStudents({ students }) {
  const { id } = useParams(); //mentor Id
  const [mentorss, setMentorss] = useState([]);

  //Snack Bar
const [open, setOpen] = useState(false);

const handleClick = async() => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
  //history.push("/students")
};

const action = (
  <React.Fragment>
    {/* <Button color="warning" size="small" onClick={handleClose}>
      UNDO
    </Button> */}
    <IconButton
      size="small"
      aria-label="close"
      color="warning"
      onClick={handleClose}
    >
    Close
    </IconButton>
  </React.Fragment>
);
//Snack Bar Ends

  //fetch
  useEffect(()=>{
    const getMentorDetails = async()=>{
      
      const res = await fetch(`https://stud-ment-backend.onrender.com/mentors/all`, {       
        method: "GET",
    }); 
      const data = await res.json();
      //console.log(data.data)
      setMentorss(data.data)
    }
    
      getMentorDetails()
    

  }, [])

  const [data, setData] = useState(null);
  
  useEffect(() => {
    const datas = mentorss?.find((data) => data._id === id);
    setData(datas);
  }, [id, mentorss]);

  const history = useHistory();

  const updateArray = async (studidx) => {
    try {
      const updated_array = data.myStudents.filter((current_id) => current_id !== studidx);

      const response = await fetch(`https://stud-ment-backend.onrender.com/mentors/my-students/${id}`, {
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
      await handleClick()
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

        {/* Snack Bar */}
        <Snackbar
        open={open}
        autoHideDuration={1400}
        onClose={handleClose}
        message="Removed Successfully..."
        action={action}
      />

      </div>
    </Base>
  );
}

export default MyStudents;


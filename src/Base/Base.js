import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Base = ({children}) => {
    const history = useHistory();
    
    return (
        <div className='main-component base-component'>
  
            <div className="heading-lists">
                <div>
                <h3 className="portal">University  Portal</h3>
                </div>
                <div>
                <button className="list-button"
                onClick={()=>history.push("/students/all")}
                ><h4>Student-List</h4></button>

                <button className="list-button"
                onClick={()=>history.push("/mentors/all")}
                ><h4>Mentor-List</h4></button>
                </div>
            </div>

            
        

            <main className='main-segment'>
               
               <div>
                 {children}
               </div>
           </main>

           
      </div>
    )
}

export default Base;
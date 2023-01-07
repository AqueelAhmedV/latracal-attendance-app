import "./App.css";
import { useState, useEffect } from "react";

function App() {
  console.log('render')
  const [entries, setEntries] = useState([]);
  const [present, setPresent] = useState(0);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [checkIn, setCheckIn] = useState(false);
  
  const total = 100;

  useEffect(() => {
    const formBtn = document.getElementById("formBtn");
    const nameBox = document.getElementById('nameBox');
    const rollBox = document.getElementById('rollBox');

    

    const handleNameInput = (e) => {
      setName(e.target.value)
    }

    const handleRollNoInput = (e) => {
      setRollNo(e.target.value)
    }

    const handleSubmit = async () => {
      if(name === '' || rollNo === '') {
        alert('Name and Roll No. are required fields')
        return;
      }
      
      if(entries.filter((e) => e.rollNo === rollNo).length === 0){
        await setCheckIn(true)
        alert('checkin set true')
      }
      else {
        await setCheckIn(!checkIn)
        alert('checkin set '+!checkIn)
      }

      const newEntry = {
        name: name,
        rollNo: rollNo,
        checkIn: checkIn,
        entryTime: new Date(),
      };

      console.log(newEntry)

      if (newEntry.checkIn) {
        setPresent(present + 1);
      } else if (present > 0) {
        setPresent(present - 1);
      }

      setEntries([...entries, newEntry]);
    };
    nameBox.addEventListener('change', handleNameInput)
    rollBox.addEventListener('change', handleRollNoInput)
    formBtn.addEventListener("click", handleSubmit);
    return () => {
      nameBox.removeEventListener('change', handleNameInput)
      rollBox.removeEventListener('change', handleRollNoInput)
      formBtn.removeEventListener("click", handleSubmit);
    };
  });

  return (
    <div className="App">
      <div className="container mainbox">
        
        <div className="warning-box">
          {/* {warnings.map((w, i) => {
            return (
              <span key={i} className="warning">{w}</span>
            );
          })} */}
          
        </div>
        <div className="form-box">
          <div className="row name-row">
            <span className="form-label name-label">Name of student</span>
            <input
              className="form-input name-input"
              type="text"
              placeholder=""
              id="nameBox"
              
            />
          </div>
          <div className="row roll-row">
            <span className="form-label roll-label">
              Roll number of student
            </span>
            <input
              className="form-input roll-input"
              type="text"
              placeholder=""
              id="rollBox"
            />
          </div>
          
          <div className="row btn-row">
            <input
              id="formBtn"
              className="form-input btn"
              type="button"
              value="Submit"
            />
          </div>
        </div>
        <div className="dashboard ">
          <span className="num total">Total Strength: {total}</span>
          <span className="num present">Present: {present}</span>
          <span className="num absent">Absent: {total - present}</span>
        </div>
        <div className="list-box">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Check-in/out</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => {
                const h = e.entryTime.getHours();
                const m = e.entryTime.getMinutes();
                const s = e.entryTime.getSeconds();
                return (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.rollNo}</td>
                    <td>{e.checkIn ? "Check-in" : "Check-out"}</td>
                    <td>{`${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
                      s < 10 ? "0" + s : s
                    }`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

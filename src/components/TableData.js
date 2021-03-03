import React,{useState,useEffect} from 'react'
import './TableData.css'

const TableData = () => {
    
    const [items,setItems] = useState([])
    const [size,setSize] = useState('small')

    useEffect(() => {
       fetch(`https://raw.githubusercontent.com/accuknox/TrainingAPI/main/${size}.json`)
            .then(res => res.json())
            .then(data => setItems(data))
        
    },[size])
    return (
        <React.Fragment>
        <div className="container">
  
        <div className="options">
          <div className="choose">
            <label for="size">Show:</label>
      
        <select 
        name="size" 
        id="size"
        onChange={(e =>{
            setSize(e.target.value)
        })}
        >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
            </select>
            
          </div>
          <div className="search">
            <label for="search-box">Search:</label>
            <input type="text" id="search-box" placeholder="Search" />
          </div>
        </div>
        
        <table className="table">
          <tr>
           <th>Name</th>
           <th>Office</th>
           <th>Start Date</th>
           <th>Salary</th>
          </tr>
          
          {items.map(item => {
                
              
              return (<tr>
               <td>{`${item.firstName} ${item.lastName}`}</td>
               <td>{item.location}</td>
               <td>{item.date}</td>
               <td>${item.salary}</td>
              </tr>)
          })}
          
          <tr>
            <th>Name</th>
            <th>Office</th>
            <th>Start Date</th>
            <th>Salary</th>
          </tr>
          
        </table>
        
        <div className="pagination">
          <p>Showing 1 to 10 of 57 entries</p>
          <div className="pages">
            <button>Previous</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>Next</button>
          </div>
        </div>
      </div> 
        </React.Fragment>
    )
}

export default TableData

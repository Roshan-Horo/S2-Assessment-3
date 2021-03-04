import React,{useState,useEffect} from 'react'
import './TableData.css'

const TableData = () => {
    const [items,setItems] = useState([])
    const [size,setSize] = useState('small')
    const [keyword,setKeyword] = useState('')

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
            <label htmlFor="size">Show:</label>
      
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
            <label htmlFor="search-box">Search:</label>
            <input type="text"  
            id="search-box" 
            placeholder="Search"
            onChange={e => setKeyword(e.target.value)}
            />
          </div>
        </div>
        

    <div className="data-container">

    <div className="data-row data-head">
      <div className="data-cell">Name</div>
      <div className="data-cell">Office</div>
      <div className="data-cell">Start Date</div>
      <div className="data-cell">Salary</div>
    </div>

    {items.map(item => {
      var date = new Date( parseInt(item.date) * 1000).toLocaleString()

      return (<div className="data-row">
      <div className="data-cell">{`${item.firstName} ${item.lastName}`}</div>
      <div className="data-cell">{item.location}</div>
      <div className="data-cell">{date}</div>
      <div className="data-cell">${item.salary}</div>
    </div>)
    })}
    
    
    
  </div>
        
        <div className="pagination">
          <p>Showing 1 to 10 of {items.length} entries</p>
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

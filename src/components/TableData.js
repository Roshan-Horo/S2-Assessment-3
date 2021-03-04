import React,{useState,useEffect} from 'react'
import './TableData.css'

const TableData = () => {
    const [items,setItems] = useState([])
    const [size,setSize] = useState('small')
    const [keyword,setKeyword] = useState('')
    const [currentPage,setCurrentPage] = useState(1)
    const [entryPerPage,setEntryPerPage] = useState(10)
    const [isActive,setIsActive] = useState(false)

    useEffect(() => {
       fetch(`https://raw.githubusercontent.com/accuknox/TrainingAPI/main/${size}.json`)
            .then(res => res.json())
            .then(data => setItems(data))
        
    },[size,entryPerPage])

    // get current page data
    const indexOfLastEntry = currentPage * entryPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entryPerPage;
    const currentEntry = items.slice(indexOfFirstEntry,indexOfLastEntry);
    // No. of pages
    const pageNumbers = []
    for(let i=1;i<=Math.ceil(items.length/entryPerPage);i++){
      pageNumbers.push(i)
    }
    // change page
    const paginate = (pageNumber) => {
      console.log(pageNumber)
      setCurrentPage(pageNumber)
      setIsActive(!isActive)
    }

    console.log(pageNumbers)
    console.log(indexOfLastEntry,indexOfFirstEntry,currentEntry);

    return (
        <React.Fragment>
        <div className="container">

        <div className="options">

        <div className="choose">
        <label htmlFor="entries">Show:</label>
      
        <select 
        name="entries" 
        id="entries"
        onChange={(e =>{
            setEntryPerPage(parseInt(e.target.value))
        })}
        >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="80">80</option>
        </select>
        <label htmlFor=""> entries</label>
            
        </div> 

        <div className="choose">
        <label htmlFor="size">Api Size:</label>
      
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

    {!keyword && (currentEntry.map(item => {
      var date = new Date( parseInt(item.date) * 1000).toLocaleString()

      return (<div className="data-row">
      <div className="data-cell">{`${item.firstName} ${item.lastName}`}</div>
      <div className="data-cell">{item.location}</div>
      <div className="data-cell">{date}</div>
      <div className="data-cell">${item.salary}</div>
    </div>)
    }))}

    {keyword && (items.filter(item => {
      if(keyword === ""){
        return item
      }else if(item.firstName.toLowerCase().includes(keyword.toLowerCase()) 
               || item.lastName.toLowerCase().includes(keyword.toLowerCase())){
             return item
      }
    }).map(item => {
      var date = new Date( parseInt(item.date) * 1000).toLocaleString()

      return (<div className="data-row">
      <div className="data-cell">{`${item.firstName} ${item.lastName}`}</div>
      <div className="data-cell">{item.location}</div>
      <div className="data-cell">{date}</div>
      <div className="data-cell">${item.salary}</div>
    </div>)
    }))}
    
    
    
  </div>
        
        <div className="pagination">
          <p>Showing {indexOfFirstEntry} to 
          {indexOfLastEntry >= items.length ? items.length : indexOfLastEntry}
          of {items.length} entries</p>
          <ul className="pages">
             <li className="page"><a href="#">Previous</a></li>
             
             {pageNumbers.map(number => (
               <li 
                className={isActive ? 'page current' : 'page'}>
                <a href="!#"
                 onClick={() => paginate(number)}
                >
                {number}
                </a>
                </li>
             ))}

             <li className="page"><a href="!#">Next</a></li>
          </ul>
        </div>
      </div> 
        </React.Fragment>
    )
}

export default TableData

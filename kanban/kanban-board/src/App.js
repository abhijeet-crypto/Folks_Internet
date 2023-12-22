
import './App.css';
import Navbar from './component/Navbar/Navbar';
import React, {useEffect,useState} from 'react'


function App() {
  const initialGroupingOption = localStorage.getItem('groupBy') || "status";
  const initialSortingOption = localStorage.getItem('sortBy') || "priority";

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(initialGroupingOption);
  const [sortingOption, setSortingOption] = useState(initialSortingOption);

  useEffect(()=>{
    getDetails();
  },[]);
  async function getDetails(){
    try{
      const{data}=await axios.get("https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers")
      setUsers(data.users);
    }catch(error){
      console.error("Error fetching data: ",error);
    }
  }

  return (
    <div className='app-container'>
      <div className="navbar">
        <nav>
          <Navbar sortingOption={sortingOption}
           onSortingChange={handleSortingChange}
           groupingOption={groupingOption}
           onGroupingChange={handleGroupingChange} ></Navbar>
          
        </nav>
        
      </div>
    </div>
  );
}

export default App;

import React,{useState, useEffect} from 'react';
import BasicModal from './modal1';
import BasicModalUS from './modal2';

const Problem2 = () => {
    const [open,setOpen] = useState(false);
    const [openUS,setOpenUS] = useState(false);
    const [allContacts,setAllContacts] = useState([]);
    useEffect(()=>{
        fetch('https://contact.mediusware.com/api/contacts/')
        .then(res => res.json())
        .then(data => setAllContacts(data.results));
    
    },[])
    console.log(allContacts);
    const handleModalAll =()=>{
        setOpen(!open);
        
    }
    const handleModalUS =()=>{
        setOpenUS(!openUS);
        
    }
    return (
        
        <div className="container">
            <BasicModal open={open}  handleModalAll ={handleModalAll} data={allContacts}/> 
            <BasicModalUS open={openUS} handleModalAll={handleModalUS} data = {allContacts}/>
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-lg btn-outline-primary" type="button" onClick={handleModalAll}>All Contacts</button>
                <button className="btn btn-lg btn-outline-warning" type="button" onClick={handleModalUS}>US Contacts</button>
                </div>
                
            </div>
        </div>
    );
};

export default Problem2;
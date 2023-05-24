import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModalUS({open, handleModalAll, data}) {
  const [showEvenIds, setShowEvenIds] = useState(false);
  const dataUS = data.filter((item) => (item.country.name === 'United States' ? item : ''));
  const [searchText,setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleClose =()=>{
    handleModalAll(!open);
  }
  const handleSearch = async (searchTerm)=>{
    setSearchText(searchTerm);
    try {
        const response = await fetch(`https://contact.mediusware.com/api/contacts/?search=${searchTerm}`);
        const jsonData = await response.json();
        setSearchResults(jsonData);
      } catch (error) {
        console.log('Error fetching search results:', error);
    }
  }
  const handleChange = (e) =>{
     let searchTerm = e.target.value;
     handleSearch(searchTerm);
  }
  console.log(searchResults);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalAll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            USA Contacts
          </Typography>
          <input type="search" value={searchText} onChange={handleChange}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             {
                dataUS
                .filter((item) => (showEvenIds ? item.id % 2 === 0 : true))
                .map((item,index) =>(
                    <div key={item.id}>
                        {item.id}
                        {item.phone}
                        {item.country.name}
                    </div>
                ))
             }
          </Typography>
          <Button variant='contained' sx={{backgroundColor: '#46139f'}}>All Contacts</Button>
          <Button variant='contained' sx={{backgroundColor: '#ff7f50'}}>US Contacts</Button>
          <Button variant='contained' sx={{backgroundColor: '#46139f'}} onClick={handleClose}>Close </Button>
          <br/>
          <label>
            Only Even
            <input
            type="checkbox"
            checked={showEvenIds}
            onChange={(e) => setShowEvenIds(e.target.checked)}
            />
         </label><br></br>
        </Box>
      </Modal>
    </div>
  );
}
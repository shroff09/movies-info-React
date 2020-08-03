import React ,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Style.css';
 import Modal from './Modal';
 import UseModal from './UseModal';

const Api = () => {
    
    const [data,setdata] = useState(null);
    const [search,setsearch] = useState('avengers');
    const [id,setid] = useState('avengers');
    const [page,setpage] = useState(1);


    const handleclick = ()  => {
        setid(search)
    }

       
   useEffect(() => {
       setdata(null);
        fetch(`http://www.omdbapi.com/?s=${id}&page=${page}&apikey=dbc9f77a`)
        .then(res => res)
        .then(res => res.json())
        .then(resp => {
                console.log(resp);
                setdata(resp.Search);
        })
            .catch(err => {
                console.log(err)
            })
   },[id,page]);
   
   const {isShowing, toggle} = UseModal();

    return (
        <div>
            <div className="header">
            <h1>Dodo</h1>
            </div>
           <div  className="inputbox">
           <input type="text" value={search} onChange={e => setsearch(e.target.value)}/>
            <button   type="submit" onClick={handleclick} >Search</button>
            <button className="prevpage" onClick={()=>setpage(page - 1)}>Prev Page</button>
            <button className="nextpage" onClick={()=>setpage(page + 1)}>Next Page</button>
            
           </div>
    
             <div className="wrapper">
                 {data !== null && data.length >0 &&  data.map((result,index) => (
                      <li key={index}>
           {<img alt={result.Title}   src={result.Poster === 'N/A' ? `http://img.omdbapi.com/?s=${id}&apikey=dbc9f77a`: result.Poster}/>}
                      <br/>
                      {result.Title}<br/>
                     {/*<small>{result.Type}</small> */} 
                    {/*<button className="show" > <Link className="link" to='/model'>Details</Link></button> */} 
                     <button className="button-default" onClick={toggle}>Details</button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
                    
                      </li>
                      
                 ))}
             </div>
            {/*<div className="footer">foooter</div> */} 
             <div>
             </div>
              
        </div>
    );
};

export default Api;
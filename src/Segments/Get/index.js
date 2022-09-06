import './get.css';
import { useEffect, useState } from 'react';
import { Spinner } from '../../Spinner';
import { getData } from '../../Api/index';

// Card Component - for display of indivisual user Data
const Card =(props)=>{
    const {item, index} = props
    const trimString = (string)=>{
        let len = string.length;
        let res = null;
        if (len >20){
            res = string.slice(0,19)
        }
        else{res = string}
        return res

    }

    return (
        <div className='card' key={index} >
            <img src={item.photo} alt='pics_image' className='card-img'/>
            <div className='tooltip-div mt-20'>
                <p className='p-black'>{trimString(item.name)} </p> 
                <span className='tooltip-text'>{item.name}</span>
            </div>
            <div className='tooltip-div mt-20'>
                <p className='p-black m-5 tooltip-dif'>{trimString(item.position)} </p> 
                <span className='tooltip-text'>{item.position}</span>
            </div>
            <div className='tooltip-div'>
                <p className='p-black m-5 tooltip-dif'>{trimString(item.email)} </p> 
                <span className='tooltip-text'>{item.email}</span>
            </div>
            <div className='tooltip-div'>
                <p className='p-black m-5 tooltip-dif'>{item.phone} </p> 
                <span className='tooltip-text'>{item.phone}</span>
            </div>
        </div>
    )
}

// main Component - Working with Get request component
function Get(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    
    useEffect(()=>{
        setLoading(true)
        setData(null)
        getData(page)  // endpoint to get user data
        .then(response=>{
            // 
            if(response?.success) { 
                setData(response.users)
                setTotalPages(response.total_pages)
                setLoading(false)
            } 
            else { 
                console.log(response?.message)
                return response?.message
             } 
        })
    }, [page])
    return (
        <div className='bg-color get-div' id="users">
            <p className='h1-black tac'>Working with GET request</p>
            <div className='get-inner-div'>
                {loading ?
                    <Spinner />
                :
                <>
                    {data?.map((item, index)=>{
                        return (<Card item={item} index={index} key={index}/>)}
                    )}
                </>
                }
            </div>
            {page < totalPages && 
            <button type='button' className='primary-button' onClick={()=>{setPage(page+1)}}>Show more</button>
            }
        </div>
    )
}

export default Get;
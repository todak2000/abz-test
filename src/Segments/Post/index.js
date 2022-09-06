import './post.css';
import { useState, useRef, useEffect } from 'react';
import { Spinner } from '../../Spinner';
import Success from '../../Assets/Success';
import { getPositions, registerUsers } from '../../Api/index';

// Working with Post Request component
function Post(){
    const [nameLabel, setNameLabel]= useState("")
    const [name, setName]= useState("")
    const [emailLabel, setEmailLabel]= useState("")
    const [email, setEmail]= useState("")
    const [phone, setPhone]= useState("")
    const [phoneLabel, setPhoneLabel]= useState("")
    const [nameError, setNameError]= useState("")
    const [errorMessage, setErrorMessage]= useState("")
    const [emailError, setEmailError]= useState("")
    const [phoneError, setPhoneError]= useState("")
    const [uploadError, setUploadError]= useState("")
    const [loader, setLoader]= useState(false)
    const [result, setResult]= useState(false)
    const [imageName, setImageName]= useState("Upload your photo")
    const [image, setImage]= useState(null)
    const [positions, setPositions] = useState(null)
    const [positionID, setPositionID] = useState(null)

    useEffect(()=>{
        getPositions().then(response=>{  // endpoint to get positions
            if(response?.success) { 
                setPositions(response.positions)
            } 
            else { 
                console.log(response?.message)
                return response?.message
             }

        })

    }, [])

    const hiddenFileInput = useRef(null)

    const handleClick = event=>{
        hiddenFileInput.current.click();  
    }

    const handleChange= event=>{
        setImageName(event.target.files[0].name)
        setImage(event.target.files[0])
    }
    const handleName= event=>{
        setName(event.target.value)
    }
    const handleEmail= event=>{
        setEmail(event.target.value)
    }
    const handlePhone= event=>{
        setPhone(event.target.value)
    }

    const handleSelect= (event)=>{
        setPositionID(event.target.id)
    }

    const formSubmit = ()=>{
        setNameError("")
        setEmailError("")
        setPhoneError("")
        setUploadError("")
        setErrorMessage("")
        setLoader(true)
        let formData = new FormData(); 
        formData.append('position_id', positionID); 
        formData.append('name', name); 
        formData.append('email', email); 
        formData.append('phone', phone); 
        formData.append('photo', image)

        registerUsers(formData) //endpoint to register new user
        .then(response=>{
            setLoader(false)
            if(response?.success) { 
                setResult(true)
                setNameError("")
                setEmailError("")
                setPhoneError("")
                setErrorMessage("")
                setUploadError("")
            } 
            else { 
                if (response?.fails?.name) setNameError(response?.fails?.name)
                if (response?.message)setErrorMessage(response?.message)
                if (response?.fails?.email) setEmailError(response?.fails?.email)
                if (response?.fails?.phone) setPhoneError(response?.fails?.phone)
                if (response?.fails?.photo) setUploadError(response?.fails?.photo)
             } 
        }).catch(err=>{
            console.error(err); 
            setLoader(false)
        })
    }

  
    return(
        <div className='bg-color post-div' id="signup"> 
            {loader ?
                <Spinner />
            :
                <>
                {result?
                    <div className='result-div'>
                        <p className='h1-black tac mb-20'>User successfully registered</p>
                        <Success />
                    </div>
                :
                  <>
                    <p className='h1-black tac'>Working with POST request</p>
                    <p className={errorMessage === "" ?'input-label': 'input-label-error-top'}>{errorMessage}</p>
                    <div className='post-inner-div'>
                        <div className='post-inner-inner'>
                            <div className={nameError === "" ?'input-div': 'input-div-error'}>
                                {nameLabel === "Name" && <p className={nameError === "" ?'input-label': 'input-label-error'}>{nameLabel}</p>}
                                <input type='text' className='input-text' 
                                    onFocus={()=>{setNameLabel("Name")}} 
                                    onBlur={()=>{setNameLabel("")}} 
                                    placeholder='Your name'
                                    onChange={handleName}
                                />   
                            </div>
                            {nameError!=="" && <p className='error-p'>{nameError}</p>}
                        </div>

                        <div className='post-inner-inner'>
                            <div className={emailError === "" ?'input-div': 'input-div-error'}>
                                {emailLabel === "Email" && <p className={emailError === "" ?'input-label': 'input-label-error'}>{emailLabel}</p>}
                                <input type='email' className='input-text' 
                                    onFocus={()=>{setEmailLabel("Email")}} 
                                    onBlur={()=>{setEmailLabel("")}} 
                                    placeholder='Email'
                                    onChange={handleEmail}
                                />
                                
                            </div>
                            {emailError !=="" && <p className='error-p'>{emailError}</p>}
                        </div>
                        
                        <div className='post-inner-inner'>
                            <div className={phoneError === "" ?'input-div': 'input-div-error'}>
                                {phoneLabel === "Phone" && <p className={phoneError === "" ?'input-label': 'input-label-error'}>{phoneLabel}</p>}
                                <input type='text' className='input-text' 
                                    onFocus={()=>{setPhoneLabel("Phone")}} 
                                    onBlur={()=>{setPhoneLabel("")}} 
                                    placeholder='Phone'
                                    onChange={handlePhone}
                                />
                                
                            </div>
                            {phoneError !==""? <p className='error-p'>{phoneError}</p>: <p className='helper-p'>+38 (XXX) XXX - XX - XX</p>}
                        </div>

                        <p className='select-p'>Select your position</p>
                        <div id="group2" className='radio-div'>
                            {positions?.map((item, index)=>{
                                return (
                                    <div key={index}>
                                        <input type="radio" value={item.name} id={item.id} name="group2" onChange={handleSelect}/><span>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='post-inner-inner m-50'>
                            <div className={uploadError === "" ?'input-div-upload': 'input-div-upload-error'}>
                                <button className={uploadError === "" ?'upload-but': 'upload-but-error'}  onClick={handleClick}>Upload</button>
                                <input type='file' className='input-text-file' ref={hiddenFileInput} onChange={handleChange}/>
                                <input type='text' className='input-text-two' 
                                    value={imageName}
                                    disabled
                                />
                                
                            </div>
                            {uploadError !==""&& <p className='error-p'>{uploadError}</p>}
                        </div>
                        
                        {name === "" || email === "" || phone === "" || positionID === null || image === null ?
                            <button type='button' className='disabled-button'onClick={()=>{console.log("Disabled button")}} >Sign up</button>
                        :
                            <button type='button' className='primary-button'onClick={()=>{formSubmit()}} >Sign up</button>
                        }
                        
                    </div>
                  </>
                }
                </> 
            }
        </div>
    )
}
export default Post
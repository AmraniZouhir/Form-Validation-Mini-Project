import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

export default function FormsValidation() {

    const name = useRef()
    const prenom = useRef()
    const email = useRef()
    const message = useRef()
    const city = useRef()
    const accept = useRef()

    const [isFormValid, setisFormValid] = useState(false)
    const [errors ,setError] =useState([])


    const resetForm = ()=>{
        name.current.value =''
        prenom.current.value=''
        email.current.value =''
        message.current.value =''
        city.current.value=''
        accept.current.checked=false
    }
    

    const validateForms =()=>{
        const valueName = name.current.value
        const valuePrinom = prenom.current.value
        const valueEmail = email.current.value
        const valueMessage = message.current.value
        const valueCity = city.current.value
        const valueAccept = accept.current.checked
        setError([])
        let isFormValid = true 


        if(valueName.trim() === ''){
            setError(prevStat=> {return {...prevStat , ...{name :"filde required"} }} ) 
            isFormValid =false
        }

        if(valuePrinom.trim() === ''){
            setError(prevStat=> {return {...prevStat ,...{prenom :"filde required" } }}) 
            isFormValid =false

        }

        if(valueEmail.trim() === ''){
            setError(prevStat=> {return {...prevStat ,...{email :"filde required"} }} ) 
            isFormValid =false

        }else if (!valueEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            setError(prevStat=> {return {...prevStat ,...{email :"Email incorrec"} }} ) 
 
            isFormValid =false

        }

        if(valueMessage.trim() === ''){
            setError(prevStat=>{return {...prevStat ,...{message :"filde required"}}} ) 
            isFormValid =false

        }

        if(valueCity.trim() === ''){
            setError(prevStat=>{return {...prevStat ,...{city :"filde required"}}} ) 
            isFormValid =false

        }

        if(!valueAccept){
            setError(prevStat=>{return {...prevStat ,...{Accept :"Accept All Conditions"} }} ) 

            isFormValid =false

        }
        return isFormValid

    }

    useEffect(()=>{
        console.log(errors)
    },[errors])

    const displayErrors =()=>{
       return errors.map( (error ,key)=>{
        return <li key={key}> {error.filde} : {error.message}</li>
       })
    }


    const HandelFilds = (e) => {
        e.preventDefault()
       if(validateForms()){
        setisFormValid(true)
        resetForm()
       }
       
    }


    return <div className={'container-fluid w-75 mx-auto my-5'}>
        
        {isFormValid?
            <div className="alert alert-success" role="alert">
                <strong>success</strong> Message sent successfully !!
            </div>

            : ''}

        <form onSubmit={HandelFilds}>
            {errors.length > 0 ?
            <div className="alert alert-danger" role="alert">
                <strong>ERROURS</strong> 
                <ul>
                    {displayErrors()}
                </ul>
            </div>
            
            :''}
            <div >
                <h1>Contact Form</h1>
                <hr />
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="NAME" ref={name} />
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Prenom</label>
                    <input type="text" className="form-control" id="prenom" placeholder="PRENOM" ref={prenom} />
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Adres Email</label>
                    <input type="text" className="form-control" id="email" placeholder="ADRES EMAIL" ref={email} />
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="4" ref={message}></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">City</label>
                    <select className="form-select form-select-lg" id="city" ref={city}>
                        <option value="">Select on</option>
                        <option value="MA">Maroc</option>
                        <option value="TUN">Tunisi</option>
                        <option value="ALG">Algeri</option>
                        <option value="EGP">Egept</option>
                    </select>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="check" ref={accept} />
                    <label htmlFor="name" className="form-label">Accept All Conditions</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
}
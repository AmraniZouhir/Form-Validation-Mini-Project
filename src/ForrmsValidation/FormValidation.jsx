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

    const [errors, setError] = useState({})
    const [isFormValid, setisFormValid] = useState(false)
    const [isFormValidButton, setisFormValidButton] = useState(false)


    const resetForm = () => {
        name.current.value = ''
        prenom.current.value = ''
        email.current.value = ''
        message.current.value = ''
        city.current.value = ''
        accept.current.checked = false
    }

    const validationFilde = (ref) => {
        if (ref.current.value.trim() === '') {
            setError(prevStat => { return { ...prevStat, ...{ [ref.current.id]: "filde required" } } })
            setisFormValid(false)
        }
    }


    const validateForms = () => {
        const valueName = name.current.value
        const valuePrinom = prenom.current.value
        const valueEmail = email.current.value
        const valueMessage = message.current.value
        const valueCity = city.current.value
        const valueAccept = accept.current.checked
        setError([])
        let isFormValid = true

        validationFilde(name)
        validationFilde(prenom)
        validationFilde(message)
        validationFilde(city)

        if (valueEmail.trim() === '') {
            setError(prevStat => { return { ...prevStat, ...{ email: "filde required" } } })
            isFormValid = false
        }

       else if (!valueEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            setError(prevStat => { return { ...prevStat, ...{ email: "Email incorrec" } } })
            isFormValid = false
        }

   
        if (!valueAccept) {
            setError(prevStat => { return { ...prevStat, ...{ accept: "CheckBox Must Be Checked" } } })
            isFormValid = false

        }
        setisFormValidButton(isFormValid)
        return isFormValid

    }
    //hadi fach st3mlnaha bhala 3tatna wahd lboucle infini
    // useEffect(() => {
    //     if(!isFormValid){
    //         validateForms()

    //     }
    // }, [errors,isFormValid])

    const handelChangeFild = () => {
        validateForms()
    }

    const displayErrors = () => {
        return Object.entries(errors).map((error, key) => {
            const [filde, message] = error
            return <li key={key}> {filde} : {message}</li>
        })
    }


    const fildGetError = (fildName) => {
        return errors[fildName]
    }

    const borderError = (fildName) => {
        return fildGetError(fildName) !== undefined
    }

    const displayFildErrors = (fildName) => {
        const border = document.querySelector(`#${fildName}`)
        if (borderError(fildName)) {
            border.style.border = '1px solid red'
            return <div className='text-danger'>{fildGetError(fildName)}</div>
        }
        else if (border !== null) {
            border.removeAttribute('style')
        }

    }

    const HandelFilds = (e) => {
        e.preventDefault()
        setisFormValid(false)
        if (validateForms()) {
            setisFormValid(true)
            resetForm()
        }

    }


    return <div className={'container-fluid w-75 mx-auto my-5'}>

        {isFormValid ?
          
          <div className="jumbotron jumbotron-fluid">
          <div className="container">
              <h1 className="display-3">Message sent successfully !!</h1>
              <p className="lead">Thank you for your message</p>
              <hr className="my-2"/>
              <p>More info</p>
              <p className="lead">
                  <a className="btn btn-primary btn-lg" href="" role="button">Return to contact page</a>
              </p>
          </div>
      </div>

            : 
            <form onSubmit={HandelFilds} onChange={handelChangeFild}>
            {Object.keys(errors).length > 0 ?
                <div className="alert alert-danger" role="alert">
                    <strong>ERROURS</strong>
                    <ul>
                        {displayErrors()}
                    </ul>
                </div>

                : ''}
            <div >
                <h1>Contact Form</h1>
                <hr />
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="NAME" ref={name}  />
                    {displayFildErrors('name')}
                </div>

                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prenom</label>
                    <input type="text" className="form-control" id="prenom" placeholder="PRENOM" ref={prenom}  />
                    {displayFildErrors('prenom')}

                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Adres Email</label>
                    <input type="text" className="form-control" id="email" placeholder="ADRES EMAIL" ref={email} />
                    {displayFildErrors('email')}

                </div>

                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="4" ref={message} ></textarea>
                    {displayFildErrors('message')}

                </div>

                <div className="mb-3">
                    <label className="form-label">City</label>
                    <select className="form-select form-select-lg" id="city" ref={city} >
                        <option value="">Select on</option>
                        <option value="MA">Maroc</option>
                        <option value="TUN">Tunisi</option>
                        <option value="ALG">Algeri</option>
                        <option value="EGP">Egept</option>
                    </select>
                    {displayFildErrors('city')}

                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="accept" ref={accept} />
                    <label htmlFor="check" className="form-label">Accept All Conditions</label>
                    {displayFildErrors('accept')}

                </div>


                <button disabled={!isFormValidButton} type="submit" className="btn btn-primary w-100 mb-4">Submit</button>
            </div>
        </form>
            }

       
    </div>
}
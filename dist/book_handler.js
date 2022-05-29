const form = document.querySelector('.booking-form')

    const handleErrors = (error_object) => {
        let error_message = ''

        if(error_object.name !== ''){
            error_message = error_object.name
        }

        if(error_object.na !== ''){
            error_message = error_object.na
        }

        if(error_object.user_status !== ''){
            error_message = error_object.user_status
        }

        if(error_message === ''){
            error_message = 'Cannot perform task, check email and try again'
        }

        return error_message

    }
    

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const email_input = document.querySelector('.booking-email')
        const error_container = document.querySelector('.error-container')
        const email = email_input.value

        try{
            const res = await fetch('/computer/book', {
            method: 'POST',
            body: JSON.stringify({email: email}),
            headers: {'content-Type': 'application/json'}
        })

        const data = await res.json()
        
        if(data.computer_errors){

            const error_message = handleErrors(data.computer_errors)
            
            error_container.innerHTML = `<p class = "alert alert-danger">${error_message}</p>`

            setTimeout(() => {
                error_container.innerHTML = ``
            }, 3000);
        }else{
            alert(`Your computer id is ${data.user.computer_id}`)
        }

        }
        catch(err){
            
        }

    })
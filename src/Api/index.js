const baseUrl = "https://frontend-test-assignment-api.abz.agency/api/v1";
const count = 6

export  async function getData(page) {
    const response = await fetch(`${baseUrl}/users?page=${page}&count=${count}`)
    .then((response)=> { return response.json() }) 
    .then(response=>{ 
            return response
        })
    .catch(err => err.json())
    return response
}

export async function getPositions(){
    const response = await fetch(`${baseUrl}/positions`)
    .then(response=>{return response.json()})
    .then(response=>{return response})
    .catch(err =>err.json())
    return response
}

function getToken(){
    const token = fetch(`${baseUrl}/token`) 
    .then(response =>{ return response.json(); }) 
    .then(response => { return response}) 
    .catch(err =>err.json())
    return token
}

export async function registerUsers(body){
    const token = await getToken()
    let other ={
        method: 'POST',
        headers: {'Token': token.token},
        body:body
    }
    const response = await fetch(`${baseUrl}/users`, other)
    .then(response=>{return response.json()})
    .then(response=>{return response})
    .catch(err =>{
        console.error(err, "error")
        return err.json()
    })
    console.log(response, "response1")
    return response
}


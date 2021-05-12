import {useState} from 'react'

function Login(){
    const [form , setForm] = useState(true)
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [emailError , setEmailError] = useState("")
    const [passwordError , setPasswordError] = useState("")
    const [token , setToken] = useState("")

    async function submitLogin(e){
        e.preventDefault();
        let canSubmit = true;
        if(email === ""){
            setEmailError("Email Address is required")
            canSubmit = false;
        }
        if(password === ""){
            setPasswordError("Password is required")
            canSubmit = false;
        }
        if(!canSubmit){
            return;
        }

        try {
            const response = await fetch('https://reqres.in/api/login' , {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({email : email , password : password})
            })
            if(response.ok){
                const {token} = await response.json()
                setToken(token)
                setForm(false)
            }else{

            }
        }catch (error){

        }

    }

    return <div>
        {
            form ?
                <form onSubmit={submitLogin}>
                  <h1>
                      Login form
                  </h1>
                  <div>
                      <input
                          type="email"
                          placeholder="Email Address"
                          onChange={(e) => {
                              setEmail(e.target.value)
                              if(e.target.value === ""){
                                  setEmailError("Email Address is required")
                              }else{
                                  setEmailError("")
                              }
                          }}
                      />
                      <div>
                          { emailError !== "" ? emailError : ""}
                      </div>
                  </div>
                  <div>
                      <input
                          type="password"
                          placeholder="Password"
                          onChange={(e) => {
                              setPassword(e.target.value)
                              if(e.target.value === ""){
                                  setPasswordError("Password is required")
                              }else{
                                  setPasswordError("")
                              }
                          }}
                      />
                      <div>
                          { passwordError !== "" ? passwordError : ""}
                      </div>
                  </div>
                  <button  type={"submit"}>Login</button>
                </form>
                :
                <div>Hi user your token is {token} </div>
        }
    </div>
}

export default Login
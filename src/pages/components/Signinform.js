import React, { useEffect , useRef , useState } from "react";
import {firestore, auth , googleProvider} from "../../Firebase";
import {addDoc , setDoc , getDoc , getDocs , doc , collection} from "@firebase/firestore";
import CreatAccount from "./creatAccount";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { Await, useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Signinform = () => {

    let person;
    const Navigate = useNavigate();
    const [canSignIn , setcanSignIn] = useState(true);
    
    function changecanSignIn(e) {
        e.preventDefault();
        setcanSignIn(!canSignIn);
    };

    
    // Set required cookies and usr data
    const SignInWithGoogle = async () => {

        try
        {
            person = await signInWithPopup(auth, googleProvider);
            cookies.set("auth-token", person.user.refreshToken);
            cookies.set("sender-email", person.user.email);

            console.log(person);

            // Keep user logged in if verified
            if(person.user.refreshToken){
                Navigate('/Home');
            }else{
                Navigate('/');
            }

            // Adding non existing users to the data base
            const docSnap = await getDocs(collection(firestore, 'Users'));
            const usersEmails = docSnap.docs.map((doc) => doc.id);
            console.log(usersEmails);

                if (usersEmails.includes(person.user.email))
                {
                    console.log('current user exists');
                }
                else
                {
                    console.log('current user not in database');

                    let data = {
                        email: person.user.email ,
                        displayName: person.user.displayName ,
                        picture: person.user.photoURL , 
                    };
                    
                    try
                    {
                        let addUser = setDoc(doc(firestore, 'Users' , data.email ) , data);
                        console.log('user added')
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                }
            

        } 
        catch(err) 
        {
            console.error(err);
        }

    };

    // Keep user logged-in
    const logcook = cookies.get("auth-token");
    useEffect( () => {

        if(!logcook){
            Navigate('/');
          }else{
            Navigate('/Home');
          }
    } , [] );
    




    // const emailRef = useRef();
    // const ref = collection(firestore,"email");

    // const handleSubmit = async (e) =>{
    //     e.preventDefault();
    //     console.log(emailRef.current.value);

    //     let data = {
    //         email:emailRef.current.value,
    //     }

    //     try{
    //         addDoc(ref,data);
    //     }catch(e){
    //         console.log(e);
    //     }
    // onSubmit={handleSubmit}
    // ref={emailRef}
    // };



    return(
        <div>  
            { canSignIn ?
            <div className="rounded-3xl border-2 mx-auto p-3 w-5/6 relative top-16 drop-shadow-sm shadow-lg shadow-indigo-500/30 bg-slate-50/5 ">

                {/* Sign in form */}
                <form >
                    <h2 className="font-bold text-lg my-1 mx-2 w-fit"> Sign in </h2>

                    <div  className=" w-full mx-auto" >
                        <br/>
                        <label htmlFor="email" className=" font-thin text-sm ml-2 ">Email</label><br/>
                        <input type="email" id="email" name="email" required className=" text-slate-700 w-full mx-auto my-1 px-3 py-1 rounded-xl bg-slate-50 " >
                        </input><br/>


                        <label htmlFor="pwd" className=" font-thin text-sm ml-2 ">Password</label><br/>
                        <input type="password" id="pwd" name="pwd" required className=" text-slate-700 w-full mx-auto my-1 px-3 py-1 rounded-xl bg-slate-50 " >
                        </input><br/>

                        <div className="w-1/2 mx-auto rounded-3xl py-1 bg-gradient-to-r from-purple-600 to-pink-400 mt-6">
                            <button className="w-full text-slate-50 font-medium"> Sign in </button>
                        </div>
                    </div>
                </form>

                <h4 className="mx-auto w-fit mt-5 mb-0 text-sm font-thin text-slate-500" > --- OR --- </h4>

                <div className="w-full mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48"
                        className="w-8 mx-auto" onClick={SignInWithGoogle}>
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                </div>

                <div className="w-fit mx-auto grid grid-flow-row">
                    <p className="text-sm font-light text-slate-500"> Don't have an acount?
                    <a href="" className="ml-2 text-sm font-black text-slate-500 underline" onClick={changecanSignIn} >Sign Up</a>
                    </p>
                </div>

            </div>

        :

            <div>
                <CreatAccount/>

                <div className="w-fit mx-auto grid grid-flow-row mt-20">
                    <p className="text-sm font-light text-slate-500"> Already have an acount?
                    <a className="ml-2 text-sm font-black text-slate-500 underline" onClick={changecanSignIn}>Sign In</a>
                    </p>
                </div>
            </div>
        }

        </div>
    );
}
export default Signinform;
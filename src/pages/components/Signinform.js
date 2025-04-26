import React, { useEffect , useRef , useState } from "react";
import {firestore, auth , googleProvider} from "../../Firebase";
import {addDoc , setDoc , getDoc , getDocs , doc , collection} from "@firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

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
    


    return(
        <div className="relative top-24 lg:top-20 w-full">  
        
            <div className="w-fit mx-auto my-6 text-center">
                <p className="text-5xl font-semibold text-slate-700 py-6">Welcome to <span className="text-purple-600">Waxtan</span></p>
                <p className="mt-12 lg:mt-1 lg:text-sm text-slate-600 ">Customer service made simple for small businesses.</p>
                <p className="lg:mt-1 lg:text-sm text-slate-600"><span className="text-pink-400 lg:text-pink-600">Real-time</span> support. Real <span className="text-purple-600 lg:text-purple-600">human</span> connection.</p>
            </div>

            <div className="rounded-3xl lg:rounded-2xl mx-auto p-3 w-4/6 lg:w-1/6 shadow-lg bg-slate-50/5 lg:bg-slate-50 mt-12 lg:mt-28 mb-6 ">
                <div  className=" w-full mx-auto " >
                    <div className="w-full my-0 ">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48"
                        className="w-8 mx-auto" onClick={SignInWithGoogle}>
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    </div>

                    <div className="w-fit mx-auto px-3 rounded-3xl py-1 bg-gradient-to-r from-purple-600 to-pink-400 mt-1 mb-3" onClick={SignInWithGoogle}>
                        <button className="w-full text-slate-50 font-medium "> Sign in with Google </button>
                    </div>
                </div>
            </div>

            <div className="w-fit mx-auto my-6 text-center">
                <p className="mt-2 text-slate-500 lg:text-slate-50 text-sm">Thank you for trusting us to help you grow!</p>
            </div>
        </div>
    );
}
export default Signinform;
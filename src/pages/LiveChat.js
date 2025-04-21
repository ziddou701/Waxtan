import Sendmessage from "./components/Sendmessage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {addDoc , setDoc , getDoc , getDocs , doc , collection} from "@firebase/firestore";
import { firestore } from "../Firebase";

const LiveChat = () => {
    
    const cookies = new Cookies();
    const Navigate = useNavigate();
    const logCookie = cookies.get("auth-token");
    const [receiver , setReceiver] = useState({});
    const receiverEmail = cookies.get('receiver-email'); //getting the receiver email cookie


// Check User laggin status
    useEffect( () => {
        
        if(!logCookie){
            Navigate('/');
          }else{
            Navigate('/Live');
          };
        
        fetchReceiverDetails();
        CreateNewChatRoom(); //calling the create new chat room fuction if does not exist
    } , [] );



// Fetch user information and creating chatRoom
    
    const fetchReceiverDetails = async () => {
        try
        {
            const docRef = doc(firestore, "Users", receiverEmail); 
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const userData = {
                name: data.displayName,
                email: data.email,
                picture: data.picture?.trim() === ""
                ? "https://cdn-icons-png.freepik.com/512/7855/7855833.png"
                : data.picture ?? "https://cdn-icons-png.freepik.com/512/7855/7855833.png"
                // checking to see if the user has a picture or not
            };
            setReceiver(userData);
            console.log(userData);
        }
        catch (err)
        {
            console.log('not working', err);
        };
    }

    const senderEmail = cookies.get('sender-email');
    const currentChatRoom = (senderEmail+"-"+receiverEmail);


    const CreateNewChatRoom = async () => {
        try
        {
            let docSnap = await getDocs(collection(firestore, 'ChatRooms'));
            let chatRooms = docSnap.docs.map((doc) => doc.id);
            console.log(chatRooms);

            if (chatRooms.includes(currentChatRoom))
                {
                    console.log('current chatroom exists');
                }
                else
                {
                    console.log('current chatroom not in database');

                    let data = {
                        sender: senderEmail ,
                        receiver: receiverEmail ,
                        messages: [] ,
                    };

                    try
                    {
                        let addNewChatRoom = setDoc(doc(firestore, 'ChatRooms' , currentChatRoom ) , data);
                        console.log('chatRoom added');
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    //Pull in the chat history function











    return(
        <div>
            {/* top bar */}
            <div className="fixed w-full pb-2 pt-7 flex flex-row shadow-lg" >
                {/* Back button */}
                <div className="w-5 py-3 mx-5" onClick={()=> { Navigate('/Home'); }} >
                    <svg xmlns="http://www.w3.org/2000/svg " viewBox="0 0 384 512" className="fill-purple-700"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </div>
                {/* Profile pic */}
                <div className="rounded-full bg-slate-100 w-12 h-12">
                    <img src={receiver.picture} alt="Img" className="rounded-full"/>
                </div>
                {/* User Name */}
                <div className=" mx-3 py-3 text-md text-slate-800 font-bold">
                    {receiver.name}
                </div>
            </div>  

                
            {/* ---- body ---- */}
            <div className="fixed top-24 w-full h-4/5 overflow-x-scroll bg-slate-100 pt-4"> 

                {/* Incoming message */}
                <div className="w-3/5 my-2 ml-3 mr-auto ">
                    <p className=" bg-blue-100 shadow-sm p-2 px-4 rounded-full text-md text-slate-800 w-fit " >Hello there! </p>
                </div>

                {/* outgoing message */}
                <div className="w-3/5 my-2 mr-3 ml-auto ">
                    <p className=" bg-purple-600 shadow-sm py-2 px-4 rounded-full text-md text-white w-fit ml-auto " >Hi!</p>
                </div>
            </div>

            {/* Send message */}
            <div>
                <Sendmessage/>
            </div>

        </div>
    );
}
export default LiveChat;
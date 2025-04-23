import Sendmessage from "./components/Sendmessage";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState} from "react";
import Cookies from "universal-cookie";
import {addDoc , setDoc , onSnapshot, getDoc , getDocs , doc , collection, query, where} from "@firebase/firestore";
import { firestore } from "../Firebase";

const LiveChat = () => {
    
    const hasCreatedRef = useRef(false);
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

        if (!hasCreatedRef.current) {
            fetchReceiverDetails();
            CreateNewChatRoom(senderEmail, receiverEmail); //calling the create new chat room fuction if does not exist
            hasCreatedRef.current = true;
        }

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
                picture: data.picture && data.picture.trim() !== ""
                    ? data.picture
                    : "https://cdn-icons-png.freepik.com/512/7855/7855833.png"
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

    const CreateNewChatRoom = async (senderEmail, receiverEmail) => {
        try {
          const chatRoomsRef = collection(firestore, "ChatRooms");
      
          // Query for chat rooms where senderEmail is a participant
          const chatQuery = query(
            chatRoomsRef,
            where("participants", "array-contains", senderEmail)
          );
      
          const docSnap = await getDocs(chatQuery);
      
          // Check if any of the returned documents also contain receiverEmail
          const existingRoom = docSnap.docs.find((doc) => {
            const participants = doc.data().participants;
            return participants.includes(receiverEmail);
          });
      
          if (existingRoom) {
            console.log("✅ Chat room already exists:", existingRoom.id);
          } else {
            // Create a new chat room with random ID
            const data = {
              participants: [senderEmail, receiverEmail],
              messages: [],
            };
      
            const newDocRef = await addDoc(chatRoomsRef, data);
            console.log("🆕 Chat room created with ID:", newDocRef.id);
          }
        } catch (err) {
          console.error("🔥 Error creating chat room:", err);
        }
      };

    //////////////////Pull in the chat history function

      const useChatMessages = (senderEmail, receiverEmail) => {
        const [messages, setMessages] = useState([]);
      
        useEffect(() => {
          if (!senderEmail || !receiverEmail) return;
      
          const chatRoomsRef = collection(firestore, "ChatRooms");
      
          const q = query(chatRoomsRef, where("participants", "array-contains", senderEmail));
      
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const matchingDoc = querySnapshot.docs.find((doc) => {
              const participants = doc.data().participants;
              return participants.includes(receiverEmail);
            });
      
            if (matchingDoc) {
              const data = matchingDoc.data();
              const sortedMessages = [...(data.messages || [])].sort(
                (a, b) => new Date(a.time) - new Date(b.time)
              );
              setMessages(sortedMessages);
              console.log("✅ Messages retrieved:", sortedMessages);
            } else {
              setMessages([]);
              console.log(" No messages found");
            }
          });
      
          // Cleanup listener on unmount
          return () => unsubscribe();
        }, [senderEmail, receiverEmail]);
      
        return messages;
      };

      const messages = useChatMessages(senderEmail, receiverEmail);

      const messagesEndRef = useRef(null); // scroll last message into view
      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////







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
            <div className="fixed top-24 w-full h-5/6 overflow-x-scroll bg-slate-100 pt-4"> 

                {messages.map((msg, index) => (
                <div className={msg.sender === senderEmail ? 'w-3/5 my-1 mr-3 ml-auto' : 'w-3/5 my-1 ml-3 mr-auto'} key={index}>
                    <div className={msg.sender === senderEmail ? 'bg-purple-600 shadow-sm py-2 px-4 rounded-2xl text-md text-white w-fit ml-auto' : 
                        'bg-blue-100 shadow-sm p-2 px-4 rounded-2xl text-md text-slate-800 w-fit' }>{msg.text}
                        <br/>
                        <p className="text-xs font-light py-1 ml-auto mr-0 w-fit">{msg.now}</p>
                    </div>
                </div>
                 ))}

                {/* Dummy div to scroll to */}
                <div ref={messagesEndRef} className="h-1/6" />

            </div>

            {/* Send message */}
            <div>
                <Sendmessage/>
            </div>

        </div>
    );
}
export default LiveChat;
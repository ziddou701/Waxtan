import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { collection, query, where, getDocs , doc , getDoc } from "firebase/firestore";
import { firestore } from "../../Firebase";
import { useState , useEffect , useRef } from "react";

const Chat = () => {

    const Navigate = useNavigate();
    const cookies = new Cookies();
    const senderEmail = cookies.get("sender-email");
    const [chatRoom , setChatRooms] = useState();
    const [receivers , setReceivers] = useState();
    const [receiverEmail , setReceiverEmail] = useState();
    const [lastMessages , setLastMessages] = useState();
    const [hasFetched, setHasFetched] = useState(false);


    useEffect(() => {
    if (hasFetched) return;

    const fetchChatRooms = async () => {
        const rooms = await fetchChatRoomsBySender(senderEmail);
        setChatRooms(rooms);
        setHasFetched(true);
    };

    fetchChatRooms();
    fetchReceiverEmails();

    }, [hasFetched]);

    useEffect(() => {
        const loadChatUsers = async () => {
          const chatRooms = await fetchChatRoomsBySender(senderEmail);
          const receivers = getReceiverEmails(chatRooms, senderEmail);
          await fetchReceiverUsers(receivers);
          return receivers;
        };

        loadChatUsers();
    },[]);


    useEffect(() => {
        const fetchAndExtractLastMessages = async () => {
          const chatRooms = await fetchChatRoomsBySender(senderEmail);
          const lastMessages = getLastMessages(chatRooms);
          console.log("Last messages:", lastMessages);
          setLastMessages(lastMessages);
          };

          fetchAndExtractLastMessages();
    },[]);

    useEffect(() => {
        
    },[]);

    const fetchChatRoomsBySender = async (senderEmail) => {
        try {
          const chatRoomsRef = collection(firestore, "ChatRooms");
      
          // Query where participants array contains senderEmail
          const q = query(chatRoomsRef, where("participants", "array-contains", senderEmail));
      
          const querySnapshot = await getDocs(q);
      
          const chatRooms = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          console.log("✅ Chat rooms found:", chatRooms);
          return chatRooms;
        } catch (error) {
          console.error("🔥 Error fetching chat rooms:", error);
          return [];
        }
      };

    const getReceiverEmails = (chatRooms, senderEmail) => {
    const receiverEmails = chatRooms.map(room => {
      return room.participants.find(email => email !== senderEmail);
    }).filter(Boolean); // removes undefined/null values
    
    return receiverEmails;
    };

    const fetchReceiverEmails = async () => {
      const chatRooms = await fetchChatRoomsBySender(senderEmail);
      const receivers = getReceiverEmails(chatRooms, senderEmail);
      console.log("Receiver emails:", receivers);
      setReceiverEmail(receivers);
    };
    
    const fetchReceiverUsers = async (receiverEmails) => {
        try {
          const userDetails = await Promise.all(
            receiverEmails.map(async (email) => {
              const userRef = doc(firestore, "Users", email);
              const userSnap = await getDoc(userRef);
      
              if (userSnap.exists()) {
                const data = userSnap.data();
                return {
                  name: data.displayName,
                  email: data.email,
                  pictureUrl: data.picture?.trim() === ""
                    ? "https://cdn-icons-png.freepik.com/512/7855/7855833.png"
                    : data.picture
                };
              } else {
                console.warn(`User not found for email: ${email}`);
                return null;
              }
            })
          );
      
          const validUsers = userDetails.filter(Boolean); // remove nulls
          setReceivers(validUsers); // useState setter
          console.log("Receiver user info:", validUsers);
        } catch (err) {
          console.log("Error fetching user info:", err);
        }
    };

    const getLastMessages = (chatRooms) => {
        return chatRooms.map((room) => {
          const messages = room.messages || [];
          const lastMessage = messages[messages.length - 1];
          return lastMessage ? lastMessage.text : "No messages yet";
        });
    };

    const messagesEndRef = useRef(null); // scroll last message into view
      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [receivers]);


    return(
        <div>

        {receivers && receivers.length > 0 && receivers.map((receiver, index) => { 
         return(   
        <div className="grid grid-cols-7 bg-slate-100 rounded-2xl my-2 mx-2 p-2 max-h-14 overflow-hidden" onClick={() => { Navigate('/Live'); cookies.set("receiver-email", receiver.email ); }} key={index} >

            {/* Profile picture */}
            <div className="rounded-full w-10 h-10 bg-white col-span-1 ">
                <img src={receiver.pictureUrl} alt="img" className="rounded-full w-full"/>
            </div>

            <div className="col-span-6 mr-1 ">
                {/* User Name */}
                <div className=" text-md text-slate-800 font-bold">
                    {receiver.name}
                </div>
                {/* Body */}
                <div className=" overflow-hidden text-sm text-slate-600">
                    {lastMessages[index]}
                </div>
            </div>
        </div>)
        })}
        
        {/* Dummy div to scroll to */}
        <div ref={messagesEndRef} className="h-1/6" />

        </div>
    );
    
}
export default Chat;
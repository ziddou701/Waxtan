import { useState } from "react";
import Cookies from "universal-cookie";
import { firestore } from "../../Firebase";
import { doc, query, where, collection, getDocs, updateDoc, arrayUnion } from "@firebase/firestore";




const SendMessage = () => {

    const [messageOut , setMessageOut] = useState('');
    const cookies = new Cookies();


    const senderEmail = cookies.get("sender-email");
    const receiverEmail = cookies.get('receiver-email');

    const sendMessage = async (message) => {
        try {
          const chatRoomsRef = collection(firestore, "ChatRooms");
      
          // Query for chat rooms that include the sender
          const q = query(chatRoomsRef, where("participants", "array-contains", senderEmail));
          const querySnapshot = await getDocs(q);
      
          // Find the document where participants include both sender and receiver
          const matchingDoc = querySnapshot.docs.find((doc) => {
            const participants = doc.data().participants;
            return participants.includes(receiverEmail);
          });
      
          if (matchingDoc) {
            const chatRoomRef = doc(firestore, "ChatRooms", matchingDoc.id);
      
            // Append the new message to the array
            await updateDoc(chatRoomRef, {
              messages: arrayUnion(message),
            });
      
            console.log("✅ Message sent!");
          } else {
            console.log("❌ No chat room found with both participants.");
          }
        } catch (err) {
          console.error("🔥 Error sending message:", err);
        }
      
        console.log(senderEmail + " : " + messageOut);
        setMessageOut('');
      };


    const handleMessageOut = (e) =>{
        e.preventDefault();
        if (messageOut ==='')
        {
            console.log('empty message, not sent');
        }
        else
        {
            let time = new Date();
            let formattedTime = time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            });

            let message = {
                sender: senderEmail,
                text: messageOut,
                time: new Date(),
                now: formattedTime,
            };
            sendMessage(message);
        }
    }














    return(
        <div className="fixed bottom-0 left-0 w-screen h-24 px-4 bg-slate-100">

            <form onSubmit={handleMessageOut} className="bg-white flex flex-row mx-auto mt-4 px-1 py-2 w-full rounded-full shadow-md">
                <input type="text" placeholder="Message" value={messageOut} onChange={(e) => setMessageOut(e.target.value)} className="w-5/6 py-1 px-4 rounded-full bg-white text-slate-800"/>

                <div className="w-1/6" onClick={handleMessageOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 fill-purple-700 pt-1 mx-auto"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                </div>
            </form> 
        </div>
    );
} 
export default SendMessage;
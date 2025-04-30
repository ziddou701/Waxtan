import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {addDoc , setDoc , getDoc , getDocs , doc , collection} from "@firebase/firestore";
import { firestore } from "../Firebase";

const Home = () => {

    const cookies = new Cookies();
    const Navigate = useNavigate();
    const logCookie = cookies.get("auth-token");
    const [refresh , setRefresh] = useState(false);
    const [users , setUsers] = useState([]);
    const senderEmail = cookies.get('sender-email');

// Verifying User login state

    useEffect( () => {

        if(!logCookie){
            Navigate('/');
          }else{
            Navigate('/Home');
          }
    } , [refresh] );

    const delCookies = () => {
        const confirmSignOut = window.confirm("Do you want to sign out?");
        if (confirmSignOut)
        {
            cookies.set("auth-token" , '');
            setRefresh(true);
        } else {
            console.log("❌ Sign out canceled");
        }
    };

// Create and Handle New Chat
    const [creatNewChat , setCreatNewChat] = useState(false);

    const creatNewChatState = async() =>{
        setCreatNewChat(!creatNewChat);
        fetchUserList();
    }

    const handleCreateNewChat = (receiverEmail) =>{
        cookies.set('receiver-email' , receiverEmail);
        Navigate('/Live');
    };

    // Fetching user list
    const fetchUserList = async (err) => {
        try
        {
            const docSnap = await getDocs(collection(firestore, 'Users'));
            const user = docSnap.docs.map((doc) => {
                const data = doc.data();
                return {
                  name: data.displayName,
                  email: data.email,
                  pictureUrl: data.picture?.trim() === ""
                  ? "https://cdn-icons-png.freepik.com/512/7855/7855833.png"
                  : data.picture
                  // checking to see if the user has a picture or not
                }});

            console.log(user);
            setUsers(user);
        }
        catch
        {
            console.log(err);
        }
    };

    const topOfHomePage = useRef(null); // scroll last message into view
      useEffect(() => {
        topOfHomePage.current?.scrollIntoView({ behavior: 'smooth' });
      }, []);


    return (
        <div className="w-full fixed ">
            <div ref={topOfHomePage} className="h-1" />

        <div className="w-full lg:w-1/3 lg:shadow-lg h-screen relative bg-white">
            <div className=" w-full px-5 py-5 mt-3 flex flex-row">
                <h1 className=" w-fit px-3 text-xl font-black text-slate-50 rounded-3xl bg-gradient-to-r from-pink-400 to-purple-600 "> Waxtan </h1>

                {/* Creat new chat button */}

                <div className=" ml-auto mr-5 w-6" onClick={creatNewChatState} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/></svg>
                </div>

                {/* Settings/Sign out Button */}

                <div className="w-7 mr-1 " onClick={delCookies}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
                </div>
            </div>

            {/* hidden contact list 
            will use data.map to map all chats and use useRef to get the senderEmail and set it as a cookie that will be use to send messages*/}

            { creatNewChat &&
            <div className="w-full h-screen overflow-y-scroll overflow-x-hidden bg-slate-100 px-2 " >
            { users.map((user, index) => ( user.email !== senderEmail ? (
                <div className="flex flex-row border-solid border-b-2 border-slate-200 py-2" key={index} onClick={() => handleCreateNewChat(user.email)}>

                    {/* Profile picture */}
                    <div className="rounded-full w-12 h-12 bg-white ">
                        <img src={user.pictureUrl} alt="img" className="rounded-full"/>
                    </div>

                    <div className=" ml-5 my-auto ">
                        {/* User Name */}
                        <div className=" text-base text-slate-800 font-bold">
                            <span>{user.name}</span>
                        </div>
                    </div>

                    <h1 className=" w-fit h-fit px-3 py-1 text-sm font-black text-slate-50 rounded-full 
                    bg-gradient-to-r from-pink-400 to-purple-600 my-auto ml-auto mr-5" 
                        onClick={(e) => {
                            e.stopPropagation(); // to prevent bubbling if needed
                            handleCreateNewChat(user.email);
                        }}> 
                    New Chat 
                    </h1>

                </div>) : null))
            }

                <div className="h-16 w-full text-slate-400 text-sm font-light">
                    <p className="mx-auto w-fit my-5 border-b-2 border-slate-800">End</p>
                </div>

            </div>}

            <div>
                <div className=" py-5 w-3/4 mx-auto ">
                    <div type="text" className=" bg-slate-100 rounded-2xl w-full py-1 px-3 text-slate-700 font-normal h-9 ">
                        <h1 className=" w-fit text-2xl font-black mx-auto "> Chat </h1>
                    </div>
                </div>
            </div>

        

            {/* ------- body --------- */}

            <div className="pt-2 w-full mx-auto h-5/6 overflow-x-scroll">

                <Chat/>
            
                <div className="h-16 w-full text-slate-400 text-sm font-light">
                    <p className="mx-auto w-fit my-16 border-b-2 border-slate-700">End</p>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Home;
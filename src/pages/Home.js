import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {

    const cookies = new Cookies();
    const Navigate = useNavigate();
    const logCookie = cookies.get("auth-token");
    const [refresh , setRefresh] = useState(false);

    useEffect( () => {

        if(!logCookie){
            Navigate('/');
          }else{
            Navigate('/Home');
          }
    } , [refresh] );

    const delCookies = () => {
        cookies.set("auth-token" , '');
        setRefresh(true);
    };

// Create and Handle Creat New Chat
    const [creatNewChat , setCreatNewChat] = useState(false);

    const creatNewChatState = () =>{
        setCreatNewChat(!creatNewChat);
    }

    const handleCreatNewChat = () =>{


        Navigate('/Live');
    };


//Handle search bar focus statu
    const [searchBarInFocus , setSearchBarInFocus] = useState(false);

    const changeFocusState = () =>{
        setSearchBarInFocus(!searchBarInFocus);
    }

    // const handleCreatNewChat = () =>{


    //     Navigate('/Live');
    // };








    return (
        <div className="w-full max-h-screen fixed">
            <div className=" w-full px-5 py-5 mt-3 flex flex-row">
                <h1 className=" w-fit px-3 text-xl font-black text-slate-50 rounded-3xl bg-gradient-to-r from-pink-400 to-purple-600 "> Logo </h1>
                <h1 className=" w-fit px-3 text-2xl font-black "> Chat </h1>


{/* Creat new chat button */}
                <div className=" ml-auto mr-5 w-6" onClick={creatNewChatState}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/></svg>
                </div>
{/* Settings/Sign out Button */}
                <div className="w-1.5 mr-2 " onClick={delCookies}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg>
                </div>
            </div>

{/* hidden contact list */}
            {creatNewChat &&
            <div className="w-full h-screen overflow-y-scroll overflow-x-hidden bg-slate-100 px-2 ">

                <div className="flex flex-row border-solid border-b-2 border-slate-200 py-2" onClick={handleCreatNewChat}>

                    {/* Profile picture */}
                    <div className="rounded-full w-14 h-14 bg-white ">
                        <img src="/" alt="img" className=""/>
                    </div>

                    <div className=" ml-5 my-auto ">
                        {/* User Name */}
                        <div className=" text-lg text-slate-800 font-bold">
                            User Name
                        </div>
                    </div>

                    <h1 className=" w-fit h-fit px-3 py-1 text-md font-black text-slate-50 rounded-full 
                    bg-gradient-to-r from-pink-400 to-purple-600 my-auto ml-auto mr-5" onClick={handleCreatNewChat}> 
                    New Chat 
                    </h1>

                </div>

            </div>
            }


{/* Chat search bar */}
            <div>
                <div className=" py-5 shadow-sm w-fit mx-auto">
                    <form>
                    {/* search button */}
                    <div className="flex flex-row w-full rounded-2xl bg-slate-100 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 mx-3"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg>
                        {/* Search input */}
                        <input type="text" placeholder="Search" className=" bg-slate-100 rounded-2xl w-full py-1 px-3 text-md text-slate-700 font-normal "
                        onFocus={changeFocusState} onBlur={changeFocusState}/>
                    </div>
                    </form>
                </div>

{/* hidden search results */}
                {searchBarInFocus && 
                <div className="w-full h-screen overflow-y-scroll overflow-x-hidden bg-slate-100 p-2 ">

                    <div className="grid grid-cols-5 my-2 mx-2 p-2 border-b-2">

                        {/* Profile picture */}
                        <div className="rounded-full w-16 h-16 bg-white ">
                            <img src="/" alt="img" className=""/>
                        </div>

                        <div className="col-span-4 mr-2 ">
                            {/* User Name */}
                            <div className=" text-md text-slate-800 font-bold">
                                User Name
                            </div>
                            {/* Body */}
                            <div className=" h-10 overflow-hidden text-sm text-slate-600">
                                Hey there budy, this is a sample text message to see if you can see what I am sending you.
                                Let me know if you got it.
                            </div>
                        </div>

                    </div>
                </div>
                }

            </div>
           

{/* ------- body --------- */}

            <div className=" fixed pt-2 w-full h-5/6 overflow-x-scroll">
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
            </div>

        </div>
    );
}
export default Home;
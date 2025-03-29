

const Chat = () => {
    return(
        <div className="grid grid-cols-5 bg-slate-200 shadow-md rounded-2xl my-3 mx-1 p-2">

            {/* Profile picture */}
            <div className="rounded-full w-16 h-16 bg-slate-100 ">
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
    );
}
export default Chat;
const LiveChat = () => {
    return(
        <div>
            {/* top bar */}
            <div className="w-full pb-2 pt-7 flex flex-row shadow-lg">
                {/* Back button */}
                <div className="w-5 py-3 mx-5">
                    <svg xmlns="http://www.w3.org/2000/svg " viewBox="0 0 384 512" className="fill-purple-700"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </div>
                {/* Profile pic */}
                <div className="rounded-full bg-slate-100 w-12 h-12">
                    <img src="" alt="Img" />
                </div>
                {/* User Name */}
                <div className=" mx-3 py-3 text-md text-slate-800 font-bold">
                    User Name
                </div>
                
                
                {/* ---- body ---- */}
                <div className="fixed top-24 bg-red-300 w-full h-4/5 overflow-x-scroll">
                    
                </div>

                {/* Send message */}
                <div>

                </div>

            </div>
        </div>
    );
}
export default LiveChat;
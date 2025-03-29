
const creatAccount = () => {
    return(
        <div className="rounded-3xl border-2 mx-auto p-3 w-5/6 relative top-16 drop-shadow-sm shadow-lg shadow-indigo-500/30 bg-slate-50/5 z-10">

            {/* Sign up form */}
            <form>
                <h2 className="font-bold text-lg my-1 mx-2 w-fit"> Sign Up </h2>

                <div  className=" w-full mx-auto" >
                    <br/>
                    <label htmlFor="userName" className=" font-thin text-sm ml-2 ">User Name</label><br/>
                    <input type="text" name="userName" className=" text-slate-700 w-full mx-auto my-1 px-3 py-1 rounded-xl bg-slate-50 ">
                    </input><br/>

                    <label htmlFor="email" className=" font-thin text-sm ml-2 ">Email</label><br/>
                    <input type="email" name="email" className=" text-slate-700 w-full mx-auto my-1 px-3 py-1 rounded-xl bg-slate-50 ">
                    </input><br/>

                    <label htmlFor="pwd" className=" font-thin text-sm ml-2 ">Password</label><br/>
                    <input type="password" name="pwd" className=" text-slate-700 w-full mx-auto my-1 px-3 py-1 rounded-xl bg-slate-50 " >
                    </input><br/>

                    <div className="w-1/2 mx-auto rounded-3xl py-1 mb-5 bg-gradient-to-r from-purple-600 to-pink-400 mt-6">
                        <button className="w-full text-slate-50 font-medium"> Create Account </button>
                    </div>
                </div>
            </form>

        </div>
    );
}
export default creatAccount;
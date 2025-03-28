import Navbar from "./components/Navbar";
import Signinform from "./components/Signinform";


const LandingPage = () => {
    return (
    
    <div>
        {/* Background svg gradiant  */}
        <div className="w-screen h-screen bg-gradient-to-t from-gray-300 to-slate-50 fixed z-0">
            <div className="absolute bottom-0 left-0 w-screen">
                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 690" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
                <defs><linearGradient id="gradient" x1="87%" y1="17%" x2="13%" y2="83%"><stop offset="5%" stopColor="#9900ef"></stop><stop offset="95%" stopColor="#0693e3"></stop></linearGradient></defs><path d="M 0,700 L 0,175 C 112.86124401913872,158.7511961722488 225.72248803827745,142.50239234449762 312,129 C 398.27751196172255,115.49760765550238 457.97129186602876,104.74162679425834 537,129 C 616.0287081339712,153.25837320574166 714.3923444976077,212.53110047846891 828,226 C 941.6076555023923,239.46889952153109 1070.4593301435407,207.13397129186603 1175,191 C 1279.5406698564593,174.86602870813397 1359.7703349282297,174.93301435406698 1440,175 L 1440,700 L 0,700 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="87%" y1="17%" x2="13%" y2="83%"><stop offset="5%" stopColor="#9900ef"></stop><stop offset="95%" stopColor="#0693e3"></stop></linearGradient></defs><path d="M 0,700 L 0,408 C 89.72248803827753,383.7607655502392 179.44497607655506,359.52153110047846 279,372 C 378.55502392344494,384.47846889952154 487.9425837320574,433.6746411483254 594,446 C 700.0574162679426,458.3253588516746 802.7846889952152,433.77990430622003 893,442 C 983.2153110047848,450.22009569377997 1060.9186602870814,491.2057416267943 1150,491 C 1239.0813397129186,490.7942583732057 1339.5406698564593,449.39712918660285 1440,408 L 1440,700 L 0,700 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
            </div>
        </div>

        {/* Landing page's body */}
        <div className="z-10 absolute top-0 left-0 w-screen ">

            {/* Navigation bar at top of screen */}
            <Navbar/>

            {/*Sign in form*/}
            <Signinform/>

        </div>

    </div>
    

    );
}
export default LandingPage;
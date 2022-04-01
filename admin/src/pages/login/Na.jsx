import { persistor } from "../../redux/store";

const Na = () => {

    const handleClick = () => {
        persistor.purge()
        window.location.reload(false)
    };

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"white", color:"black", width:"100vw", height:"100vh"}}>
            <h1 style={{color:"teal", marginTop:"30vh", fontSize:"70px", fontWeight:"normal"}}>You Don't Have The Admin Privilege</h1>
            <h2 style={{fontSize:"40px", fontWeight:"normal"}}>Please Try Again With Another Account</h2>
            <button onClick={handleClick} style={{backgroundColor:"transparent", border:"3px solid teal", outline:"none", color:"teal", fontWeight:"600", cursor:"pointer", fontSize:"25px", padding:"15px", width:"10vw", marginTop:"2vh"}}>Logout</button>
        </div>
    );

};

export default Na;

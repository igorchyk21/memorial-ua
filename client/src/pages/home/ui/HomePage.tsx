"use client"

import { useAuth } from "@/shared/context/Auth";

const HomePage = () => {
    const { auth, setShowOffAuth, logout } = useAuth();
    return (<>
        <h2>Home Page pages/home</h2>
        User: [{auth?.user.userName}]
        <div>
            <button onClick={()=>setShowOffAuth('login')}>Login</button>
            <button onClick={()=>logout()}>Logout</button>
        </div>
        
    </>)
}

export default HomePage;
"use client"
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import UserAvatar from "./UserAvatar";

interface Props {
    picture:string|null|undefined;
    name:string;
    email?:string;
    description:string;
}
const UserAvatarFull = ({picture,name,email,description}:Props) => {
    const [ srcError, setSrcError ] = useState(!Boolean(picture));
    
    return  (
        <div className="d-flex align-items-top " style={{flex:1, minWidth:0}}>
        <div title={email}
            onClick={()=>{
                navigator.clipboard.writeText(String(email ?? ""));                    
            }}
            className="position-relative d-flex align-items-center justify-content-center flex-shrink-0 bg-body-secondary rounded-circle overflow-hidden"
            style={{ width: 40, height: 40 }}>
            <UserAvatar 
                picture={picture}
                name={name}/>
        </div>
        <div className="ps-2 ms-1 text-truncate">
            <div className="fs-sm fw-semibold text-dark-emphasis text-truncate">{name}</div>
            <div className="fs-xs text-body-secondary text-truncate">{description}</div>
        </div>
        </div>)
}

export default UserAvatarFull;
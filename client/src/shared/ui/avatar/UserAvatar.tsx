"use client"
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

interface Props {
    picture:string|null|undefined;
    name:string;
}
const UserAvatar = ({picture,name}:Props) => {
    const [ srcError, setSrcError ] = useState(!Boolean(picture));
    
    return (
        <div className="btn btn-icon fs-lg border-0 rounded-circle animate-shake overflow-hidden">
            {picture &&
                (<Image 
                    sizes="80px"
                    className={srcError ? 'd-none' : 'object-fit-cover'}
                    onLoad={()=>setSrcError(false)}
                    onError={()=>setSrcError(true)} 
                    src={picture}/>)}
            
            <span
                className={!srcError ? 'd-none' : ''}
                style={{paddingTop:0, fontWeight:900}}>{name?.[0] || '-'}</span>
        </div>)
}

export default UserAvatar;
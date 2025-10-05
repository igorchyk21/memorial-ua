import Link from "next/link";

interface Props {
    title?:string;
    linkTitle?:string;
    linkHref?:string;
}
 
const TitleBlock = ({title, linkTitle, linkHref}:Props) => {
    return (
        <div className="d-flex align-items-center justify-content-between border-bottom py-2 py-md-3 my-4">
            {title &&
            (<>
                <h2 className="h3 mb-0">{title}</h2>
                <div className="ms-3 nav">
                    {linkTitle && linkHref &&
                    (<Link className="animate-underline px-0 py-2 nav-link" 
                        href={linkHref}>
                        <span className="animate-target">{linkTitle}</span><i className="ci-chevron-right fs-base ms-1"></i>
                    </Link>)}
                </div>
            </>)}
        </div>)
}

export default TitleBlock;
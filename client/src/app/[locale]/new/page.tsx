import { NewHeroPage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
const Page = async ({params}:{params:any}) => {
    return (
        <main className={_cnMain}> 
            <NewHeroPage/>
        </main>)   
} 

export default Page;
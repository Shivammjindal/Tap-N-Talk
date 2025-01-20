import Sidebar from "./components/sidebar/Sidebar"
import { getAllUsers } from "../actions/getUsers"
import { UserList } from "./components/userList/userList";

export default async function userLayout({
    children
}:{
    children:React.ReactNode
}){

    const data = await getAllUsers();
    let users = []
    if(data){
        users = data.users
    }

    return (
        <Sidebar>
            <div className="h-full">
                <UserList items={users}/>
                {children}
            </div>
        </Sidebar>
    )
}

//never give someting like min-h-screen or i want to say never use min it will obstruct your development.
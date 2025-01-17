import SideBar from "../SideBar/SideBar";
import Tasks from "../Tasks/Tasks";
import UserInput from "../UserInput/UserInput";

export default function Home() {
  return (
    <div className="app-container">
      <SideBar />
      <div className="main-content">
        <h1>To Do List</h1>
        <UserInput />
        <div className="tasks">
          <Tasks />
        </div>
      </div>
    </div>
  );
}

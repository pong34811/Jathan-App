import React from 'react'
import ListDetail from "./ListDetail";
import SidebarList from "./SidebarList";
function ListPages() {
  return (
    <div className="row flex-nowrap bg-light">
            {/* Sidebar */}
            <div className="col  bg-dark sidebar">
                <SidebarList />
            </div>

            {/* Main Content */}
            <div className="col-10 bg-light" style={{backgroundColor: "gray-100"}}>
                <ListDetail className="bg-light" />
            </div>
        </div>
  )
}

export default ListPages
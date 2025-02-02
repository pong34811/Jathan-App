import React from 'react'
import ListView from "./ListDetail";
import SidebarList from "./SidebarList";
function ListPages() {
  return (
    <div className="row flex-nowrap">
            {/* Sidebar */}
            <div className="col-md-3 col-xl-2 d-md-block bg-dark sidebar">
                <SidebarList />
            </div>

            {/* Main Content */}
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <ListView />
            </div>
        </div>
  )
}

export default ListPages
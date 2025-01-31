import React from 'react'
import { Link } from 'react-router-dom'
import { FaBootstrap } from "react-icons/fa";

function ListPage() {
    return (
        <div className='container-fluid'>
            <div className='row'>
                {/* Sidebar */}
                <div className="col-md-3 col-lg-2 flex-shrink-0 p-3 bg-light shadow-sm" style={{ height: '100vh' }}>
                    <Link to="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                        <FaBootstrap className='bi me-2' size={30} />
                        <span className="fs-5 fw-semibold">Collapsible</span>
                    </Link>
                    <ul className="list-unstyled ps-0">
                        {/* Home Section */}
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed w-100 text-start" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                Home
                            </button>
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Overview</Link></li>
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Updates</Link></li>
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Reports</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Dashboard Section */}
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed w-100 text-start" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                Dashboard
                            </button>
                            <div className="collapse" id="dashboard-collapse">
                                {/* Empty for now */}
                            </div>
                        </li>

                        {/* Orders Section */}
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed w-100 text-start" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                Orders
                            </button>
                            <div className="collapse" id="orders-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">New</Link></li>
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Processed</Link></li>
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Shipped</Link></li>
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Returned</Link></li>
                                </ul>
                            </div>
                        </li>

                        <li className="border-top my-3"></li>

                        {/* Account Section */}
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed w-100 text-start" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                                Account
                            </button>
                            <div className="collapse" id="account-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">New...</Link></li>
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Profile</Link></li>
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Settings</Link></li>
                                    <li><Link to="#" className="link-dark rounded py-1 d-block">Sign out</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
                    <h2>ListPage</h2>
                    <p>เนื้อหาหลักของหน้า ListPage จะอยู่ที่นี่</p>
                </main>
            </div>
        </div>
    )
}

export default ListPage;

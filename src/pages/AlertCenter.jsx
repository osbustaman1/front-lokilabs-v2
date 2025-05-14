export const AlertCenter = () => {
    return (
        <>
            <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
                        <a aria-expanded="false" aria-haspopup="true" className="btn btn-icon btn-transparent-dark dropdown-toggle"
                            data-bs-toggle="dropdown" href="#" id="navbarDropdownAlerts" role="button">
                            <i className="fa-solid fa-bell"></i>
                        </a>
                        <div aria-labelledby="navbarDropdownAlerts"
                            className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up">
                            <h6 className="dropdown-header dropdown-notifications-header">
                                <i className="me-2" data-feather="bell">
                                </i>
                                Alerts Center
                            </h6>

                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-warning">
                                    <i data-feather="activity">
                                    </i>
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">
                                        December 29, 2021
                                    </div>
                                    <div className="dropdown-notifications-item-content-text">
                                        This is an alert message. It's nothing serious, but it requires your attention.
                                    </div>
                                </div>
                            </a>

                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-info">
                                    <i data-feather="bar-chart">
                                    </i>
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">
                                        December 22, 2021
                                    </div>
                                    <div className="dropdown-notifications-item-content-text">
                                        A new monthly report is ready. Click here to view!
                                    </div>
                                </div>
                            </a>

                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-danger">
                                    <i className="fas fa-exclamation-triangle">
                                    </i>
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">
                                        December 8, 2021
                                    </div>
                                    <div className="dropdown-notifications-item-content-text">
                                        Critical system failure, systems shutting down.
                                    </div>
                                </div>
                            </a>

                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-success">
                                    <i data-feather="user-plus">
                                    </i>
                                </div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">
                                        December 2, 2021
                                    </div>
                                    <div className="dropdown-notifications-item-content-text">
                                        New user request. Woody has requested access to the organization.
                                    </div>
                                </div>
                            </a>
                            <a className="dropdown-item dropdown-notifications-footer" href="#!">
                                View All Alerts
                            </a>
                        </div>
                    </li>
        
        </>
    )
}

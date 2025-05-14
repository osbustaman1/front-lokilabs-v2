import React from 'react'

export const Backup = () => {
  return (
    <>
                        <li className="nav-item dropdown no-caret d-none d-md-block me-3">
                        
                        <div aria-labelledby="navbarDropdownDocs"
                            className="dropdown-menu dropdown-menu-end py-0 me-sm-n15 me-lg-0 o-hidden animated--fade-in-up">
                            <a className="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro" target="_blank">
                                <div className="icon-stack bg-primary-soft text-primary me-4">
                                    <i data-feather="book">
                                    </i>
                                </div>
                                <div>
                                    <div className="small text-gray-500">
                                        Documentation
                                    </div>
                                    Usage instructions and reference
                                </div>
                            </a>
                            <div className="dropdown-divider m-0">
                            </div>
                            <a className="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro/components"
                                target="_blank">
                                <div className="icon-stack bg-primary-soft text-primary me-4">
                                    <i data-feather="code">
                                    </i>
                                </div>
                                <div>
                                    <div className="small text-gray-500">
                                        Components
                                    </div>
                                    Code snippets and reference
                                </div>
                            </a>
                            <div className="dropdown-divider m-0">
                            </div>
                            <a className="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro/changelog"
                                target="_blank">
                                <div className="icon-stack bg-primary-soft text-primary me-4">
                                    <i data-feather="file-text">
                                    </i>
                                </div>
                                <div>
                                    <div className="small text-gray-500">
                                        Changelog
                                    </div>
                                    Updates and changes
                                </div>
                            </a>
                        </div>
                    </li>
        
                    <li className="nav-item dropdown no-caret me-3 d-lg-none">
                        <a aria-expanded="false" aria-haspopup="true" className="btn btn-icon btn-transparent-dark dropdown-toggle"
                            data-bs-toggle="dropdown" href="#" id="searchDropdown" role="button">
                            <i data-feather="search">
                            </i>
                        </a>

                        <div aria-labelledby="searchDropdown"
                            className="dropdown-menu dropdown-menu-end p-3 shadow animated--fade-in-up">
                            <form className="form-inline me-auto w-100">
                                <div className="input-group input-group-joined input-group-solid">
                                    <input aria-describedby="basic-addon2" aria-label="Search" className="form-control pe-0"
                                        placeholder="Search for..." type="text" />
                                    <div className="input-group-text">
                                        <i data-feather="search">
                                        </i>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
    </>
  )
}

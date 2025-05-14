import React from 'react'

export const ProfilePersonalData = () => {
    return (
        <>
            <div aria-labelledby="wizard1-tab" className="tab-pane py-5 py-xl-10 fade show active" id="wizard1" role="tabpanel">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8">
                        <h5 className="card-title mb-4">Actualiza tu información</h5>
                        <form>
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="username">
                                    Username (how your name will appear to other users on the site)
                                </label>
                                <input className="form-control" id="username" placeholder="Enter your username" type="text" value='' onChange='' />
                            </div>
                            <div className="row gx-3">
                                <div className="mb-3 col-md-6">
                                    <label className="small mb-1" htmlFor="firstName">
                                        First name
                                    </label>
                                    <input className="form-control" id="firstName" placeholder="Enter your first name" type="text" value='' onChange='' />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="small mb-1" htmlFor="lastName">
                                        Last name
                                    </label>
                                    <input className="form-control" id="lastName" placeholder="Enter your last name" type="text" value='' onChange='' />
                                </div>
                            </div>
                            <div className="row gx-3">
                                <div className="mb-3 col-md-6">
                                    <label className="small mb-1" htmlFor="orgName">
                                        Organization name
                                    </label>
                                    <input className="form-control" id="orgName" placeholder="Enter your organization name" type="text" value='' onChange='' />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="small mb-1" htmlFor="location">
                                        Location
                                    </label>
                                    <input className="form-control" id="location" type="text" value='' onChange='' />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="email">
                                    Email address
                                </label>
                                <input className="form-control" id="email" placeholder="Enter your email address" type="email" value='' onChange='' />
                            </div>
                            <div className="row gx-3">
                                <div className="col-md-6 mb-md-0">
                                    <label className="small mb-1" htmlFor="phone">
                                        Phone number
                                    </label>
                                    <input className="form-control" id="phone" placeholder="Enter your phone number" type="tel" value='' onChange='' />
                                </div>
                                <div className="col-md-6 mb-0">
                                    <label className="small mb-1" htmlFor="birthday">
                                        Birthday
                                    </label>
                                    <input className="form-control" id="birthday" name="birthday" placeholder="Enter your birthday" type="text" value='' onChange='' />
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" type="button">
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

const BreadCrumb = ({title}) => {
    return (
        <>
            <div className="page-header">
                <div className="container-fluid jumbotron text-center">
                    <h1 className="page-title mb-0 py-5 ">{title}</h1>
                </div>
            </div>
        </>
    );
}

export default BreadCrumb;
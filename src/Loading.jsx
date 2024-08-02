import "./Loading.css";
const Loading = () => {
    return (
        <div className="loading">
            <div className="skeleton-loading">
                <div className="search-bar">
                    <input type="text" placeholder="" />
                    <div className="img"></div>
                </div>
                <div className="body"></div>
                <div className="footer1"></div>
                <div className="footer2"></div>
                <div className="footer3"></div>
            </div>
        </div>
    )
}
export default Loading;
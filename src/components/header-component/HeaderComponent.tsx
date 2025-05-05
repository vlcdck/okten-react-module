import './HeaderComponent.css'

export const HeaderComponent = () => {


    return (
        <div className="header">
            <h1 className={"header-logo"}>The Movie App</h1>
            <form className={"search-form"}>
                <input className={"search-input"} type="text" placeholder="Search"/>
                <button className={"search-button"} type="submit">
                    <img className={"search-img"} src="src/assets/icons/search_ico.png" alt="search"/>
                </button>
            </form>
        </div>
    );
};
import { Link } from "react-router-dom"

export const SmallButtons = ({config_buttons}) => {

    return (
        <>
            {config_buttons.map((button, index) => (
                button.url === '#' ? (
                    <button
                        key={`F9stCttL_${index}`}
                        className={`btn ${button.class} btn-sm`}
                        style={{ cursor: "pointer" }}
                        onClick={button.def}
                    >
                        <span className={button.icon}></span>
                    </button>
                ) : (
                    <Link
                        key={`F9stCttL_${index}`}
                        to={button.url}
                        className={`btn ${button.class} btn-sm`}
                        style={{ cursor: "pointer" }}
                        onClick={button.def}
                    >
                        <span className={button.icon}></span>
                    </Link>
                )
            ))}
        </>
    )
}


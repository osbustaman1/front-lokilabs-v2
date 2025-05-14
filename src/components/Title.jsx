export const Title = ({ title }) => {
    const titulo = title;
    return (
        <>
            <span className="color-text" dangerouslySetInnerHTML={{ __html: title }} />
        </>
    )
}
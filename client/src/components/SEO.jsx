import { Helmet } from "react-helmet-async";

const SEO = ({description, keywords, author, title}) => {
    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
        </>
    );
}

export default SEO;
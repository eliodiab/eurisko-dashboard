import "./Article.scss";

const Article = (props) => {

    const { article, lastArticleElementRef} = props;

    let options = { year:"numeric", month: "long", day: 'numeric'};

    return(
        <article ref={lastArticleElementRef}>
            <a href={article.web_url} rel="noopener noreferrer" target="_blank">
                <div className="articleContent">
                    <div>
                        {article.headline.main}
                    </div>
                    <div>
                        {article.abstract}
                    </div>
                    <div className="timeAndAuthor">
                        {article.byline.person.length > 0 ? <div>{`By ${article.byline.person[0].firstname} ${article.byline.person[0].lastname}`}</div> : <div></div>}
                        <div>{new Date(article.pub_date).toLocaleDateString("en-US", options)}</div>
                    </div>
                </div>
                <div className="imageContainerWidth">
                    <div className="imageContainer">
                        {article.multimedia.length > 0 ? <div className="image" style={{backgroundImage:`url(https://static01.nyt.com/${article.multimedia[0].url})`}}>
                        </div> : <div className="image"></div>}
                    </div>
                </div>
            </a>
        </article>
    );
}

export default Article;
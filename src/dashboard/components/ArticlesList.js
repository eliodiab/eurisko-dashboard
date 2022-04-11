import "./ArticlesList.scss";
import Article from "./Article";

const ArticlesList = (props) => {

    const {inputValue, articles, filteredArticles, lastArticleElementRef} = props;

    return(
        <main className="articlesContainer">
            {(inputValue === "" ) ? articles.map((article, index) => {
                if(articles.length === index + 1){
                    return (
                        <Article article={article} key={index} lastArticleElementRef={lastArticleElementRef} />
                    )
                }
                return(
                    //used index as key because the api return duplicate article id (which is a bug?)
                    <Article article={article} key={index}/>
                )
            })
                :
                filteredArticles.map((article, index) => {
                    return(
                        <Article article={article} key={index}/>
                    )
                })
            }
            
    </main>
    )
}

export default ArticlesList;
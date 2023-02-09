import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'

const News = (props) =>{

     const [articles,setArticles] = useState([]);
     const [loading,setLoading] = useState(true);
     const [page,setPage] = useState(1);
     const [totalResults,setResults] = useState(0);
     const [progress,setProgress] = useState(0);
     
     
     const update= async ()=> {
         // console.log("djlajdj");
         setProgress(30)
         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b1a1215e82344e14bb4e79d558630f03&page=${page}&pageSize=${props.pageSize}`;
         let data = await (await fetch(url)).json();
         setProgress(70)
        setLoading(false)
        // console.log(url);
        setArticles( data.articles);
        setProgress(90)
        setResults(data.totalResults)
        setProgress(100)
        // console.log(this.state.page);
    }
    
    useEffect(()=>{
         document.title = `${props.category} - Global News`
       update();
       // eslint-disable-next-line
    },[]);

   const fetchMoreData = async () => {
       setLoading(false)
       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b1a1215e82344e14bb4e79d558630f03&page=${page+1}&pageSize=${props.pageSize}`;
       setPage(page+1)
        let data = await (await fetch(url)).json();
        // console.log(url);
        setArticles(articles.concat(data.articles));
    };

        return (
            <>
                <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onloadingFinished={() => setLoading(100)}
                />
                <h1 className='text-center' style={{marginTop: "71px"}}>GlobalNews - Top Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loading={<Spinner />}
                >
                    <div className='container my-3'>
                        <div className="row">
                            {articles.map((element, index) => {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title ? element.title.substring(0, 45) + "...." : ""} description={element.description ? (element.description).substring(0, 87) + "...." : ""} imageUrl={element.urlToImage ? (element.urlToImage) : "https://www.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}



export default News


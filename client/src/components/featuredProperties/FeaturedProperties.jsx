import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import "./featured.css";
import Pagination from "../pagination/pagination.js"

const FeaturedProperties = () => {
  const { data,loading,currentPage,postPerPage,setCurrentPage,error } = useFetch("http://localhost:8800/api/hotels/?featured=true");
  
  const paginate = (PageNumber) => setCurrentPage(PageNumber)

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  
  const currenPosts = data.slice(indexOfFirstPost, indexOfLastPost)
  console.log( data.length,"len",currentPage,currenPosts,indexOfFirstPost, indexOfLastPost)

  


  return (
          <div className="inline-flex" >
    
            {/* {Array.from({ length: 4 }).map((_, idx) => ( */}
            <div>
              <div border="secondary " className="container">
                  <div className="fp row "> {loading ? ("Loading") : ( <> {currenPosts.map((item) => (
                      <div className="col-5">
                               <h1 color='dark'>{item.type}</h1>
                            <div className="fpItem " key={item._id}>
                               
                                  <div className=" ">
                                      <div className="featuredItem P-1">
                                            <a className="imaglink"href ="#">
                                              <img  src={item.photos[0]} alt=""className="featuredImg"/>
                                            <h1 className="featuredTitles">{item.name}</h1>

                                            </a>
                                      </div> 
                                      
                                  </div>
                                  <div className="info">
                                        <p className="fpCity">{item.city}</p>
                                        <p className="fpPrice">Starting from ${item.cheapestPrice}</p>
                                        {item.rating && <div className="fpRating">
                                                            <button>{item.rating}</button>
                                                              <span>Excellent</span>
                                                        </div>}
                                    </div>
                             </div>
                         </div>
                  
                         ))}
                         </>
                       )}
                    </div>
                </div>  
            
           
            </div>
            
    
            <div>
            <Pagination postsPerPage={postPerPage} totalPosts= {data.length} paginate = {paginate}/> 
            </div> 
        
    </div>

  );
};

export default FeaturedProperties;

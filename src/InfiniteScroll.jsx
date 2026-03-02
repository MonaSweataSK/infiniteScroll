import { useEffect, useState, useRef } from "react"

export default function InfiniteScroll() {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ pageCount, setPageCount ] = useState(1);
    const sentinalDivRef = useRef(null);
    
    const fetchData = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageCount}&_limit=10`).
        then(res => res.json()).
        then(res => setData([...data, ...res]));
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [pageCount]);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPageCount(prev => prev + 1);
      }
    });

    if (sentinalDivRef.current) {
      observer.observe(sentinalDivRef.current);
    }

    return () => observer.disconnect();
    }, [loading])

    return (
        <div className="data">
            {data.length > 0 && data.map((item) => {
                return (
                    <div className="item-container" key={item.id}>
                      <div><b>{item.title}</b></div>
                      <div>{item.body}</div>
                    </div>
                )
            })}
            {loading && <div>Loading...</div>}
            <div className="sentinal-container" style={{height: '100px'}} ref={sentinalDivRef}></div>

        </div>

        
    )
}
states
---  userData ( initial value: [] )
--- loading ( initial val: false )
--- pageCount ( initial val: 1 )
---sentinalDivRef ( initial : null )

const fetchData= () => {
    loading = true;
    fetch(''+ pageCount).then( setData);
    loadin = false;
}
useEffect(()=> {
    fetchData();
}, [pageCount]);

useEffect(() => {
    const observer = Intersection Observerr();
    sentinalDivRef.observe();
    if(intersecting) {
        pageCount ++;
    }
    return ()=> unobserve();

},[loading])

UI
items
if loading true, show 'Loading....'
sentinel  ---
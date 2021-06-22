export default function Archive(props){
    console.log(props, 'dataaaaaaaaaaaaaaaaaaaa')
    return(
        <>
        {
            props.data.map((item, index)=>{
                return (
                    <>
                        <div style={{display:'flex',justifyContent:'space-between',border:'1px solid'}}>
                            <p>{item.title}</p>
                            <p><button style={{backgroundColor:'green'}} onClick={()=>props.activeItem(index)}>Active</button></p>
                        </div>
                        
                    </>
                )
            })
        }
        </>
    )
}
import './style.css'
import NotFound404 from '../../assets/images/notfound.png'
import Header from '../header/Header'
export default function NotFound (){
    return(
        <>
            <Header/>
            <div className="not-found" style={{background:`url(${NotFound404}) no-repeat`,backgroundSize: 'cover', height: 'calc(100vh - 21px)'}}>
                {/* <img src={NotFound404} alt="" /> */}
            </div>
            
        </>
    )
}
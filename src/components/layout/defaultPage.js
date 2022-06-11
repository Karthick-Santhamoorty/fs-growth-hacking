export default function DefaultPage(props){
    return(
        <div className="main default_page">
            <main className="flex-grow px-6">{props.children}</main>
        </div>
    )
}
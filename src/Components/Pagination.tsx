import { useDispatch, useSelector } from "react-redux";
import { todo } from "../objectType/todo";
import paginateSlice, { paginatePage } from "../Redux/reducers/pagination";
import { RootState } from "../Redux/store";

function Pagination() {
  const dispatch = useDispatch()
  const totalPosts = useSelector((state: RootState)=>(state.todos.todos.length))
  const currentPage = useSelector((state: RootState)=>(state.paginate.pageNumber))
  const postsPerPage = 5
  
  let pageNumber = [];
  
  for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
    pageNumber.push(i)
  }
  return (
    <nav>
       <ul className='flex justify-center'>
         {pageNumber.map((number: number) =>(
           <li key={number} className="">
             <button className={`button-paginate 
             ${number == currentPage? `button-selected`:`` }`}
             onClick={()=>{
                dispatch(paginatePage(number))
              console.log('paginate clicked')
              }
             }>{number}</button>
           </li> 
         ))}
       </ul>      
    </nav>
  )
}

export default Pagination

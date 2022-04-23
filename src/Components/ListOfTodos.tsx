import { useDispatch} from 'react-redux';
import '../index.css';
import { reducerGetSingleFetch } from '../Redux/reducers/todoSingleReducer';
import modalSlice from '../Redux/reducers/modal';
import todosSlice, { typeDeleteTodo } from '../Redux/reducers/todosReducer';
import {FaSort} from 'react-icons/fa'

type todo = {
    id? : number
    username: string;
    description: string;
    targetDate: string;
  }

function ListOfTodos({currentPosts,}:
    {currentPosts: todo[],}
    ) {
    const dispatch = useDispatch();

    return (
        <div className='bg-white pb-4 px-4 rounded-full w-full'>
        <div className="overflow-x-auto mt-6">
          <div className="flexbox-container header-table">
            <div className='flexbox-item text w-1/5'>Username</div>
            <div className='flexbox-item text w-2/5'>Description</div>
            <div className='flexbox-item text w-1/5 justify-center'>Target Date <button
            onClick={()=>{
              console.log('is clicked')
              dispatch(todosSlice.actions.reducerSortTodo())}}
            ><FaSort/></button></div>
            <div className='flexbox-item text w-1/5 justify-center'>Actions</div>
          </div>
          <div>
           {currentPosts.map((post)=>{
                            return <div key={post.id} className="flexbox-container">
                                   <div className='flexbox-item box text flex-portion'>{post.username}</div>
                                   <div className='flexbox-item box text text-description truncate flex-portion-des'>{post.description}</div>
                                   <div className='flexbox-item box md:justify-center text text-date flex-portion'>{post.targetDate}</div>
                                   <div className='flexbox-item box md:justify-center flex-portion flex'>
                                      <button onClick={()=>{
                                        dispatch(reducerGetSingleFetch(post))
                                          dispatch(modalSlice.actions.showModal('UPDATE'))                                        
                                        }} className='button button--update button-text'>Update</button>
                                      <button className='button button--delete text-button'
                                      onClick={()=>
                                        dispatch(typeDeleteTodo(post))
                                      }
                                       ><p>Delete</p>
                                       </button>
                                 </div>
                               </div> 
           })}
          </div>         
        </div>
        </div>
    )
}

export default ListOfTodos
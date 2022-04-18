import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import '../index.css';
import { reducerGetSingleFetch } from '../Redux/reducers/todoSingleReducer';
import modalSlice from '../Redux/reducers/modal';
import { typeDeleteTodo } from '../Redux/reducers/todosReducer';

type todo = {
    id? : number
    username: string;
    description: string;
    targetDate: string;
  }

function ListOfTodos({currentPosts,}:
    {currentPosts: todo[],}
    ) {
    const isLoading = useSelector((state: RootState) => state.fetchSingle.isLoading);
    const dispatch = useDispatch();

    return (
        <div className='bg-white pb-4 px-4 rounded-full w-full'>
        <div className="overflow-x-auto mt-6">
          <div className="flexbox-container header-table">
            <div className='flexbox-item text w-1/6'>Username</div>
            <div className='flexbox-item text w-1/2'>Description</div>
            <div className='flexbox-item text w-1/6 justify-center'>Target Date</div>
            <div className='flexbox-item text w-1/6 justify-center'>Actions</div>
          </div>
          <div>
           {currentPosts.map((post)=>{
                            return <div key={post.id} className="flexbox-container border-b-2">
                                   <div className='flexbox-item box w-1/6 text'>{post.username}</div>
                                   <div className='flexbox-item box w-1/2 text text-description'>{post.description}</div>
                                   <div className='flexbox-item box w-1/6 justify-center text text-date'>{post.targetDate}</div>
                                   <div className='flexbox-item box w-1/6'>
                                      <button onClick={()=>{
                                        dispatch(reducerGetSingleFetch(post))
                                        if(!isLoading){
                                          dispatch(modalSlice.actions.showModal('UPDATE'))
                                        }                                        
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
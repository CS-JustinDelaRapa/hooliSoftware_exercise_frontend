import { useEffect} from 'react';
import './App.css';
import HeaderAdd from './Components/HeaderAdd';
import ListOfTodos from './Components/ListOfTodos';
import Pagination from './Components/Pagination';
import CreateAddModal from './Components/CreateEditModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './Redux/store';
import {typeGetAllFetch} from './Redux/reducers/todosReducer'

function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen)
  const currentPage = useSelector((state: RootState)=> state.paginate.pageNumber)
  const todosSaga = useSelector((state: RootState) => state.todos.todos)
  const isLoading = useSelector((state: RootState) => state.todos.isLoading)

  //for pagination
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = todosSaga.slice(indexOfFirstPost,indexOfLastPost);

  useEffect(()=>{
    dispatch(typeGetAllFetch());
  },[]);

  if(isLoading){
    return <div className='modal-container'>
    <h1 className='text'>Working on it...</h1>
    </div>
  }

  return (
    <>
    {isOpen &&(
      <CreateAddModal/>
    )}
      <div>
        <HeaderAdd/>
        <ListOfTodos currentPosts={currentPosts}/>        
        <Pagination/>
      </div>
    </>
  );
}

export default App;

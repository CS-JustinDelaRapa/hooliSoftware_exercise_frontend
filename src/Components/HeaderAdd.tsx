import { useDispatch, useSelector } from 'react-redux';
import modalSlice from '../Redux/reducers/modal';
import '../index.css'

function HeaderAdd() {
  const dispatch = useDispatch();

  return (
    <span className='header-container'>
    <h1 className='title'>ToDo.</h1>
    <button className='button button--add' onClick={()=>dispatch(modalSlice.actions.showModal('ADD'))}>Add</button>
    </span>
  )
}

export default HeaderAdd
import React, { ChangeEvent, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import modalSlice from '../Redux/reducers/modal';
import '../index.css'
import { RootState } from '../Redux/store';
import getSingleSlice from '../Redux/reducers/todoSingleReducer';
import {typeAddTodo, typeUpdateTodo } from '../Redux/reducers/todosReducer';


function CreateAddModal() {

  const todoSaga = useSelector((state: RootState) => state.fetchSingle.todo)
  const label = useSelector((state: RootState)=> state.modal.label)
  const dispatch = useDispatch();

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0,10);
  
  const [username, setUsername] = React.useState(label === 'ADD'? '': todoSaga.username)
  const [description, setDescription] = React.useState(label === 'ADD'? '' : todoSaga.description)
  const [targetDate, setTargetDate] = React.useState(label === 'ADD'? date : todoSaga.targetDate)

  const [validUserName, setValidUserName] = React.useState(true)
  const [validDescription, setValidDescription] = React.useState(true)
  const [onSubmit, setOnSubmit] = React.useState(false)


  const handleDispatch=()=>{
    label === 'ADD'? dispatch(typeAddTodo({
      username: username,
      description: description,
      targetDate: targetDate
    })):
    dispatch(typeUpdateTodo({
      id: todoSaga.id,
      username: username ?? todoSaga.username,
      description: description ?? todoSaga.description,
      targetDate: targetDate ?? todoSaga.targetDate
  }))
    dispatch(getSingleSlice.actions.reducerGetSingleReset({}))
    dispatch(modalSlice.actions.showModal(''))
}


  useEffect(()=>{
    console.log(username)
    console.log(description)

    if(onSubmit && validDescription && validUserName){
      console.log('ready to go')
      handleDispatch()
    }
    setOnSubmit(false)
  },[username, description, onSubmit, validDescription, validUserName])

  //custon hooks for validation
  const handleUpdate=()=>{
    (typeof username ==='undefined') && setUsername(todoSaga.username);
    (typeof description ==='undefined') && setDescription(todoSaga.description);

    validateFields()
  }

  const validateFields=()=>{
    //validateFields 
    username === ''? setValidUserName(false) :setValidUserName(true);
    description === ''? setValidDescription(false) :setValidDescription(true)
    setOnSubmit(true)
  }

  const updateUsername=(e: ChangeEvent<HTMLInputElement>)=>{
    setUsername(e.target.value)
  }
  const updateDescription=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setDescription(e.target.value)
  }
  const updateTargetDate=(e: ChangeEvent<HTMLInputElement>)=>{
    setTargetDate(e.target.value)
  }

    return (
      <div className='modal-container'>
      <div className='modal'>
        <span className='flex justify-between'>
            {label === 'UPDATE'? <h2 className='text'>Update Todo</h2>:<h2 className='text'>Add Todo</h2>}
          <button className='escape' onClick={()=>{
            dispatch(getSingleSlice.actions.reducerGetSingleReset({}))
            dispatch(modalSlice.actions.showModal(''))
          }}>x</button>

        </span>
          <input className={`input--text ${!validUserName && `onError`}`} type="text" placeholder='Username' defaultValue={todoSaga?.username} onChange={updateUsername}/>
          {!validUserName && <p className='onError-Text'>Username is required</p>}
          <textarea className={`input--text h-3/5 resize-none ${!validDescription && `onError`}`} placeholder='Description' defaultValue={todoSaga?.description} onChange={updateDescription}/>
          {!validDescription && <p className='onError-Text'>Description is required</p>}
        <span className='flex justify-between'>

          <input type="date" min={date} required name="targetDate" defaultValue={label === 'ADD'? date : todoSaga.targetDate} onChange={updateTargetDate}/>
          {label === 'UPDATE'?
                  //update button
                  <input type='submit' onClick={()=>
                    handleUpdate()
                  } value='Update' className='button button--update'/> :

                  //add button
                  <input type='submit' onClick={()=>
                   validateFields()
                  } value='Add' className='button button--add'/>
        }
        </span>
      </div>
    </div>
    )
}

export default CreateAddModal
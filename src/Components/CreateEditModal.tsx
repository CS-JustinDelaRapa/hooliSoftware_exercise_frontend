import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import modalSlice from '../Redux/reducers/modal';
import '../index.css'
import { RootState } from '../Redux/store';
import getSingleSlice from '../Redux/reducers/todoSingleReducer';
import {typeAddTodo, typeUpdateTodo } from '../Redux/reducers/todosReducer';
import {FieldValue, FieldValues, SubmitHandler, useForm} from 'react-hook-form'

function CreateAddModal() {

  const {register, handleSubmit, formState: { errors }} = useForm();
  const onSubmit: SubmitHandler<FieldValues> = data => {
    if(data.usernameId !== '' && data.descriptionId !== ''){
      handleDispatch()
    }
  };

  const todoSaga = useSelector((state: RootState) => state.fetchSingle.todo)
  const isLoading = useSelector((state: RootState) => state.fetchSingle.isLoading)
  const label = useSelector((state: RootState)=> state.modal.label)
  const dispatch = useDispatch();  

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0,10);
  
  const [username, setUsername] = React.useState(todoSaga.username)
  const [description, setDescription] = React.useState(todoSaga.description)
  const [targetDate, setTargetDate] = React.useState(label == 'ADD'? date : todoSaga.targetDate)
  const [isValidDate, setIsValidDate] = React.useState(true)

  const handleDispatch=()=>{
    if(typeof targetDate === 'undefined'){
        setIsValidDate(false)
    }else{
      label == 'ADD'? dispatch(typeAddTodo({
        username: username,
        description: description,
        targetDate: targetDate
      })):dispatch(typeUpdateTodo({
        id: todoSaga.id,
        username: username ?? todoSaga.username,
        description: description ?? todoSaga.description,
        targetDate: targetDate ?? todoSaga.targetDate
    }))
      dispatch(modalSlice.actions.showModal(''))
    }
  }

  const updateUsername=(e: ChangeEvent<HTMLInputElement>)=>{
    setUsername(e.target.value)
    console.log(username)
  }
  const updateDescription=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setDescription(e.target.value)
    console.log(description)
  }
  const updateTargetDate=(e: ChangeEvent<HTMLInputElement>)=>{
    setTargetDate(e.target.value)
    console.log(targetDate)
  }

    return (
      <div className='modal-container'>
      <div className='modal'>
        <span className='flex justify-between'>
            {label == 'UPDATE'? <h2 className='text'>Update Todo</h2>:<h2 className='text'>Add Todo</h2>}
          <button className='escape' onClick={()=>{
            dispatch(getSingleSlice.actions.reducerGetSingleReset({}))
            dispatch(modalSlice.actions.showModal(''))
          }}>x</button>

        </span>
          <form className='h-3/4' onSubmit={
            handleSubmit(onSubmit)
            }>
          <input {...register("usernameId", {required: true})} className={`input--text ${errors.usernameId && `onError`}`} type="text" placeholder='Username' defaultValue={todoSaga?.username} onChange={updateUsername}/>
          {errors.usernameId && <p className='onError-Text'>Username is required</p>}
          <textarea {...register("descriptionId", {required: true})} className={`input--text h-3/4 resize-none ${errors.descriptionId && `onError`}`} placeholder='Description' defaultValue={todoSaga?.description} onChange={updateDescription}/>
          {errors.descriptionId && <p className='onError-Text'>Description is required</p>}
        <span className='flex justify-between'>
          <div>
          <input type="date" required name="targetDate" defaultValue={label == 'ADD'? date : todoSaga.targetDate} onChange={updateTargetDate}/>
          {!isValidDate && <p className='onError-Text'>Date is required</p>}
          </div>
          {label == 'UPDATE'?
                  //update button
                  <input type='submit' value='Update' className='button button--update'/> :

                  //add button
                  <input type='submit' value='Add' className='button button--add'/>
        }
        </span>
        </form>
      </div>
    </div>
    )
}

export default CreateAddModal
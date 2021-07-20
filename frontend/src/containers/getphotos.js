import React, { useEffect, useRef, useState, useReducer } from 'react'
import axios from 'axios'
import Loading from '../components/loading'
import Modal from '../components/modal'
import { reducer } from '../utils/reduce'
const defaultState = {
  alblumData: [],
  isLoading: false,
  isModalOpen: false,
  modalContent: ""
}

const GetPhotos = () => {

  const refContainer = useRef(null)
  const [albumid, setAlbum] = useState('')
  const [state, dispatch] = useReducer(reducer, defaultState)
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOADING' })

    if (isNaN(albumid)) {
      dispatch({ type: "ID_NOT_NUMBER" })
    }

    if (!albumid) {
      dispatch({ type: "EMPTY_VALUE" })
    }
    else
      try {
        state.alblumData = []
        const data = await axios.get(`https://get-albums.herokuapp.com/api/album/${albumid}`)
        dispatch({ type: "FINISHED", payload: data })
        setAlbum('')
      } catch (error) {
        // throw new Error("can't get Album photos")
      }
  }

  const closeModal = () => {
    dispatch({ type: "CLOSE MODAL" })
  }

  useEffect(() => {
    refContainer.current.focus()
  })

  return <>
    {state.isModalOpen && <Modal modalContent={state.modalContent} closeModal={closeModal} />}
    <form onSubmit={handleSubmit}>
      <div className="form-container mx-auto" style={{ width: 600 }}>
        <div className="d-flex flex-row justify-content-between">
          <label htmlFor=""> Enter Album ID</label>
          <input type="text" ref={refContainer} onChange={(e) => {
            setAlbum(e.target.value);
          }} value={albumid} />
          <button type="submit" className="btn btn-primary" > Get Album Photos By Id</button>
        </div>
      </div>
    </form>
    <div className="gridContainer">
      {state.isLoading ? <Loading /> : ('')}
      {state.alblumData.map((element, index) => {
        const { thumbnailUrl, title } = element
        return (
          <div class="card" key={index} style={{ width: 288 }}>
            <img src={thumbnailUrl} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">{title}</p>
            </div>
          </div>)
      })}
    </div>


  </>


}
export default GetPhotos
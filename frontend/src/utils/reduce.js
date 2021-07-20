
export const reducer = (state, action) => {
 if (action.type === 'ID_NOT_NUMBER') {
  return { ...state, isLoading: false, isModalOpen: true, modalContent: "Album ID must be a number" }

 }

 if (action.type === "EMPTY_VALUE") {
  return { ...state, isLoading: false, isModalOpen: true, modalContent: "Album ID can't be empty" }
 }
 if (action.type === 'LOADING') {
  return { ...state, isModalOpen: false, isLoading: true, alblumData: [] }
 }
 if (action.type === 'FINISHED') {
  const newData = action.payload
  state.alblumData = []
  // console.log(newData)
  return { ...state, isLoading: false, isModalOpen: false, alblumData: newData.data }
 }
 if (action.type === "CLOSE MODAL") {

  return { ...state, isModalOpen: false }
 }

}
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'
import { addReview, loadReviews } from '../store/actions/review.actions'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'

// import { loadUsers } from '../store/user.actions'

export function ReviewIndex({ toyId }) {

  // const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  console.log('reviews:', reviews)

  const [reviewToEdit, setReviewToEdit] = useState({ txt: '' })

  // const dispatch = useDispatch()

  useEffect(() => {
    loadReviews()
    // loadUsers()

    // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
    //   console.log('GOT from socket', review)
    //   dispatch(getActionAddReview(review))
    // })

    // return () => {
    //   socketService.off(SOCKET_EVENT_REVIEW_ADDED)
    // }
  }, [])

  const handleChange = ev => {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  const onAddReview = async ev => {
    ev.preventDefault()
    if (!reviewToEdit.txt) return alert('All fields are required')
    // if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
    try {
      console.log('Trying to add review');
      await addReview({ ...reviewToEdit, toyId: toyId })
      showSuccessMsg('Review added')
      setReviewToEdit({ txt: '' })
    } catch (err) {
      showErrorMsg('Cannot add review')
    }
  }

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    if (!loggedInUser) return false
    return review.byUser._id === loggedInUser._id || loggedInUser.isAdmin
  }


  return (
    <div className="review-index">
      {loggedInUser &&
        <form onSubmit={onAddReview} className='flex' style={{ alignItems: 'center', gap: 10, marginTop: 20 }}>
          {/* <select
            onChange={handleChange}
            value={reviewToEdit.aboutUserId}
            name="aboutUserId"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select> */}
          <textarea
            name="txt"
            onChange={handleChange}
            value={reviewToEdit.txt}
          ></textarea>
          <button>Add</button>
        </form>}
      <h1>Reviews</h1>
      {reviews && <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>}
            <p>
              About:
              <Link to={`/user/${review.aboutUser._id}`}>
                {review.aboutUser.fullname}
              </Link>
            </p>
            <h3>{review.txt}</h3>
            <p>
              By:
              <Link to={`/user/${review.byUser._id}`}>
                {review.byUser.fullname}
              </Link>
            </p>
          </li>
        ))}
      </ul>}
      {/* {users && loggedInUser && */}

      {/* <hr /> */}
    </div>
  )
}
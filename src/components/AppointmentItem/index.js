// Write your code here
import './index.css'
const AppointmentItem = props => {
  const {eachItem, checkFav} = props
  const {id, title, date, isFav} = eachItem
  const favImg = isFav
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const myFav = () => {
    checkFav(id)
  }
  return (
    <li>
      <div className="person-title">
        <p className="pt">{title}</p>
        <button type="button" className="ft" onClick={myFav} data-testid="star">
          <img src={favImg} className="icon-img" alt="star" />
        </button>
      </div>
      <p className="dt">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem

import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    listOfApp: [],
    date: '',
    title: '',
    starred: false,
  }
  changeDa = event => {
    const formatDate = event.target.value

    if (formatDate !== '') {
      this.setState({
        date: format(new Date(formatDate), 'dd MMMM yyyy, EEEE'),
      })
    }
  }
  changeTi = event => {
    const titleForm = event.target.value
    if (titleForm !== '') {
      this.setState({
        title: titleForm,
      })
    }
  }
  subFun = event => {
    event.preventDefault()
    const {date, title} = this.state
    if (date !== '' && title !== '') {
      const obj = {
        id: uuidv4(),
        title,
        date,
        isFav: false,
      }
      this.setState(prevState => ({
        listOfApp: [...prevState.listOfApp, obj],
        title: '',
        date: '',
      }))
    }
    this.setState({
        title:'',
        date:'',
      })
  }
  checkFav = sentId => {
    this.setState(prevState => ({
      listOfApp: prevState.listOfApp.map(each => {
        if (each.id === sentId) {
          return {...each, isFav: !each.isFav}
        }
        return each
      }),
    }))
  }
  starredFun = () => {
    this.setState(prevState => ({
      starred: !prevState.starred,
    }))
  }
  render() {
    const {title, date, starred, listOfApp} = this.state
    const newList = listOfApp.filter(each => each.isFav)
    const currentList = starred ? newList : listOfApp
    return (
      <div className="bg-main">
        <div className="bg-box">
          <div className="bg-top">
            <form className="add-app-bg" onSubmit={this.subFun}>
              <h1 className="form-h1">Add Appointment</h1>
              <label htmlFor="titleInput">TITLE</label>
              <input
                type="text"
                placeholder="Title"
                className="title-input"
                id="titleInput"
                onChange={this.changeTi}
                value={title}
              />
              <label htmlFor="dateInput">DATE</label>
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="date-input"
                id="dateInput"
                onChange={this.changeDa}
              />
              <button type="submit" className="form-btn">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="bg-img"
            />
          </div>
          <hr />
          <div className="appointments-title">
            <h1 className="ap-h">Appointments</h1>
            <button className="ap-p" onClick={this.starredFun}>
              Starred
            </button>
          </div>
          <ul>
            {currentList.map(each => (
              <AppointmentItem
                eachItem={each}
                key={each.id}
                checkFav={this.checkFav}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments

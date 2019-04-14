import React from 'react'
import {db} from './firebase.js'
import {Formik} from 'formik'
import {Input, InputNumber, SubmitButton} from '@jbuschke/formik-antd'

class SearchResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      times: {},
      cleaningMemo: '',
    }
  }
  componentDidMount() {
    let times = this.props.reservations.reduce((result, obj) => {
      if (obj.checkInDate === this.props.date) {
        result['checkInTime'] = {
          time: obj.checkInTime,
          id: `${obj.platform}-${obj.reservationCode}`,
        }
      } else if (obj.checkOutDate === this.props.date) {
        result['checkOutTime'] = {
          time: obj.checkOutTime,
          id: `${obj.platform}-${obj.reservationCode}`,
        }
      }
      return result
    }, {})
    const checkInRes = this.props.reservations.filter(
      res => res.checkInDate === this.props.date,
    )
    const cleaningMemo = checkInRes[0].cleaningMemo
    this.setState({times, loading: false, cleaningMemo})
  }
  render() {
    if (this.state.loading) {
      return null
    }

    return (
      <React.Fragment>
        <Formik
          initialValues={{
            checkInTime: this.state.times['checkInTime']
              ? this.state.times['checkInTime'].time
              : 0,
            checkOutTime: this.state.times['checkOutTime']
              ? this.state.times['checkOutTime'].time
              : 0,
            cleaningMemo: this.state.cleaningMemo,
          }}
          onSubmit={async (values, actions) => {
            const checkInQuery = db
              .collection('reservations')
              .doc(this.state.times['checkInTime'].id)
            const checkOutQuery = db
              .collection('reservations')
              .doc(this.state.times['checkOutTime'].id)

            try {
              if (values.checkInTime) {
                await checkInQuery.update({checkInTime: values.checkInTime})
              }
              if (values.checkOutTime) {
                await checkOutQuery.update({checkOutTime: values.checkOutTime})
              }
              await checkInQuery.update({cleaningMemo: values.cleaningMemo})
              actions.resetForm({})
            } catch (error) {
              console.log('error', error.toString())
            }
          }}
          render={({
            errors,
            resetForm,
            values,
            status,
            touched,
            isSubmitting,
          }) => (
            <React.Fragment>
              <div style={{marginTop: '10px'}}>
                <span>CheckInTime: </span>
                <InputNumber name="checkInTime" />
              </div>
              <div style={{marginTop: '10px'}}>
                <span>CheckOutTime: </span>
                <InputNumber name="checkOutTime" />
              </div>
              <div style={{marginTop: '10px'}}>
                <span>cleaning memo</span>
                <Input name="cleaningMemo" />
              </div>
              <div style={{marginTop: '10px'}}>
                <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
              </div>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    )
  }
}

export default SearchResult

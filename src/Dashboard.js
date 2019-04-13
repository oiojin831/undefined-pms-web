import React from 'react'

import {Formik} from 'formik'
import {
  DatePickerField,
  RadioGroupField,
  SubmitButton,
} from '@jbuschke/formik-antd'
import {Col, Layout} from 'antd'

import {db} from './firebase.js'
import {formattedNow} from './util.js'
import SearchResult from './SearchResult.js'
import {DateTime} from 'luxon'

const {Header, Footer, Content} = Layout

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      reservations: [],
    }
  }

  render() {
    return (
      <Formik
        initialValues={{
          date: formattedNow,
        }}
        onSubmit={async (values, actions) => {
          this.setState({loading: true, reservations: []})
          const query = db
            .collection('reservations')
            .where(
              'stayingDates',
              'array-contains',
              DateTime.fromISO(values.date, {zone: 'Asia/Seoul'})
                .toString()
                .substring(0, 10),
            )
            .where('roomNumber', '==', values.roomNumber)

          try {
            const snap = await query.get()
            const tempRes = snap.docs.map(doc => {
              return doc.data()
            })
            this.setState({loading: false, reservations: tempRes})
            actions.setSubmitting(false)
          } catch (error) {
            console.log('error', error.toString())
          }
        }}
        render={({errors, values, status, touched, isSubmitting}) => (
          <Layout>
            <Header />
            <Content style={{marginTop: '20px'}}>
              <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}} />
              <Col xs={{span: 11, offset: 1}} lg={{span: 6, offset: 2}}>
                <div style={{marginTop: '10px'}}>
                  <DatePickerField name="date" />
                </div>
                <div style={{marginTop: '10px'}}>
                  <RadioGroupField
                    name="roomNumber"
                    dataSource={[
                      {label: 'dmyk101', value: 'dmyk101'},
                      {label: 'dmyk102', value: 'dmyk102'},
                      {label: 'dmyk103', value: 'dmyk103'},
                      {label: 'dmyk104', value: 'dmyk104'},
                      {label: 'dmyk201', value: 'dmyk201'},
                      {label: 'dmyk202', value: 'dmyk202'},
                      {label: 'dmyk203', value: 'dmyk203'},
                      {label: 'dmyk204', value: 'dmyk204'},
                      {label: 'dmyk300', value: 'dmyk300'},
                      {label: 'sinsa101', value: 'sinsa101'},
                      {label: 'sinsaB01', value: 'sinsaB01'},
                      {label: 'sinsaB02', value: 'sinsaB02'},
                      {label: 'sinsaB03', value: 'sinsaB03'},
                    ]}
                  />
                </div>
                <div style={{marginTop: '10px'}}>
                  <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
                </div>
                {this.state.reservations.length == 0 ? null : (
                  <SearchResult
                    date={DateTime.fromISO(values.date, {
                      zone: 'Asia/Seoul',
                    })
                      .toString()
                      .substring(0, 10)}
                    reservations={this.state.reservations}
                  />
                )}
              </Col>

              <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}} />
            </Content>
            <Footer />
          </Layout>
        )}
      />
    )
  }
}

export default Dashboard

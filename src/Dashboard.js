import React from 'react'

import {Formik} from 'formik'
import {DatePicker, Radio, SubmitButton} from '@jbuschke/formik-antd'
import {Layout} from 'antd'

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
              <div style={{marginTop: '10px'}}>
                <DatePicker name="date" />
              </div>
              <div style={{marginTop: '10px'}}>
                <Radio.Group name="roomNumber">
                  <Radio.Button value="dmyk101">dmyk101</Radio.Button>
                  <Radio.Button value="dmyk102">dmyk102</Radio.Button>
                  <Radio.Button value="dmyk103">dmyk103</Radio.Button>
                  <Radio.Button value="dmyk104">dmyk104</Radio.Button>
                  <Radio.Button value="dmyk201">dmyk201</Radio.Button>
                  <Radio.Button value="dmyk202">dmyk202</Radio.Button>
                  <Radio.Button value="dmyk203">dmyk203</Radio.Button>
                  <Radio.Button value="dmyk204">dmyk204</Radio.Button>
                  <Radio.Button value="dmyk300">dmyk300</Radio.Button>
                  <Radio.Button value="sinsa101">sinsa101</Radio.Button>
                  <Radio.Button value="sinsaB01">sinsaB01</Radio.Button>
                  <Radio.Button value="sinsaB02">sinsaB02</Radio.Button>
                  <Radio.Button value="sinsaB03">sinsaB03</Radio.Button>
                </Radio.Group>
              </div>
              <div style={{marginTop: '10px'}}>
                <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
              </div>
              {this.state.reservations.length === 0 ? null : (
                <SearchResult
                  date={DateTime.fromISO(values.date, {
                    zone: 'Asia/Seoul',
                  })
                    .toString()
                    .substring(0, 10)}
                  reservations={this.state.reservations}
                />
              )}
            </Content>
            <Footer />
          </Layout>
        )}
      />
    )
  }
}

export default Dashboard

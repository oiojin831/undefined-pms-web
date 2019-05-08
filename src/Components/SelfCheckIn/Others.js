import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {InstantSearch, SearchBox, connectHits} from 'react-instantsearch-dom'
import {formattedNow, formattedYesterday} from '../../util'
import {Link} from '@reach/router'

const searchClient = algoliasearch(
  'A7CJY50RWE',
  '2c3d43b5469dcc6b8c11c1b49447e100',
)

const Hits = ({hits}) => (
  <div style={{paddingTop: '10px'}}>
    {hits.map(hit => {
      return hit.checkInDate === formattedNow ||
        hit.checkInDate === formattedYesterday ? (
        <Link
          key={hit.objectID}
          to="../check-in-info"
          state={hit}
          style={{paddingTop: '10px', color: 'white', fontSize: '20px'}}>
          {hit.guestName}
        </Link>
      ) : null
    })}
  </div>
)

const CustomHits = connectHits(Hits)

export default () => {
  return (
    <div
      style={{
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '30px',
        justifyContent: 'flex-start',
      }}>
      <InstantSearch indexName="reservations" searchClient={searchClient}>
        <SearchBox placeholder="Type your first name" searchAsYouType={false} />
        <CustomHits />
      </InstantSearch>
      <Link
        style={{
          color: 'white',
          fontWeight: 'bold',
          paddingTop: '30px',
        }}
        to="/self-check-in/platform/dmyk-info">
        I don't have confirmation code
      </Link>
    </div>
  )
}

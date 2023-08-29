import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from './components/Spinner'
import ListingItem from './components/ListingItem'

function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings")

        // Create query
        const q = query(
          listingsRef, 
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
          )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        // Process results
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)

      } catch (error) {
        toast.error("Error!")
        console.log(error)
      }
    }
    fetchListings()
  }, [])

  // pagination / load more
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings")

      // Create query
      const q = query(
        listingsRef, 
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10),
        )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      // Process results
      const listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)

    } catch (error) {
      toast.error("Error!")
      console.log(error)
    }
  }

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>

      {loading 
        ? <Spinner /> 
        : listings && listings.length > 0
          ? ( <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings} >Load 10 more</p>
          )}

          </> )
          : <p>Miaow has no current offers for you!</p>
          }
    </div>
  )
}

export default Offers
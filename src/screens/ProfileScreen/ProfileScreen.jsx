import './ProfileScreen.css';
import Nav from '../../Nav';
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function ProfileScreen() {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [plan, setPlan] = useState('Premium');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsQuery = query(
          collection(db, 'products'),
          where('active', '==', true)
        );
        const querySnapshot = await getDocs(productsQuery);
        setProducts(querySnapshot.docs.map(productDoc => ({
          id: productDoc.id,
          ...productDoc.data(),
        })));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchProducts();
  }, []);
  
  console.log(products);
  
  return (
    <div className='profileScreen'>
      <Nav />
      <div className='profileScreen__body'>
        <h1>Edit Profile</h1>
        <div className='profileScreen__info'>
          <img 
            src='https://upload.wikimedia.org/wikipedia/commons/3/37/Netflix_smiley_face_avatar.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original'
            alt='Netflix Avatar'
          />
           <div className='profileScreen__details'>
            <h2>User email: {user.email}</h2>
            <div className='profileScreen__plans'>
              <h4>Plans (Current Plan: {plan})</h4>
              <h5>Renewal date: 04/03/2027</h5>
              {products.map(p => (
                <div className='profileScreen__plan' key={p.id}>
                  <div className='profileScreen__planInfo'>
                    <h5>Netflix {p.name}</h5>
                    <h6>{p.description} - R${parseFloat(p.price).toFixed(2)}</h6>
                  </div>
                  <button className='profileScreen__subscribe' disabled={plan === p.name} onClick={() => setPlan(p.name)}>{plan === p.name ? 'Current Plan' : 'Subscribe'}</button>
                </div>
              ))}
            </div>
              <button className='profileScreen__signOut' onClick={() => auth.signOut()}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProfileScreen
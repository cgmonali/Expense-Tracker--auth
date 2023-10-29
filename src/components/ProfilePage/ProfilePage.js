import classes from './ProfilePage.module.css';
import { FiUser, FiLink } from 'react-icons/fi';
import { useRef,useContext } from 'react';
import AuthContext from '../../store/auth-context';

const ProfilePage = () => {

const nameRef=useRef();
const urlRef=useRef();

const authCtx = useContext(AuthContext);
console.log(authCtx.token)
function submitDetailsHandler(){

const enteredName=nameRef.current.value;
const enteredUrl=urlRef.current.value;

let url=`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDcyqi2t1KKsniE8q1DWoge17LEVLNT_ng`;
    fetch(
        url
              ,
              {
                method: 'POST',
                body: JSON.stringify({
                 idToken:authCtx.token,
                 displayName: enteredName,
                  photoUrl: enteredUrl,
                  returnSecureToken: true,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              
              }
      
              
            ).then((res) => {
           
              if (res.ok) {
                return res.json(); 
              } else {
                return res.json().then((data) => {
                  let errorMessage = 'Authentication failed!';
                  if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                  }
      
                  throw new Error(errorMessage);
                });
              }
            })
            .then((data) => {
             console.log(data)
             
            
            })
            .catch((err) => {
              alert(err.message);
            });

        }




















  return <>
  <div className={classes.profilecontainer}><h2>Contact Details</h2></div>
 <form action="" className={classes.profileform} onSubmit={submitDetailsHandler} >
<div>
<span>
<label htmlFor=""><FiUser className={classes.profilenameicone} /> Full Name: 
     </label>
<input type="text"ref={nameRef} /></span>
<span>
<label htmlFor=""> <FiLink />Profile Photo URL</label>
<input type="url" ref={urlRef}/></span>

</div>
<span>
<button className={classes.updatebutton}>update</button></span>
 </form>
  </>
  
 
};

export default ProfilePage;

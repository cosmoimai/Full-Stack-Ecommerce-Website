import React, {useRef, useState,useEffect} from 'react'
import { Fragment } from 'react'
import "./ForgotPassword.css"
import Loader from '../layout/loader/Loader'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import FaceIcon from "@material-ui/icons/Face"
import { useDispatch,useSelector } from 'react-redux'
import { clearErrors,forgotPassword,loadUser} from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";



const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        // console.log(email)
        myForm.append("email", email);
        console.log("email-> ",myForm["email"])
        dispatch(forgotPassword(myForm));
      };

      useEffect(() => {
    
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
        }

      }, [dispatch, error, alert,message]);
    console.log(email)
  return (
    <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Forgot Profile" />
            <div className="forgotPasswordContainer">
              <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot Profile</h2>
  
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
                  <div className="forgotPasswordEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Send"
                    className="forgotPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
  )
}

export default ForgotPassword
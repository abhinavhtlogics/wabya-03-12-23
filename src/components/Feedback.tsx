import React, { useEffect, useState, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
// ** React Imports


// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../firebaseConfig'
import { collection, query, addDoc, where, getDocs,doc,getDoc,updateDoc } from 'firebase/firestore';
import { Alert, Modal } from 'antd'
import { sendMail } from "../services/sendMail";  


const Feedback = ({ clientName,clientEmail }) => {
  
    const [starRating, setstarRating] = useState(0);
    const [isSkip, setisSkip] = useState(0);
    const ref = collection(database, 'session_feedback');
    const [message, setMessage] = useState(false);
    const [errmessage, seterrmessage] = useState(false);
    const [comment, setComment] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(true);
    const handleInputChange = (event) => {
        const value = event.target.value;
        setstarRating(value);
        console.log(value);
      };

      const handleCancel2 = () => {
        setIsModalVisible(false);
      };

      const handleCancel = (event) => {
        event.preventDefault();
        setIsModalVisible(false);
      };

      async function sendMailFunc (email,content,$subject){   
        let response = await sendMail(email,$subject,content);   
      
        console.log('response',response);
      }   


      const handleSubmit = async (e) =>{
        e.preventDefault();
        setMessage(false);
        seterrmessage(false);
   if(starRating > 0){
        addDoc(ref, {
            client_id: '6454',
            coach_id : '5fbvfdv',
            daily_api_meeting_id : 'atdvdv',
            meeting_id : 'anbgd',
            comment : comment,
            star_rating : Number(starRating),
            isSkip : isSkip,
           
          })
            .then(() => {

             setMessage(true);
             const logoUrl = 'https://wabya.com/images/logo-new.png';

             const adminmsg = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
       <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Wabya</title>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
          <style type="text/css">
             body{padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size:14px; line-height:22px; font-family: 'Lato', sans-serif; font-weight:400;}
          </style>
       </head>
       <body paddingwidth="0" paddingheight="0"  style="" offset="0" toppadding="0" leftpadding="0">
       <div style="display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;">
          <table width="600" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='width: 600px; display: block;'>
             <tbody>
                <tr>
                   <table class="MainContainer" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ece6d5" align="center" style='width: 600px; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px;'>
                      <tbody style=''>
    <tr>
                            <td colspan="2"><div style="text-align: center; margin:35px 0 0" class="contentLogo"><a href="https://www.#.com"><img src="${logoUrl}" width="200px" alt="" border="0" style=""></a></div></td>
                         </tr>
                         <tr>
                            <td>
                               <div style="padding:0 30px;  position: relative; z-index: 2;line-height: 22px;font-family: 'Lato', sans-serif;font-weight: 600;text-align: center;">
                             
                               <p style="font-size: 18px; text-align: center; color: #864985;">Hello Admin,</p>
                               <p style="font-size: 18px; text-align: center; color: #864985;">A new feedback on your platform.</p>
                               <p style="font-size: 18px; text-align: center; color: #864985;">Here are the details:</p>
     
   
                               <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Name: ${clientName} </p>
    <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Email: ${clientEmail.toLowerCase()} </p>

    <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Rating: ${Number(starRating)} </p>

    <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Comments: ${comment} </p>
  
    <hr style="border: 1px solid #1c686b;">
    <p style="font-size: 14px; color: #242424; text-align: center;">Thank you,<br>Wabya Team</p>
     </div>  
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </tr>
             </tbody>
          </table>
     </div>
       </body>
    </html>
`;
  sendMailFunc('youare@wabya.com',adminmsg,'Feedback'); 
            })
            .catch((err) => {
              console.error(err);
            })
            setIsModalVisible(false);
          }else{
            seterrmessage(true);
          }


         

      
    }   


    const handleClose = () => {
      setMessage(false);
    };

    const handleComment = (event) => {
      setComment(event.target.value)
    }

    const handleErrClose = () => {
      seterrmessage(false);
    };


  return (
    <>
    <Modal
          centered
          className="session-history-modal"
          visible={isModalVisible}
          onCancel={handleCancel2}
          width={1100}
        >
  <section className="coach-feedback">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form>
            <div className="feedback-box">
              <h3 className="mrb-20 text-center">feedback</h3>
              <div className="form-group mrb-20">
                <label>
                  how would you rate your coaching experience today?
                </label>
                <span className="star-rating">
                {starRating <1 &&
  <input
    type="radio"
    name="rating"
    value={1}
    className=""
    onClick={ handleInputChange}
  />}
  {starRating >= 1 &&
  <input
    type="radio"
    name="rating"
    value={1}
    className="select-feeback"
    onClick={ handleInputChange}
  />
}
{starRating <2 &&
  <input type="radio" name="rating" value={2}  onClick={ handleInputChange} />}
  {starRating >= 2 &&
  <input
    type="radio"
    name="rating"
    value={2}
    className="select-feeback"
    onClick={ handleInputChange}
  />
}
{starRating <3 &&
  <input type="radio" name="rating" value={3}  onClick={ handleInputChange} /> }
  {starRating >= 3 &&
  <input
    type="radio"
    name="rating"
    value={3}
    className="select-feeback"
    onClick={ handleInputChange}
  />
}
{starRating <4 &&
  <input type="radio" name="rating" value={4}  onClick={ handleInputChange} />}
  {starRating >= 4 &&
  <input
    type="radio"
    name="rating"
    value={4}
    className="select-feeback"
    onClick={ handleInputChange}
  />}
  {starRating <5 &&
  <input type="radio" name="rating" value={5}  onClick={ handleInputChange} />}
  {starRating >= 5 &&
  <input
    type="radio"
    name="rating"
    value={5}
    className="select-feeback"
    onClick={ handleInputChange}
  />}
</span>

              </div>
              <div className="form-group">
                <label>what worked well? what could be improved?</label>
                <textarea className="form-control" value={comment} onChange={handleComment} />
              </div>
              <div className="form-group">
                {/* <p className="skip-link">
                  <a href="#" onClick={handleCancel}>
                    skip{" "}
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  </a>
                </p> */}
              </div>

              {errmessage ? (
              <Alert message="Please Select Rating" type="error" showIcon closable afterClose={handleErrClose} />
          ) : null}
              {message ? (
              <Alert message="Feedback Submitted" type="success" showIcon closable afterClose={handleClose} />
          ) : null}
              <div className="form-group">
              <p className="skip-link">
                  <a href="#" onClick={handleCancel}>
                    skip{" "}
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  </a>
                </p>
                <button className="btn btn-send" onClick={handleSubmit}>submit</button>
              </div>
            </div>
          </form>
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ coach-feedback */}
  </Modal>

</>

  );
};

export default Feedback;

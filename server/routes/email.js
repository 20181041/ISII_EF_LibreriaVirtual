// llamamos a los paquetes que sean necesarios
const { Router } = require("express");
const nodemailer = require('nodemailer');
const router = Router();
const { google  } = require('googleapis');
const pool = require('../database');



router.post('/send-emailx', async (req, res) => {

    console.log(req.body);
    const {email} = req.body;


    


    const usuario = await pool.query('SELECT * FROM usuario where Correo = ?',[email]);
    console.log("el sistema ha recibido los datos", usuario);
    const message = usuario.Password;
        
    //Aquí es donde armamos el cuerpo del mensaje
       const contentHTML = `
        
                <h1> 
                    Recuperación de contraseña
                </h1>
                <ul>

                    <li>User Email: ${email}</li>
                    
                    
                </ul>
                <p> ${message}</p>

                <p>RECUPERE SU CONTRASEÑA</p>
               <p> ${usuario}</p>
                `;

        const CLIENT_ID = "1043126957420-d39aqgccva9i1rh7n26sea1asn9uokii.apps.googleusercontent.com" ;
        const CLIENT_SECRET="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";
        const REDIRECT_URI="https://developers.google.com/oauthplayground";
        const REFRESH_TOKEN="1//041wdYNFrTWmkCgYIARAAGAQSNwF-L9Ir3LatdBmaboqILQvUsM4rIfXdWOqTNuKJ8REU36FDyzFQuuRQgmmh-QzI_BK_RXK1fiU";
        //seteamos los valores declarados anteriormente para establecer conexión con la api de google
        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID, 
            CLIENT_SECRET,
            REDIRECT_URI
            
        );  

        oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN});

        async function sendmail(){

            try{
                const accesToken = await oAuth2Client.getAccessToken();
                const transporter = nodemailer.createTransport({
                    //seteamos la conexión con la api
                    service:"gmail",
                    auth:{
                        type:"OAuth2",
                        user:"ulima2021.oci1.20180515@gmail.com",
                        clientId : CLIENT_ID,
                        clientSecret : CLIENT_SECRET,
                        refreshToken : REFRESH_TOKEN,
                        accestoken: accesToken,

                    },

                });
                const mailOptions={

                    from: "'Servidor de correos Torque' <ulima2021.oci1.20180515@gmail.com>",
                    //elegimos el destinatario del correo
                    to:  `${email}`,
           
                    subject: 'Formulario de contacto',
                    // devuelve como mensaje al correo lo que contenga este html
                    html : contentHTML,
                        
                };

                
                //ENVIAMOS EMAIL UNA VEZ CONFIGURADO TODO
                const result = await transporter.sendMail(mailOptions);
                return result;



            } catch (err){

                console.log('error encontrado',err);
                console.log('algo salió mal')
            }
        }

        //setear respuesta del servidor
        sendmail()
          .then(result=>res.status(200).send('Correo enviado a su bandeja!'))
          .catch(error=>console.log(error.message));


          


});



module.exports = router;



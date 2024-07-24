const { Router } = require('express');


const User = require('../models/user');  // Ensure the User model is imported
const router = Router();


router.get('/signin', (req, res) => {
  return res.render("signin");
});


router.get('/signup', (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
  console.log(email, password);
  const token = await User.matchPasswordAndGenerateToken(email, password);


  return res.cookie('token',token).redirect("/");
  } catch (error) {
    return res.render('signin',{
      error:"Incorrect Email or Password",
    });
  }
});



router.get('/logout', (req,res) =>{
  res.clearCookie('token').redirect("/");
});


router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
      await User.create({
          fullName,
          email,
          password,
      });
      return res.redirect("/signin");
  } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).render("signup", { error: "Internal Server Error" });
  }
});



module.exports = router;

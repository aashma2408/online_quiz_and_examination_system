router.get('/profile', async (req, res) => {

  try {

    const student = await User.findOne();

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
const moment = require('moment-timezone');

function startOfDay() {
  return moment().tz('Asia/Kolkata').startOf('day').toDate();
}

function endOfDay() {
  return moment().tz('Asia/Kolkata').endOf('day').toDate();
}

exports.studentLogin = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password?.trim();

  const t = await sequelize.transaction();

  try {
    const student = await Student.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('email')),
        email
      ),
      include: School,
      transaction: t,
      lock: t.LOCK.UPDATE  
    });

    if (!student) {
      await t.rollback();
      return res.status(404).json({ message: 'Student not found' });
    }

    const validPassword = await bcrypt.compare(password, student.password_hash);
    if (!validPassword) {
      await t.rollback();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const schoolId = student.school_id;
    const limit = student.School.daily_login_limit;

    const todayStart = startOfDay();
    const todayEnd = endOfDay();

    const uniqueCount = await StudentLogin.count({
      distinct: true,
      col: 'student_id',
      include: [{
        model: Student,
        where: { school_id: schoolId }
      }],
      where: {
        login_time: {
          [sequelize.Sequelize.Op.between]: [todayStart, todayEnd]
        }
      },
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (uniqueCount >= limit) {
      await t.rollback();
      return res.status(403).json({
        message: "Daily login limit reached for your school. Try again tomorrow."
      });
    }

    // Record login in IST timezone consistently
    await StudentLogin.create({
      student_id: student.id,
      login_time: moment().tz('Asia/Kolkata').toDate()
    }, { transaction: t });

    await t.commit();

    return res.status(200).json({
      message: "Login successful",
      token: "OK"
    });

  } catch (err) {
    await t.rollback();
    console.error("🔥 ERROR:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

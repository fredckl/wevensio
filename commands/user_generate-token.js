const { User, AppToken } = require('../src/models')
exports.command = 'user:generate-token'
exports.description = 'Generate new token'
exports.builder = (yargs) => {
  return yargs
    .option('user', {
      alias: 'u',
      type: 'number',
      demandOption: true,
      description: 'Generate new token for User id'
    })
    .option('app', {
      alias: 'a',
      type: 'string',
      default: 'wevensio',
      description: 'Generate new token for app name'
    })
}
exports.handler = async (args) => {
  const userId = args.user
  const appName = args.app
  console.log('User', User, AppToken)
  const user = await User.findByPk(userId)

  const appToken = await AppToken.findOne({
    where: {
      userId,
      appName
    }
  })
  if (appToken) {
    console.log('App token already exists', appToken)
    process.exit(1)
  }
  // const appToken = await AppToken.create({
  //   userId,
  //   token: jwt.sign({ id: userId }, app.jwtSecret, { expiresIn: '1h' }),
  //   type: 'bearer',
  //   expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 * 30),
  //   appName: 'wevensio'
  // })
  // if (!user) {
  //   console.error('User not found')
  //   process.exit(1)
  // }
  console.log(user)
}

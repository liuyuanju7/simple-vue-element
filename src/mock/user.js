
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const user_api = {
  'POST /dev-api/user/login': (req, res) => {
    const { username } = req.body
    console.log('config:', req.body)
    const token = tokens[username]

    if (!token) {
      return res.send({
        code: 60204,
        message: 'Account or password is incorrect'
      })
    }

    return res.send({
      code: 20000,
      data: token
    })
  },
  'POST /dev-api/user/logout': (req, res) => {
    return res.send({
      code: 20000,
      data: 'success'
    })
  },

  'GET /dev-api/user/info': (req, res) => {
    console.log('query:', req.query)
    const { token } = req.query
    const info = users[token]

    if (!info) {
      return res.send({
        code: 50008,
        message: 'Login failed, unable to get user details.'
      })
    }

    return res.send({
      code: 20000,
      data: info
    })
  }
}

// const user_api = [
//   // user login
//   {
//     url: '/user/login',
//     type: 'post',
//     response: config => {
//       const { username } = config.body
//       console.log('config:', config)
//       const token = tokens[username]
//
//       if (!token) {
//         return {
//           code: 60204,
//           message: 'Account or password is incorrect'
//         }
//       }
//
//       return {
//         code: 20000,
//         data: token
//       }
//     }
//   },
//   // get user info
//   {
//     url: '/user/info\.*',
//     type: 'get',
//     response: config => {
//       const { token } = config.query
//       const info = users[token]
//
//       if (!info) {
//         return {
//           code: 50008,
//           message: 'Login failed, unable to get user details.'
//         }
//       }
//
//       return {
//         code: 20000,
//         data: info
//       }
//     }
//   },
//
//   // user logout
//   {
//     url: '/user/logout',
//     type: 'post',
//     response: () => {
//       return {
//         code: 20000,
//         data: 'success'
//       }
//     }
//   }
// ]

module.exports = user_api

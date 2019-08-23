const _ = require('lodash')

// _.isEmpty()
// check xem object/mang rong?
// [], {} => true
// [1,2,3] => false
console.log(_.isEmpty([1, 2, 3]))
console.log(_.isEmpty([]))
if ([]) {
  console.log("Mang rong tra ve")
}

console.log("======================")
// _.get()
// nested object
const user1 = {
  credenticals: {
    email: "nguyenvana@gmail.com",
    password: "xxxyyyy"
  },
  profile: {
    name: "Nguyen Van A",
    age: 23,
    address: {
      number: 10,
      street: "Nguyen Hue",
      province: "TP.HCM"
    }
  }
}

let user2 = {
  credenticals: {
    email: "nguyenvanb@gmail.com",
    password: "xxxyyyy"
  },
  // profile: {
  //   name: "Nguyen Van B",
  //   age: 30,
  // }
}


console.log(user1.profile.address.province)
if (user2.profile && user2.profile.ad) {
  console.log(user2.profile.address.province)
}
console.log(_.get(user1, "profile.address.province"))
console.log(_.get(user2, "profile.address.province", "Nguoi dung chua nhap address"))

console.log("================")

// _.set
// _.set(user2, "profile.address.province", "Ha Noi")

user2 = {
  ...user2,
  profile: {
    address: {
      province: "Ha Noi"
    }
  }
}
console.log(JSON.stringify(user2, undefined, 2))
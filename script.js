// "use strict";

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // BANKIST APP

// // Data
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// // Elements
// const labelWelcome = document.querySelector(".welcome");
// const labelDate = document.querySelector(".date");
// const labelBalance = document.querySelector(".balance__value");
// const labelSumIn = document.querySelector(".summary__value--in");
// const labelSumOut = document.querySelector(".summary__value--out");
// const labelSumInterest = document.querySelector(".summary__value--interest");
// const labelTimer = document.querySelector(".timer");

// const containerApp = document.querySelector(".app");
// const containerMovements = document.querySelector(".movements");

// const btnLogin = document.querySelector(".login__btn");
// const btnTransfer = document.querySelector(".form__btn--transfer");
// const btnLoan = document.querySelector(".form__btn--loan");
// const btnClose = document.querySelector(".form__btn--close");
// const btnSort = document.querySelector(".btn--sort");

// const inputLoginUsername = document.querySelector(".login__input--user");
// const inputLoginPin = document.querySelector(".login__input--pin");
// const inputTransferTo = document.querySelector(".form__input--to");
// const inputTransferAmount = document.querySelector(".form__input--amount");
// const inputLoanAmount = document.querySelector(".form__input--loan-amount");
// const inputCloseUsername = document.querySelector(".form__input--user");
// const inputClosePin = document.querySelector(".form__input--pin");

// const displayMovements = function (movement, sort = false) {
//   const movs = sort ? movement.slice().sort((a, b) => a - b) : movement;
//   containerMovements.innerHTML = "";
//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? "deposit" : "withdrawal";
//     const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//         <div class="movements__value">${mov}€</div>
//       </div>
//     `;

//     containerMovements.insertAdjacentHTML("afterbegin", html);
//   });
// };

// const sum = (movements, interRestRate) => {
//   const incomes = movements
//     .filter((mov) => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${incomes}€`;

//   if (movements.filter((mov) => mov < 0).length > 0) {
//     const outIncoms = movements
//       .filter((mov) => mov < 0)
//       .reduce((acc, mov) => acc + mov);
//     labelSumOut.textContent = `${Math.abs(outIncoms)}`;
//   } else {
//     labelSumOut.textContent = `0`;
//   }

//   const interest = movements
//     .filter((mov) => mov > 0)
//     .map((desposit) => (desposit * interRestRate) / 100)
//     .filter((int) => int >= 1)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumInterest.textContent = `${interest}`;
// };

// const userShotName = (accs) => {
//   accs.forEach((acc) => {
//     acc.userName = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };

// const updateUI = (currentAccount) => {
//   displayMovements(currentAccount.movements);
//   clacPrintBalance(currentAccount.movements);
//   sum(currentAccount.movements, currentAccount.interestRate);
// };
// userShotName(accounts);

// const clacPrintBalance = function (movements) {
//   const balance = movements.reduce((acc, cur) => acc + cur, 0);
//   labelBalance.textContent = `${balance} EUR`;
// };

// const hideshowUi = (opa) => {
//   containerApp.style.opacity = opa;
// };

// let currentAccount;
// btnLogin.addEventListener("click", (e) => {
//   e.preventDefault();
//   currentAccount = accounts.find(
//     (ACC) => ACC.userName === inputLoginUsername.value
//   );
//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     labelWelcome.textContent = `Welcome back, ${
//       currentAccount.owner.split(" ")[0]
//     }`;
//     inputLoginUsername.value = inputLoginPin.value = "";
//     inputLoginPin.blur();
//     hideshowUi(100);
//     updateUI(currentAccount);
//   }
// });

// /////////////////////////////////////////////////
// ///////////= [//////////////////////////////////////
// // LECTURES
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// btnTransfer.addEventListener("click", (e) => {
//   e.preventDefault();
//   const amount = Number(inputTransferAmount.value);
//   const towho = inputTransferTo.value;

//   accounts.map(
//     (acc) =>
//       amount > 0 &&
//       currentAccount.userName !== towho &&
//       acc.userName === towho &&
//       acc.movements.push(amount) &&
//       currentAccount.movements.reduce((acc, mov) => acc + mov, 0) >= amount &&
//       currentAccount.movements.push(Math.abs(amount) * -1) &&
//       updateUI(currentAccount)
//   );
//   inputTransferAmount.value = inputTransferTo.value = "";
//   inputTransferAmount.blur();
// });

// btnLoan.addEventListener("click", (e) => {
//   e.preventDefault();
//   const amount = Number(inputLoanAmount.value);
//   if (
//     amount > 0 &&
//     currentAccount.movements.some((mov) => mov >= amount * 0.1)
//   ) {
//     currentAccount.movements.push(amount);
//     updateUI(currentAccount);
//   }
//   inputLoanAmount.value = "";
// });

// btnClose.addEventListener("click", (e) => {
//   e.preventDefault();
//   const inputClose = inputCloseUsername.value;
//   const inputPin = Number(inputClosePin.value);
//   if (
//     currentAccount.userName === inputClose &&
//     currentAccount.pin === inputPin
//   ) {
//     const index = accounts.findIndex(
//       (acc) => acc.userName === currentAccount.userName
//     );
//     accounts.splice(index, 1);
//     hideshowUi(0);
//   }
//   inputCloseUsername.value = inputClosePin.value = "";
// });

// let shown = false;

// btnSort.addEventListener("click", (e) => {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !shown);
//   shown = !shown;
// });

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // clacPrintBalance(currentAccount.movements) > amount &&
// // currentAccount.movements.push(Number(`-${amount}`)) &&
// // towho.movements.push(amount)

// // const movementsDescriptions = movements.map(
// //   (mov, i) =>
// //     `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(
// //       mov
// //     )}`
// // );

// // const withdrawals = movements.filter((drawal) => drawal < 0);
// // console.log(withdrawals);
// /////////////////////////////////////////////////

// // const clacAverageHumanAge = (ages) => {
// //   const ageclac = ages
// //     .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
// //     .filter((age) => age >= 18)
// //     .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// //   console.log(ageclac);
// // };

// // clacAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// // const z = Array.from({ length: 6 }, (_, i) => console.log(i + 1));
// // console.log(z);
// // const bankDepositSum = accounts
// //   .flatMap((acc) => acc.movements)
// //   .reduce((cur, mov) => (mov > 0 ? cur + mov : cur), 0);
// // console.log(bankDepositSum);

// // const numdepsoite = accounts
// //   .flatMap((acc) => acc.movements)
// //   .reduce((cur, mov) => (mov >= 1000 ? ++cur : cur), 0);
// // console.log(numdepsoite);

// // const { dep, wid } = accounts
// //   .flatMap((acc) => acc.movements)
// //   .reduce(
// //     (sum, cur) => {
// //       sum[cur > 0 ? "dep" : "wid"] += cur;
// //       return sum;
// //     },
// //     { dep: 0, wid: 0 }
// //   );
// // console.log(dep, wid);

// // const capfun = (title) => {
// //   const cap = (str) => str[0].toUpperCase() + str.slice(1);
// //   const exceptions = ["she", "it", "will", "my", "go"];
// //   const will = ["will"];
// //   const d = title
// //     .toLowerCase()
// //     .split(" ")
// //     .map((word) => (exceptions.includes(word) ? word : cap(word)))
// //     .join(" ");
// //   return d;
// // };
// // console.log(capfun("get on with me man will"));

// const dogs = [
//   {
//     weight: 22,
//     curFood: 250,
//     owners: ["Alica", "bob"],
//   },
//   {
//     weight: 8,
//     curFood: 200,
//     owners: ["Matilda"],
//   },
//   {
//     weight: 13,
//     curFood: 275,
//     owners: ["Sarah", "John"],
//   },
//   {
//     weight: 32,
//     curFood: 340,
//     owners: ["Michael"],
//   },
// ];
// dogs.forEach((dog) => (dog.recommendDog = dog.weight ** 0.75 * 28));
// console.log(dogs);

// const dog = dogs.map((acc) => acc.owners).filter((i) => i.includes("Sarah"));
// console.log(dog);

// const { eatlittle = [], eatalot = [] } = dogs.reduce(
//   (sum, cur, h, s) => {
//     const add = sum[cur.recommendDog < cur.curFood ? "eatlittle" : "eatalot"];
//     add.push(...cur.owners);

//     // console.log(cur.recommendDog < cur.curFood ? cur.owners.flat().push : "");
//     return sum;
//   },
//   {
//     eatalot: [],
//     eatlittle: [],
//   }
// );
// console.log(eatalot, eatlittle);

// // const { eatlittle = [], eatalot = [] } = dogs
// // .flatMap((dogfood) => dogfood.recommendDog)
// // .reduce(
// //   (sum, cur, h, s) => {
// //     console.log(s);
// //     sum[cur > 200 ? "eatlittle" : "eatalot"].push(cur);
// //     return sum;
// //   },
// //   {
// //     eatalot: [],
// //     eatlittle: [],
// //   }
// // );

// // const { dep, wid } = accounts
// //   .flatMap((acc) => acc.movements)
// //   .reduce(
// //     (sum, cur) => {
// //       sum[cur > 0 ? "dep" : "wid"] += cur;
// //       return sum;
// //     },
// //     { dep: 0, wid: 0 }
// //   );
// console.log(
//   eatlittle.join(" and ").concat(" eat to little"),
//   eatalot.join(" and ").concat(" eat to mush")
// );

// const eatokay = dogs.some(
//   (dog) =>
//     dog.curFood > dog.recommendDog * 0.9 && dog.curFood < dog.recommendDog * 1.1
// );
// console.log(eatalot);

// const dogsShallow = dogs
//   .slice()
//   .sort((a, b) =>
//     a.recommendDog > b.recommendDog
//       ? 1
//       : b.recommendDog > a.recommendDog
//       ? -1
//       : 0
//   );
// console.log(dogsShallow);

// // objs.sort((a, b) =>
// //   a.last_nom > b.last_nom ? 1 : b.last_nom > a.last_nom ? -1 : 0
// // );

// v2

"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2024-05-11T23:36:17.929Z",
    "2024-05-14T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions
const formatMovmentDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style:'currency',
    currency: currency
  }).format(value)
}


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovmentDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency)
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers

const startOutTime = () => {
  
  const tick = () => {
    const min = String(Math.floor(time/60)).padStart(2,0);
    const sec = String(time % 60).padStart(2,0);
    labelTimer.textContent = `${min}::${sec}`;
    if (time===0) {
      clearInterval(timer);
      labelWelcome.textContent = `Welcome`; 
      containerApp.style.opacity = 0;
    }
    time--
  }
  let time = 120;

  tick();
  const timer = setInterval(tick,1000);

  return timer
}

let currentAccount, timer;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const op = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,op).format(now);
    
    
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startOutTime();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
 
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    clearInterval(timer);
    timer = startOutTime();

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
   setTimeout( 
      ()=> { 
        // Add movement
        currentAccount.movements.push(amount);
        currentAccount.movementsDates.push(new Date().toISOString());
        // Update UI
        updateUI(currentAccount);
      },2500);
  }
  inputLoanAmount.value = "";
  clearInterval(timer);
  timer = startOutTime();

});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////

/////////////////////////////////////////////////
// LECTURES


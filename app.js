let animals = [
  {
    name: 'larry',
    mood: '😋',
    hunger: 100,
    emoji: '🦞'
  },
  {
    name: 'harry',
    mood: '😋',
    hunger: 100,
    emoji: '🦛'
  },
  {
    name: 'barry',
    mood: '😋',
    hunger: 100,
    emoji: '🦫'
  },
  {
    name: 'sherry',
    mood: '😋',
    hunger: 100,
    emoji: '🐑'
  },
]

let money = 0


// NOTE started here, app has evolved and we have abstracted this code to other functions
// function feedLarry() {
//   let larry = animals[0]
//   larry.hunger += 2
//   // console.log(larry);
//   let larryElem = document.getElementById(larry.name)
//   console.log(larryElem);
//   let larryh3 = larryElem.querySelector('h3')
//   larryh3.innerText = `${larry.name} | ${larry.mood} | ${larry.hunger}`
// }

function feedAnimal(animalName) {
  let foundAnimal = animals.find(animal => animal.name == animalName)
  if (foundAnimal.emoji == '🧑‍🌾' || foundAnimal.mood == '🚜' || foundAnimal.hunger == 0) {
    // NOTE full stop!
    return
  }
  foundAnimal.hunger += 5
  if (foundAnimal.hunger > 100) {
    foundAnimal.hunger = 100
  }
  updateAnimals()
}

function updateAnimals() {
  animals.forEach(animal => {
    let animalElem = document.getElementById(animal.name)
    let animalh3 = animalElem.querySelector('h3')
    if (animal.mood == '🚜') {
      let animalh2 = animalElem.querySelector('h2')
      let marquee1 = animalElem.querySelector('marquee')
      let marquee2 = animalElem.querySelector('marquee>marquee')
      // @ts-ignore
      marquee1.stop()
      // @ts-ignore
      marquee2.stop()
      animalh2.innerText = animal.emoji
      // @ts-ignore
      marquee1.style.backgroundImage = 'url(https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2048&q=80)'
    }
    animalh3.innerText = `${animal.name} | ${animal.mood} | ${animal.hunger}`
  })
}

function metabolizeFood() {
  animals.forEach(hungryAnimal => {
    hungryAnimal.hunger -= 2
    // NOTE clamp
    if (hungryAnimal.hunger < 0) {
      hungryAnimal.hunger = 0
    }

    // NOTE checking mood
    if (hungryAnimal.hunger > 80) {
      hungryAnimal.mood = '😋'
    }
    else if (hungryAnimal.hunger > 60) {
      hungryAnimal.mood = '😐'
    }
    else if (hungryAnimal.hunger > 40) {
      hungryAnimal.mood = '🥺'
    }
    else if (hungryAnimal.hunger > 0) {
      hungryAnimal.mood = '😭'
    }
    else {
      hungryAnimal.mood = '🚜'
      hungryAnimal.emoji = '🧑‍🌾'
    }
    // console.log(hungryAnimal);
  })
  updateAnimals()
}

function getPaid() {
  let paycheck = 0
  for (let i = 0; i < animals.length; i++) {
    const animal = animals[i];

    switch (animal.mood) {
      case '😋':
        paycheck += 20
        break;
      case '😐':
        paycheck += 15
        break;
      case '🥺':
        paycheck += 5
        break;
      case '😭':
        paycheck += 1
        break;
      default:
        paycheck -= 50
        break;
    }
  }
  money += paycheck
  document.getElementById('paycheck').innerText = paycheck.toString()
  document.getElementById('money').innerHTML = `<b>${money}</b>`
}

// NOTE setInterval takes in two arguments
// NOTE     VVVVVVVVVVVVVV first argument is what I should do, do not invoke!!!
// NOTE                    VVV second argument is how often I should run this code in milliseconds
setInterval(metabolizeFood, 1000)

setInterval(getPaid, 5000)


updateAnimals()
export function createCategoriesArray (data) {
  const returnArray = []
  data.forEach(item => {
    returnArray.push(createCategory(item))
  })
  return returnArray
}

export function createMilestonesArray (data, categories) {
  const returnArray = []
  data.forEach(item => {
    const category = categories.find(cat => cat.id === item.category)
    returnArray.push(createMilestone(item, category))
  })
  return returnArray
}

export function createPredictionsArray (data, milestones) {
  const returnArray = []
  data.forEach(item => {
    const milestone = milestones.find(mile => mile.id === item.milestone)
    returnArray.push(createPrediction(item, milestone))
  })
  return returnArray
}

export function createOutcomesArray (data, predictions) {
  const returnArray = []
  data.forEach(item => {
    const prediction = predictions.find(pred => pred.id === item.prediction)
    returnArray.push(createOutcome(item, prediction))
  })
  return returnArray
}

export function createCategory (data) {
  return Object.assign({}, {
    id: data.id,
    description: data.description,
    name: data.name,
    position: +data.position
  })
}

export function getMilestoneStatus (code) {
  let status = ''
  switch (code) {
    case '1':
      status = 'Current'
      break
    case '2':
      status = 'Future'
      break
    default:
      status = 'Historical'
      break
  }
  return status
}

export function createMilestone (data, category) {
  return Object.assign({}, {
    id: data.id,
    name: data.name,
    description: data.description,
    dueDate: data.dueDate,
    position: +data.position,
    predictorsNumber: data.predictorsNumber,
    status: getMilestoneStatus(data.status),
    category: category
  })
}

export function getPredictionState (code) {
  let state = ''
  switch (code) {
    case '1':
      state = 'Settlement'
      break
    case '2':
      state = 'Closed'
      break
    case '3':
      state = 'Waiting'
      break
    default:
      state = 'Open'
      break
  }
  return state
}

export function createPrediction (data, milestone) {
  return Object.assign({}, {
    id: data.id,
    name: data.name,
    description: data.description,
    dueDate: +data.dueDate,
    milestone: milestone,
    position: +data.position,
    predictorsNumber: +data.predictorsNumber,
    state: getPredictionState(data.state),
    token: data.token
  })
}

export function createOutcome (data, prediction) {
  return Object.assign({}, {
    id: data.id,
    name: data.name,
    position: +data.position,
    prediction: prediction,
    stakedAmount: data.stakedAmount
  })
}

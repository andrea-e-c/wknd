// THIS CREATES JAVASCRIPT FUNCTIONALITY IN YOUR APP

// TOGGLE DARK MODE FUNCTION USED DURING ON-CLICK 
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
  })
  
  // DARK MODE FUNCTION THAT ALIGNS THE MODE WITH THE SYSTEM SETTINGS
  document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
  })

  // DRAG AND DROP FUNCTION THAT ALLOWS DRAG AND DROP TO BE A THING
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    window.electron.startDrag('drag-and-drop.md')
  }

// THIS NOTIFICATION DOES NOT SEEM TO BE WORKING.  
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE


// INITIATE PROGRESS BAR WHEN BUTTON IS CLICKED
// document.getElementById('download-button').addEventListener('click', () => {
//   let progressInterval
//   const INCREMENT = 0.03
//   const INTERVAL_DELAY = 100

//   let c = 0
//   progressInterval = setInterval(() => {
//     // update progress bar to next value
//     // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
//     window.setProgressBar(c)

//     // increment or reset progress bar
//     if (c < 2) {
//       c += INCREMENT
//     } else {
//       c = (-INCREMENT * 5) // reset to a bit less than 0 to show reset state
//     }
//   }, INTERVAL_DELAY)
//})
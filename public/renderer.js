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

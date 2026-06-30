# Project TODO

## Setup
- [x] Create `index.html`, `style.css`, and `script.js`
- [x] Link CSS and JS files in `index.html`

## Core Structure
- [ ] Build HTML skeleton: input field, add button, empty list container
- [ ] Style basic layout (container, input, button, list items)
- [ ] Style completed task look (strikethrough, faded color, etc.)

## Core Functionality
- [ ] Add task: read input, create task object `{ id, text, completed }`, push to array, clear input
- [ ] Render function: loop through task array and build list items in the DOM
- [ ] Add checkbox/click area to mark task complete
- [ ] Add delete button to remove a task
- [ ] Wire up event listeners (add, toggle complete, delete)

## Persistence
- [ ] Save task array to `localStorage` whenever it changes
- [ ] Load tasks from `localStorage` on page load

## Edge Cases
- [ ] Prevent adding empty/blank tasks
- [ ] Allow pressing Enter to add a task
- [ ] Trim whitespace from input

## Polish (Optional)
- [ ] Filter buttons: All / Active / Completed
- [ ] Task counter (remaining tasks)
- [ ] "Clear completed" button
- [ ] Basic animations/transitions

## Testing
- [ ] Test in browser, confirm tasks persist after refresh
- [ ] Check responsiveness on different screen sizes
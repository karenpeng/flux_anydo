# Flux AnyDo.

### Brief
Create a mobile web app that allows you create, edit, and view short notes. Notes are just small textual items, like to-do lists.
- Notes should be stored using browser local storage
- The app should be usable on a standard mobile browser

### Functionalities:

* Notes manipulations:
 * Create Note
 * Eidt Note
 * Re-order Notes
 * Complete Note
 * Remove Note
 
* Local storage:
 * Base64 encode and decode

* Mobile Interactions:
 * Swipe to complete note
 * Tap to input / reorder / remove
 
 
### Design

 * Tool / Framework
  * gulp - task manager and build system
  * browserify - bundle module
  * flux - app architecture
  * react - ui component
  * sass - styling
  * mocha - testing
  
 * Structure (flux)
 
```
src
 ├─js
   index.js(entry of bundle)   
   ├─actions
   ├─components
   ├─constants
   ├─store
   ├─utils
```

### Usage
 * Use input box to add note
 * Tap on note to edit
 * Tap on ▲ to re-order note
 * Swipe to mark note completed
 * Tap on ╳ to remove note

### Demo
Open index.html in browser

or

Enjoy this [video](http://vimeo.com/148328782)
